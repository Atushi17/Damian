const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const simplydjs = require("simply-djs");

module.exports = {
    name: 'rps',
    description: 'play Rock Paper Scissors',
    usage: "/rps <user>",
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'user to compete with in rps',
            required: true,
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        await interaction.deferReply();

        simplydjs.rps(interaction, {
            slash: true,
            credit: false,
            userSlash: "user"
        });
    }
}