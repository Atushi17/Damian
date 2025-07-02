const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const manpfp = require('../../random/pfp/manpfp')

module.exports = {
    name: 'man',
    description: 'gets random man pfp',
    cooldown: 10000,
    usage: "/man",
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        let manimg = manpfp.man

        let img = manimg[Math.floor(Math.random() * manimg.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed] })
    }
}