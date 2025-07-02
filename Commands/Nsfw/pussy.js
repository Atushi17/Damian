const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'pussy',
    description: 'Shows pussy pictures',
    cooldown: 10000,
    usage: "/pussy",
    nsfw: true,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        await fetch("https://nekobot.xyz/api/image?type=pussy")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: PUSSY")
                    .setImage(body.message)
                    .setColor("DARK_VIVID_PINK")
                    .setFooter({text: `Tags: Pussy`})
                interaction.reply({ embeds: [embed] });
            })
    }
}