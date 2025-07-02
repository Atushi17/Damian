const { MessageEmbed, CommandInteraction, Client, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: 'clyde',
    description: 'Shows your text as Clyde\'s message',
    usage: "/clyde <message>",
    cooldown: 10000,
    options: [
        {
            name: "message",
            description: "message to show as",
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const text = interaction.options.getString("message");

        const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;

        let response;
        try {
            response = await fetch(url).then(res => res.json());
        }
        catch (e) {
            return interaction.reply('❎ An error occured, please try again!');
        }
        const attachment = new MessageAttachment(response.message, 'clyde.png');
        return interaction.reply({ files: [attachment] });

    }
}