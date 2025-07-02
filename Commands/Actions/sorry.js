const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const saysorry = require('../../random/actions/sorry')
module.exports = {
    name: 'sorry',
    description: 'to say sorry',
    cooldown: 10000,
    usage: "/sorry <member>",
    options: [
        {
            name: "member",
            description: "someone to say sorry to",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const saidsorry = interaction.options.getUser("member")
        const sorry = saysorry.sorry

        const img = sorry[Math.floor(Math.random() * sorry.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed], content: `${saidsorry}, ${interaction.user.tag} is saying Sorry!! Forgive him 🥺` })
    }
}