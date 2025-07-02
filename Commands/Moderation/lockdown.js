const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "lockdown",
    description: "To lockdown the whole server",
    permission: "ADMINISTRATOR",
    usage: "/lockdown <value (ON/OFF)>",
    options: [
        {
            name: "value",
            description: "lokdown on/off",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "ON",
                    value: "ON"
                },
                {
                    name: "OFF",
                    value: "OFF"
                },
            ]
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interraction 
     */

    async execute(interraction) {
        const value = interraction.options.getString("value")
        const role = interraction.guild.roles.everyone
        const perms = role.permissions.toArray()
        switch (value) {
            case "ON": {
                const newPerms = perms.filter((perm) => perm !== "SEND_MESSAGES")
                await role.edit({ permissions: newPerms })
                interraction.reply("Server is now Locked down")
            }
                break;
            case "OFF": {
                perms.push("SEND_MESSAGES")
                await role.edit({ permissions: perms })
                interraction.reply("Server is unlocked")
            }
        }
    }
}
