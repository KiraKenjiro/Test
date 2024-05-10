const { client } = require("../index.js");

// Function to check if a user has specific permissions
async function hasPermissions(userId, guildId, permissions) {
    try {
        // Assuming you are using Discord.js for a Discord bot
        const guild = await client.guilds.fetch(guildId); // Fetch the guild
        const member = await guild.members.fetch(userId); // Fetch the member

        const hasAllPermissions = permissions.every(permission => member.permissions.has(permission)); // Check if the member has all required permissions

        console.log(hasAllPermissions); // Log true if the user has all required permissions, false otherwise
    } catch (error) {
        console.log(error);
    }
}

module.exports = { hasPermissions };

// Bitwise Permissions: https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
// Example:
//  hasPermissions("userId", "guildId", ["ADMINISTRATOR", "MANAGE_CHANNELS"]);