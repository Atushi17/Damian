const { Canvacord } = require('canvacord');
const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'wasted',
    description: 'make someone or urself wasted',
    usage: "/wasted <user>",
    options: [
        {
            name: "user",
            description: "user to get him wasted",
            type: "USER",
            required: false
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser("user") || interaction.user
        const avatar = user.avatarURL({ format: "png" })
        const img = await Canvacord.wasted(avatar)
        interaction.reply({ files: [img] })
    }
}