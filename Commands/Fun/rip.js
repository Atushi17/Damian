const { Canvacord } = require('canvacord');
const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
module.exports = {
    name: 'rip',
    description: 'rest in peace someone',
    usage: "/rip <user>",
    cooldown: 10000,
    options: [
        {
            name: "user",
            description: "user to rip",
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
        const rip = await Canvacord.rip(user.avatarURL({ format: 'png' }))
        interaction.reply({ files: [rip] })
    }
}