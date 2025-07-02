const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const hifi = require('../../random/actions/hifi')
module.exports = {
    name: 'highfive',
    description: 'give a hifi someone',
    cooldown: 10000,
    usage: "/highfive <member>",
    options: [
        {
            name: "member",
            description: "someone to hifi",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const givehifi = interaction.options.getUser("member")
        const hifive = hifi.hifi

        const img = hifive[Math.floor(Math.random() * hifive.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed], content: `${givehifi}, ${interaction.user.tag} gave you a highfive!! Lets go 😁` })
    }
}