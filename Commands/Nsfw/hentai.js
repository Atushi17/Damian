const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'hentai',
    description: 'sends hentai pics',
    cooldown: 10000,
    usage: "/hentai",
    nsfw: true,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {

        await fetch("https://shiro.gg/api/images/nsfw/hentai")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: Hentai")
                    .setImage(body.url)
                    .setColor("LUMINOUS_VIVID_PINK")
                    .setFooter({text: `Tags: Hentai`})
                interaction.reply({ embeds: [embed] });
            });
    }
}