const { Canvacord } = require('canvacord');
const { MessageEmbed, CommandInteraction, Client, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'trash',
    description: 'get trash joke image',
    usage: "/trash <user>",
    options: [
        {
            name: "user",
            description: "user to trash",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const member = interaction.options.getMember("user")
        const avatar = member.user.avatarURL({ format: "png" })
        const tri = await Canvacord.trash(avatar)
        const img = new MessageAttachment(tri, 'tri.gif')
        interaction.reply({ files: [img] })
    }
}