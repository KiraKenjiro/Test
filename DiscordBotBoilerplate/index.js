const {
	Client,
	Collection,
	EmbedBuilder,
	GatewayIntentBits,
} = require("discord.js");
const handlers = require("./handlerLoader.js");
const fsPromises = require("fs").promises;
const config = require("./config.json");

// Create a new Discord client
const client = new Client({
	intents: [
		Object.values(GatewayIntentBits).reduce((acc, value) => acc | value, 0),
	],
});

// Initialize collections to store commands, buttons, and modals
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

// Function to register commands from the "./commands" directory
const registerCommands = async () => {
	const commandFiles = await fsPromises.readdir("./commands");
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		if (command && command.name) {
			client.commands.set(command.name, command);
			await handlers.logHandler.log(`Registered Command ${command.name}`, 1);
		} else {
			await handlers.logHandler.log(
				`Command ${file} is missing data or name property. Skipping.`,
				2
			);
		}
	}
};

// Function to register buttons from the "./buttons" directory
const registerButtons = async () => {
	const buttonFiles = await fsPromises.readdir("./buttons");
	for (const file of buttonFiles) {
		const button = require(`./buttons/${file}`);
		if (button && button.name) {
			client.buttons.set(button.name, button);
			await handlers.logHandler.log(`Registered Button ${button.name}`, 1);
		} else {
			await handlers.logHandler.log(
				`Button ${file} is missing data or name property. Skipping.`,
				2
			);
		}
	}
};

// Function to register modals from the "./modals" directory
const registerModals = async () => {
	const modalFiles = await fsPromises.readdir("./modals");
	for (const file of modalFiles) {
		const modal = require(`./modals/${file}`);
		if (modal && modal.name) {
			client.modals.set(modal.name, modal);
			await handlers.logHandler.log(`Registered Modal ${modal.name}`, 1);
		} else {
			await handlers.logHandler.log(
				`Modal ${file} is missing data or name property. Skipping.`,
				2
			);
		}
	}
};

// Register commands, buttons, and modals
registerCommands();
registerButtons();
registerModals();

// Event listener for handling interactions (commands, buttons, modals)
client.on("interactionCreate", async (interaction) => {
	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);
		try {
			if (command) {
				await command.execute(interaction);
			} else {
				const notFoundEmbed = new EmbedBuilder()
					.setColor(0x2b2d31)
					.setAuthor({
						name: "Command Not Found",
					})
					.setDescription("The requested command could not be found.")
					.setFooter({
						text: "Please contact a developer for assistance.",
					});

				await interaction.reply({
					embeds: [notFoundEmbed],
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
	} else if (interaction.isButton()) {
		const button = client.buttons.get(interaction.customId);
		try {
			if (button) {
				await button.execute(interaction);
			} else {
				const notFoundEmbed = new EmbedBuilder()
					.setColor(0x2b2d31)
					.setAuthor({
						name: "Button Not Found",
					})
					.setDescription("The requested button could not be found.")
					.setFooter({
						text: "Please contact a developer for assistance.",
					});

				await interaction.reply({
					embeds: [notFoundEmbed],
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
	} else if (interaction.isModalSubmit()) {
		try {
			const modalName = interaction.customId;
			const modalHandler = client.modals.get(modalName);

			if (modalHandler) {
				await modalHandler.execute(interaction);
			} else {
				const notFoundEmbed = new EmbedBuilder()
					.setColor(0x2b2d31)
					.setAuthor({
						name: "Modal Not Found",
					})
					.setDescription("The requested modal could not be found.")
					.setFooter({
						text: "Please contact a developer for assistance.",
					});

				await interaction.reply({
					embeds: [notFoundEmbed],
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
	}
});

// Event listener for the "ready" event
client.on("ready", async () => {
	const readyMessage = `Logged in as ${client.user.tag}`;
	await client.application.commands.set(Array.from(client.commands.values()));
	await handlers.logHandler.log(readyMessage, 1);
});

// Log in with the bot's token
client.login(config.token);

module.exports = { client };