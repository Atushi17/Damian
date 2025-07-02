const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const pucnching = require('../../random/actions/punch')
module.exports = {
    name: 'punch',
    description: 'punch someone',
    cooldown: 10000,
    usage: "/punch <member>",
    options: [
        {
            name: "member",
            description: "someone to punch",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const puncher = interaction.options.getUser("member")
        const punchhing = pucnching.punch

        const img = punchhing[Math.floor(Math.random() * punchhing.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed], content: `${puncher}, ${interaction.user.tag} Punched you... ouch that was hard 🥲` })
    }
}