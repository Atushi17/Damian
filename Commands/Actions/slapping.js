const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const slap = require('../../random/actions/slap');

module.exports = {
    name: 'slap',
    description: 'slap a person',
    cooldown: 10000,
    usage: "/slap <member>",
    options: [
        {
            name: "member",
            description: "someone to slap",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const slapping = slap.slap
        const slaper = interaction.options.getUser("member")

        let img = slapping[Math.floor(Math.random() * slapping.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed], content: `${slaper}, ${interaction.user.tag} Slaped you, Don't mess with him/her again 😤!` })
    }
}