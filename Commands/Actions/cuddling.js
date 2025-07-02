const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const cuddling = require('../../random/actions/cuddle')
module.exports = {
    name: 'cuddle',
    description: 'cuddle someone',
    cooldown: 10000,
    usage: "/cuddle <someone>",
    options: [
        {
            name: "member",
            description: "someone to cuddle",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const cuddler = interaction.options.getUser("member")
        const cuddle = cuddling.cuddle

        const img = cuddle[Math.floor(Math.random() * cuddle.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed], content: `${cuddler}, ${interaction.user.tag} is cuddling you!! how cute you both look, awww 😍` })
    }
}