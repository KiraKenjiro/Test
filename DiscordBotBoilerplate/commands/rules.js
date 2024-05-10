const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");
const handlers = require("../handlerLoader.js");

module.exports = {
	name: "rules",
	description:
		"Send the rules embed to the channel you execute this command in.",
	async execute(interaction) {
		try {
			// Create an "Agree" button
			const agreeButton = new ButtonBuilder()
				.setCustomId("agree")
				.setLabel("Agree")
				.setStyle(ButtonStyle.Success)
				.setEmoji("1144203623849537607");

			// Create a "Terms of Service" button with a link
			const tosButton = new ButtonBuilder()
				.setLabel("Terms of Service")
				.setURL("https://discord.com/terms")
				.setStyle(ButtonStyle.Link)
				.setEmoji("1144203790963200101");

			// Create the rules embed
			const rulesEmbed = new EmbedBuilder()
				.setColor(0x2b2d31)
				.setAuthor({
					name: "Rules",
				})
				.addFields(
					// Add various rule fields
					{
						name: "Respectful Communication",
						value: "Communicate with others in a respectful and considerate manner. Avoid using language that could be perceived as hurtful, discriminatory, or offensive.\n(Penalty: 1 Hour Mute > 3 Hour Mute > Permanent Ban)",
						inline: false,
					},
					{
						name: "Spam",
						value: "Avoid spamming messages in the server. If you don't receive a response from a moderator or other user, please wait patiently and refrain from sending excessive messages.\n(Penalty: 3 Hour Mute > Permanent Ban)",
						inline: false,
					},
					{
						name: "NSFW Content",
						value: "The sharing of explicit or inappropriate content is not allowed on the server. Please keep all content suitable for a general audience.\n(Penalty: 3 Hour Mute > Permanent Ban)",
						inline: false,
					},
					{
						name: "Sexual Conduct",
						value: "Any form of pedophilia or sexual harassment will not be accepted on this server. Such actions are strictly prohibited.\n(Penalty: Permanent Ban + Exterior Reports)",
						inline: false,
					},
					{
						name: "Exploitation",
						value: "It is strictly prohibited to exploit either the server or other users. If you discover a loophole that enables you to bypass bans or gain unauthorized permissions, please report it to a moderator immediately.\n(Penalty: 3 Hour Mute > Permanent Ban)",
						inline: false,
					},
					{
						name: "Hate Crimes and Language Usage",
						value: "Any form of derogatory language, racism, transphobia, xenophobia, or other types of bigotry are strictly prohibited on this server.(Penalty: Permanent Ban)",
						inline: false,
					},
					{
						name: "Doxing and Cyber Crimes",
						value: "Sharing or leaking the personal information of other users is strictly prohibited on this server. This act constitutes a serious cyber crime and is illegal.\n(Penalty: Permanent Ban + Exterior Reports)",
						inline: false,
					},
					{
						name: "Viruses and Malware",
						value: "Sharing or distributing viruses, malware, illegal documents, or any other harmful material is strictly prohibited on this server. Such activities are illegal and violate the server's policies.\n(Penalty: Permanent Ban + Exterior Reports)",
						inline: false,
					},
					{
						name: "ToS",
						value: "We expect all members to comply with the Discord Terms of Service and exercise sound judgment. If you have any doubts about the appropriateness of your actions, please refer to the ToS website.\n(Penalty: Permanent Ban)",
						inline: false,
					},
					{
						name: "⚠️ Warning ⚠️",
						value: "These rules are subject to change, and have rules added. It is on you to check and make sure you are aware of the changes.",
						inline: false,
					}
				)
				.setFooter({
					text: "Welcome to the community, provided that you agree to these terms and conditions and commit to abide by these rules!",
				});

			// Create an action row with the "Agree" and "Terms of Service" buttons
			const row = new ActionRowBuilder().addComponents(
				agreeButton,
				tosButton
			);

			// Send the rules embed and action row to the channel
			await interaction.channel.send({
				embeds: [rulesEmbed],
				components: [row],
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
			console.error("Error sending rules:", err);
		}
	},
};
