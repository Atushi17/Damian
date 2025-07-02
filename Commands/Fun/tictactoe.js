const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const simplydjs = require("simply-djs");

module.exports = {
    name: 'tictactoe',
    description: 'Just a fun TicTacToe.',
    usage: "/tictactoe <user>",
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'user to compete with in TicTacToe ',
            required: true,
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        await interaction.deferReply();
        simplydjs.tictactoe(interaction, {
            xEmoji: "❌",
            oEmoji: "⭕",
            idleEmoji: "➖",
            embedColor: "#075FFF",
            slash: true,
            credit: false,
            userSlash: "user"
        });
    }
}