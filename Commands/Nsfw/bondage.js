const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'bondage',
    description: 'Shows Bondage Pictures',
    cooldown: 10000,
    usage: "/bondage",
    nsfw: true,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {

        await fetch("https://shiro.gg/api/images/nsfw/bondage")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: Bondage")
                    .setImage(body.url)
                    .setColor("DARK_RED")
                    .setFooter({text: `Tags: Bondage`})
                interaction.reply({ embeds: [embed] });
            });
    }
}