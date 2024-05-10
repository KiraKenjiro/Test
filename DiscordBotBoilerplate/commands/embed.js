const {
	EmbedBuilder
} = require("discord.js");
const handlers = require("../handlerLoader.js");

module.exports = {
	name: "embed",
	description:
		"Send a specific embed to the channel you execute this command in.",
	async execute(interaction) {
		try {
			const isAdmin = await handlers.permissionHandler.hasPermissions(interaction.user.id, interaction.guildId, ["MANAGE_MESSAGES"]);

			if (isAdmin) {
				// Do something when the user has administrator permissions
				console.log("User has administrator permissions.");
			} else {
				const notFoundEmbed = new EmbedBuilder()
					.setColor(0x2b2d31)
					.setAuthor({
						name: "Permission Not Found",
					})
					.setDescription("The user does not have permission to do this..")
					.setFooter({
						text: "Please contact a developer for assistance.",
					});

				await interaction.reply({
					embeds: [notFoundEmbed],
					ephemeral: true,
				});
			}
		} catch (error) {
			await handlers.logHandler.log(`An error has occurred: ${error}`, 3);
		}
    }
};
