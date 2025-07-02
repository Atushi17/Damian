const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const simplydjs = require('simply-djs')

module.exports = {
    name: 'embed',
    description: 'Advance embed creator',
    permissions: "MANAGE_MESSAGES",
    usage: "/embed",
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply()

        simplydjs.embedCreate(interaction, {
            slash: true,
        })
    }
}