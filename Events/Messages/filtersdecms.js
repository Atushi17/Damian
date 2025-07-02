const { MessageEmbed, Message, Client } = require("discord.js");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if(message.channel.type === "DM") return;
        if(message.author.bot) return;

        const { content, guild, author, channel } = message;
        const messageContent = content.toLowerCase().split(" ");

        const Filter = client.filters.get(guild.id);
        if(!Filter) return;

        const wordsUsed = [];
        let shouldDelete = false;

        messageContent.forEach((word) => {
            if(Filter.includes(word)) {
                wordsUsed.push(word);
                shouldDelete = true;
            }
        });

        if (shouldDelete) message.delete().catch(() => {});
    }
}