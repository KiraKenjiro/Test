const {
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");
const handlers = require("../handlerLoader.js");

module.exports = {
	name: "submitCaptcha",

	async execute(interaction) {
		try {
			// Create the captcha modal
			const captchaModal = new ModalBuilder()
				.setCustomId("captchaModal")
				.setTitle("Captcha");

			// Create the captcha input field
			const captchaInput = new TextInputBuilder()
				.setCustomId("captchaCode")
				.setLabel("What code did you see?")
				.setStyle(TextInputStyle.Short);

			// Create the action row and add the input field
			const firstActionRow = new ActionRowBuilder().addComponents(
				captchaInput
			);

			// Add the action row to the captcha modal
			captchaModal.addComponents(firstActionRow);

			// Show the captcha modal
			await interaction.showModal(captchaModal);
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
