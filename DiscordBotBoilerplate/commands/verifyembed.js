const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "verifyembed",
	description: "Send the verify embed to the channel.",

	async execute(interaction) {
		try {
			// Create the rules embed
			const verifyEmbed = new EmbedBuilder()
				.setColor(0x2b2d31)
				.setAuthor({
					name: "Rules",
				})
				.setDescription("To confirm your age for accessing NSFW channels, kindly obscure your ID and send it to the bot via dms. Right-click the image, select Copy Image Link and proceed to click the button for submitting the link.\nPlease only take a photo of the side with your birth information.\nYou must not blur:\n• Your DOB\n• ID Registration Date\n• ID Expiration Date")
				.setImage("https://cdn.discordapp.com/attachments/1103338654979608636/1169211992943382538/image.png?ex=65670986&is=65549486&hm=191401fbef4ad185a6c3ae59e9c6f348228432f473f33415e10f6b6094a8bb7a&")
				.setFooter({
					text: "Warning! Using a fake ID will cause the moderators to raise a punishment both internally and externally.",
				});

			// Send the rules embed and action row to the channel
			await interaction.channel.send({
				embeds: [verifyEmbed],
			});

			// Create a success message
			const successEmbed = new EmbedBuilder()
				.setColor(0x2b2d31)
				.setDescription("Successfully sent the embed message.");

			// Send the success message as an ephemeral reply
			await interaction.reply({
				embeds: [successEmbed],
				ephemeral: true,
			});
		} catch (err) {
			console.error("Error sending embed:", err);
		}
	},
};
