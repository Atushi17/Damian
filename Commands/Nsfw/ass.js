const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'ass',
    description: 'Shows ass pictures',
    cooldown: 10000,
    usage: "/ass",
    nsfw: true,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        await fetch("https://nekobot.xyz/api/image?type=ass")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: ASS")
                    .setImage(body.message)
                    .setColor("DARK_VIVID_PINK")
                    .setFooter({text: `Tags: Ass`})
                interaction.reply({ embeds: [embed] });
            })
    }
}