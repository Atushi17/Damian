const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const netpfp = require('../../random/pfp/netflixpfp')

module.exports = {
    name: 'netflix',
    description: 'gets random netflix pfp',
    cooldown: 10000,
    usage: "/netflix",
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        let netimg = netpfp.netflix

        let img = netimg[Math.floor(Math.random() * netimg.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed] })
    }
}