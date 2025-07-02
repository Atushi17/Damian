const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/chatwithbotsc')

module.exports = {
    name: 'chatbot',
    description: 'to enable chat with bot feature',
    permission: "MANAGE_MESSAGES",
    usage: "/chatbot <channel>",
    cooldown: 15000,
    options: [
        {
            name: "channel",
            description: "channel to where they chat with bot",
            type: "CHANNEL",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel("channel")
        db.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
            if (!data) {
                data = new db({
                    GuildID: interaction.guild.id,
                    channelID: channel.id

                })
                interaction.reply(`Chat bot cahnnel is set to ${channel}`)
            } else {
                await db.findOneAndDelete({ GuildID: interaction.guild.id })
                data = new db({
                    GuildID: interaction.guild.id,
                    channelID: channel.id
                })
                interaction.reply(`Updated the chat bot channel to ${channel}`)
            }
            data.save()
        })
    }
}