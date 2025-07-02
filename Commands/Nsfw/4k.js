const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: '4k',
    description: 'Shows 4k pictures',
    cooldown: 10000,
    usage: "/4k",
    nsfw: true,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        await fetch("https://nekobot.xyz/api/image?type=4k")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: 4K")
                    .setImage(body.message)
                    .setColor("DARK_VIVID_PINK")
                    .setFooter({text: `Tags: 4K`})
                interaction.reply({ embeds: [embed] });
            })
    }
}