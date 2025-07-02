const { MessageEmbed, CommandInteraction, Client, MessageAttachment } = require('discord.js');
const canvacord = require('canvacord')
module.exports = {
    name: 'comment',
    description: 'Shows your text as a Youtube Comment.',
    usage: "/comment <message>",
    cooldown: 10000,
    options: [
        {
            name: "message",
            description: "message to convert",
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const comment = interaction.options.getString("message")
        try {
            let yt = await canvacord.Canvas.youtube({ "avatar": interaction.user.displayAvatarURL({ format: "png" }), "username": interaction.user.username, "content": comment })
            let attachment = new MessageAttachment(yt, 'comment.png')
            interaction.reply({ files: [attachment] })
        } catch (err) {
            const embed2 = new MessageEmbed()
                .setTitle(`${emotes.error} Something went wrong.\n${emotes.error}Note : It won't work if the User contains Unwanted characters in his Username.`)
                .setColor("RED")
            interaction.reply({ embeds: [embed2] })
        }

    }
}