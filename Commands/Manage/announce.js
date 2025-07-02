const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'announce',
    description: 'announces what you type in the given channel',
    permission: "MENTION_EVERYONE",
    usage: "/announce <channel> <ping> <description> (note:- use \\n to go to a new line.)",
    options: [
        {
            name: "channel",
            description: "channel to announce",
            type: "CHANNEL",
            required: true
        },
        {
            name: "ping",
            description: "Ping eveyone or not",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "YES",
                    value: "YES"
                },
                {
                    name: "NO",
                    value: "NO"
                }
            ]
        },
        {
            name: "description",
            description: "what to announce",
            type: "STRING",
            required: true
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel("channel")
        const description = interaction.options.getString("description")
        const ping = interaction.options.getString("ping")
        const announce = new MessageEmbed()
            .setColor("RED")
            .setDescription(description.replaceAll('\\n', `\n`))

        switch (ping) {
            case "YES": {
                channel.send({ content: "@everyone\n**__📢  ANNOUNCEMENT  📢__**", embeds: [announce] })
                interaction.reply({ content: `Announced in ${channel}`, ephemeral: true })
            }
                break;
            case "NO": {
                channel.send({ content: "**__📢  ANNOUNCEMENT  📢__**", embeds: [announce] })
                interaction.reply({ content: `Announced in ${channel}`, ephemeral: true })
            }
        }
    }
}