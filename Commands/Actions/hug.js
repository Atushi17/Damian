const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const hug = require('../../random/actions/hug')

module.exports = {
    name: 'hug',
    description: 'give a hug to someone',
    cooldown: 10000,
    usage: "/hug <someone>",
    options: [
        {
            name: "member",
            description: "member to hug",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const hugger = interaction.options.getUser("member")
        let hugimg = hug.hug

        let img = hugimg[Math.floor(Math.random() * hugimg.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed], content: `${hugger}, ${interaction.user.tag} gave you a hug!! How cute 😍` })
    }
}