const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'solo',
    description: 'Shows solo pictures',
    cooldown: 10000,
    usage: "/solo",
    nsfw: true,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        await fetch("https://nekos.life/api/v2/img/solo")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: SOLO")
                    .setImage(body.url)
                    .setColor("DARK_VIVID_PINK")
                    .setFooter({text: `Tags: Solo`})
                interaction.reply({ embeds: [embed] });
            })
    }
}