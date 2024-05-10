const {
	EmbedBuilder,
	AttachmentBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");
const handlers = require("../handlerLoader.js");
const fs = require("fs");
const path = require("path");

module.exports = {
	name: "agree",
	async execute(interaction) {
		try {
			const captchasDir = path.join(__dirname, "../Handlers/Captchas");

			// Ensure the directory exists
			await fs.mkdir(captchasDir, { recursive: true }, (err) => {
				if (err) {
					console.error("Error creating directory:", err);
				}
			});

			const jsonFilePath = path.join(captchasDir, "captchas.json");

			// Ensure the JSON file exists
			if (!fs.existsSync(jsonFilePath)) {
				fs.writeFileSync(jsonFilePath, JSON.stringify({}), "utf-8");
			}

			const roleIdToCheck = "1112342009517191308";
			const member = interaction.member;

			if (!member.roles.cache.has(roleIdToCheck)) {
				// Generate a captcha
				const captcha = await handlers.captchaHandler.generateCaptcha(
					interaction.user.id
				);

				const file = new AttachmentBuilder(captcha.filePath, {
					name: "captcha.png",
				});

				const captchaEmbed = new EmbedBuilder()
					.setColor(0x2b2d31)
					.setAuthor({
						name: "Captcha Code",
					})
					.setImage(`attachment://${file.name}`);

				const submitButton = new ButtonBuilder()
					.setCustomId("submitCaptcha")
					.setLabel("Submit")
					.setStyle(ButtonStyle.Success)
					.setEmoji("1144203623849537607");

				const row = new ActionRowBuilder().addComponents(submitButton);

				const creationTimestamp = Date.now();

				const captchaInfo = {
					location: captcha.filePath,
					text: captcha.text,
					creationTimestamp: creationTimestamp,
				};

				const captchasData = JSON.parse(
					fs.readFileSync(jsonFilePath, "utf-8")
				);

				// Iterate through each stored captcha entry
				for (const userId in captchasData) {
					if (userId === interaction.user.id) {
						continue;
					}
					const captchaEntry = captchasData[userId];

					// Calculate the elapsed time since creation
					const elapsedTime =
						Date.now() - captchaEntry.creationTimestamp;

					// Check if the elapsed time is greater than 5 minutes (300,000 milliseconds)
					if (elapsedTime > 300000) {
						// Remove the key entry from captchasData
						delete captchasData[userId];

						// Delete the PNG image file
						fs.unlinkSync(captchaEntry.location);
					}
				}

				// Store CAPTCHA info per user (using user ID as the key)
				captchasData[interaction.user.id] = captchaInfo;

				// Write captchasData back to the JSON file
				fs.writeFileSync(
					jsonFilePath,
					JSON.stringify(captchasData, null, 2),
					"utf-8"
				);

				// Show the captcha to the user
				await interaction.reply({
					embeds: [captchaEmbed],
					files: [file],
					components: [row],
					ephemeral: true,
				});
			} else {
				// User has already completed the captcha
				const verifiedEmbed = new EmbedBuilder()
					.setColor(0x2b2d31)
					.setAuthor({
						name: "Captcha Completed",
					})
					.setDescription("You have already completed the captcha.")
					.setFooter({
						text: "Please contact a developer for assistance if there is an issue.",
					});

				// Inform the user that they've already completed the captcha
				await interaction.reply({
					embeds: [verifiedEmbed],
					ephemeral: true,
				});
			}
		} catch (error) {
			const errorEmbed = new EmbedBuilder()
				.setColor(0x2b2d31)
				.setAuthor({
					name: "Error",
				})
				.setDescription(
					"An error has occurred; please capture a screenshot of the error and either create a support ticket or reach out to a developer for assistance."
				)
				.setFooter({
					text: `--- Screenshot Under This Line ---\n${error}`,
				});

			await interaction.reply({
				embeds: [errorEmbed],
				ephemeral: true,
			});

			await handlers.logHandler.log(`An error has occurred: ${error}`, 3);
		}
	},
};
