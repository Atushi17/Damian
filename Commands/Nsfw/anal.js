const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'anal',
    description: 'Shows anal pictures',
    cooldown: 10000,
    usage: "/anal",
    nsfw: true,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        await fetch("https://nekobot.xyz/api/image?type=anal")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: ANAL")
                    .setImage(body.message)
                    .setColor("DARK_VIVID_PINK")
                    .setFooter({text: `Tags: Anal`})
                interaction.reply({ embeds: [embed] });
            })
    }
}