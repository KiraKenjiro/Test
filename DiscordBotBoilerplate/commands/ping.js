const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "ping",
	description: "Ping command to check the bot's latency.",
	async execute(interaction) {
		try {
			// Calculate the bot's latency (ping)
			const ping = Date.now() - interaction.createdTimestamp;

			// Define color based on ping value
			let color;
			if (ping <= 100) {
				color = 0x00ff00; // Green
			} else if (ping <= 200) {
				color = 0xffff00; // Yellow
			} else if (ping <= 300) {
				color = 0xffa500; // Orange
			} else if (ping <= 400) {
				color = 0xff4500; // Red-Orange
			} else {
				color = 0xff0000; // Red
			}

			// Create a ping response as a MessageEmbed
			const pingEmbed = new EmbedBuilder()
				.setColor(color)
				.setAuthor({
					name: "Ping",
				})
				.setDescription(`Average Ping: ${ping}ms`);

			// Send the ping response to the user (ephemeral message)
			await interaction.reply({ embeds: [pingEmbed], ephemeral: true });
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
