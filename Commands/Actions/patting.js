const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const patting = require('../../random/actions/pat')
module.exports = {
    name: 'pat',
    description: 'pat someone',
    cooldown: 10000,
    usage: "/pat <member>",
    options: [
        {
            name: "member",
            description: "someone to pat",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const patter = interaction.options.getUser("member")
        const pat = patting.pat

        const img = pat[Math.floor(Math.random() * pat.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed], content: `${patter}, ${interaction.user.tag} is Patting you!! Good 😊` })
    }
}