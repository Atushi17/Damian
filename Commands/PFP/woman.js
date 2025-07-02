const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const womanpfp = require('../../random/pfp/womenpfp')

module.exports = {
    name: 'woman',
    description: 'gets random woman pfp',
    cooldown: 10000,
    usage: "/woman",
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        let womanimg = womanpfp.women

        let img = womanimg[Math.floor(Math.random() * womanimg.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed] })
    }
}