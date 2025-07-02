const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const couppfp = require('../../random/pfp/couplepfp')

module.exports = {
    name: 'couple',
    description: 'gets random couple pfp',
    cooldown: 10000,
    usage: "/couple",
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        let coupimg = couppfp.couple

        let img = coupimg[Math.floor(Math.random() * coupimg.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed] })
    }
}