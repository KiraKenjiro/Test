// Import necessary modules
const { EmbedBuilder } = require("discord.js");
const { client } = require("../index");

module.exports = {
    name: "verify",
    description: "Sends your ID to the moderators to be verified for the 18+ channels",

    async execute(interaction) {
        // Check if the command was sent in a DM channel
        if (interaction.guildId) {
            // Send an embed indicating that the command must be executed in a DM
            const warningEmbed = new EmbedBuilder()
                .setColor(0x2b2d31)
                .setAuthor({
                    name: "Verification Error",
                })
                .setDescription(
                    'This command must be executed in a DM (Direct Message) channel.\nYour legal ID was not processed.'
                );
    
            await interaction.reply({
                embeds: [warningEmbed],
                ephemeral: true,
            });
        } else {
            // Fetch the user's DMs and cache them
            const userDM = await interaction.user.createDM();
            
            // Send an embed indicating that the command must be executed in a DM
            const messageEmbed = new EmbedBuilder()
                .setColor(0x2b2d31)
                .setAuthor({
                    name: "Verification",
                })
                .setDescription(
                    'Please send only an image within 30 seconds.'
                );
    
            await interaction.reply({
                embeds: [messageEmbed],
                ephemeral: true,
            });

            // Set up options for awaitMessages
            const options = { max: 1, time: 30000, errors: ['time'] };

            try {
                // Wait for the user's message
                const collected = await userDM.awaitMessages(options);

                // Check if a message was collected
                if (collected.size) {
                    // Access the content and attachments of the collected message
                    const attachments = collected.first().attachments;

                    // Now you can work with the attachments
                    await attachments.forEach(attachment => {
                        const attachmentURL = attachment.url;

                        const channelId = "1121329291070808084"; // Replace with your channel ID
                        const channel = client.channels.cache.get(channelId);

                        const verifyEmbed = new EmbedBuilder()
                            .setColor(0x2b2d31)
                            .setAuthor({
                                name: "Verification",
                            })
                            .setDescription(`The user <@${interaction.user.id}> has requested verification.`)
                            .setImage(attachmentURL)

                        // Send the attachment URL to the specific channel
                        channel.send({
                            embeds: [verifyEmbed]
                        })

                    });
                } else {
                    // Handle timeout
                    const timeoutEmbed = new EmbedBuilder()
                        .setColor(0x2b2d31)
                        .setAuthor({
                            name: "Verification Timeout",
                        })
                        .setDescription('The verification process timed out. Please try again.');
                    
                    await interaction.reply({
                        embeds: [timeoutEmbed],
                        ephemeral: true,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    }    
};
