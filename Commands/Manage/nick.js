const { MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
    name: "nick",
    description: "Changes the nickname of a user",
    permission: "MANAGE_NICKNAMES",
    usage: "/nick <user> <nickname>",
    options: [
        {
            name: "user",
            description: "Select a target to change the nickname of",
            type: "USER",
            required: true
        },
        {
            name: "nickname",
            description: "Type a nickname",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const { options } = interaction;
        const target = options.getMember("user");
        const nick = options.getString("nickname");

        target.setNickname(nick)

        const res = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ You Successfully changed the nickname of ${target}`)

        interaction.reply({ embeds: [res] })

    }
}