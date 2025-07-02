const { Client, Message } = require("discord.js")
const simplydjs = require("simply-djs");
const chat = require('../../Structures/Schema/chatwithbotsc')

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     * @param {Client} client  
     */
    execute(message, client) {
        if(message.channel.type === "DM") return;
        if (message.author.bot) return;
        chat.findOne({ GuildID: message.guildId }, async (err, data) => {
            if (data) {
                const text = data.channelID
                simplydjs.chatbot(client, message, {
                    chid: text,
                    developer: "ΛCΞ#8211",
                    name: `${client.user.tag}`
                });
            }
        })
    }
}
