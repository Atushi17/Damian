const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const kiss = require('../../random/actions/kiss');

module.exports = {
    name: 'kiss',
    description: 'kiss someone special',
    cooldown: 10000,
    usage: "/kiss <member>",
    options: [
        {
            name: "member",
            description: "person to kiss",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const kissing = kiss.kiss
        const kisser = interaction.options.getUser("member")

        let img = kissing[Math.floor(Math.random() * kissing.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed], content: `${kisser}, ${interaction.user.tag} gave you a kiss!! OMG 😍!!!` })
    }
}