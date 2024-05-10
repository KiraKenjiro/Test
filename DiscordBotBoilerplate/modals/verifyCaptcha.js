const { EmbedBuilder } = require("discord.js");
const handlers = require("../handlerLoader.js");
const fs = require("fs");
const path = require("path");

module.exports = {
	name: "captchaModal",

	async execute(interaction) {
		// Extract the captcha code entered by the user from the interaction data
		const captchaCode =
			interaction.fields.components[0].components.find(
				(component) => component.customId === "captchaCode"
			)?.value || null;

		// Define the directory where captcha data is stored
		const captchasDir = path.join(__dirname, "../handlers/captchas");

		// Define the path to the JSON file that stores captcha data
		const jsonFilePath = path.join(captchasDir, "captchas.json");

		// Read the captcha data from the JSON file
		const captchasData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

		// Check if the entered captcha code matches the stored captcha text
		if (captchaCode === captchasData[interaction.user.id].text) {
			// Remove the captcha image file
			fs.unlink(captchasData[interaction.user.id].location, (err) => {
				if (err) {
					console.error(`Error deleting captcha image: ${err}`);
				}
			});

			// Delete the captcha data for the user
			delete captchasData[interaction.user.id];

			// Write the updated data back to the JSON file
			fs.writeFileSync(jsonFilePath, JSON.stringify(captchasData, null, 2));

			// Assuming you have a GuildMember object for the user
			const member = interaction.guild.members.cache.get(
				interaction.user.id
			);

			// Assuming you have a role ID that you want to assign to the user
			const roleIdToAssign = "1112342009517191308";

			if (member && roleIdToAssign) {
				const role = interaction.guild.roles.cache.get(roleIdToAssign);
				if (role) {
					// Assign the specified role to the user
					member.roles
						.add(role)
						.then(() => {
							// Create an embed to notify the user of successful verification
							const captchaVerified = new EmbedBuilder()
								.setColor(0x2b2d31)
								.setAuthor({
									name: "Completed Captcha",
								})
								.setDescription(
									"Thank you for finishing the captcha."
								)
								.setFooter({
									text: "Welcome to the server.",
								});

							// Reply to the user with the verification message (ephemeral)
							interaction.reply({
								embeds: [captchaVerified],
								ephemeral: true,
							});
						})
						.catch((error) => {
							console.error(`Error assigning role: ${error}`);
						});
				} else {
					console.error(`Role with ID ${roleIdToAssign} not found`);
				}
			}
		} else {
			// Create an embed to inform the user to try again
			const captchaVerified = new EmbedBuilder()
				.setColor(0x2b2d31)
				.setAuthor({
					name: "Please Try Again",
				})
				.setDescription(
					"That wasn't quite right, try again or generate a new captcha."
				);

			// Reply to the user with the try-again message (ephemeral)
			interaction.reply({
				embeds: [captchaVerified],
				ephemeral: true,
			});
		}
	},
};
