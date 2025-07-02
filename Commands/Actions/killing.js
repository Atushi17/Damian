const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const killing = require('../../random/actions/kill')
module.exports = {
    name: 'kill',
    description: 'kill someone',
    cooldown: 10000,
    usage: "/kill <member>",
    options: [
        {
            name: "member",
            description: "someone to kill",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const killer = interaction.options.getUser("member")
        const kill = killing.kill

        const img = kill[Math.floor(Math.random() * kill.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed], content: `${killer}, ${interaction.user.tag} killed you... \`R.I.P\` 😔` })
    }
}