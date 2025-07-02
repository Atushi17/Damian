const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const animepfp = require('../../random/pfp/animepfp')

module.exports = {
    name: 'anime',
    description: 'gets random anime pfp',
    cooldown: 10000,
    usage: "/anime",
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        let animeimg = animepfp.anime

        let img = animeimg[Math.floor(Math.random() * animeimg.length)]
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
        interaction.reply({ embeds: [embed] })
    }
}