const { Client, Message } = require("discord.js")
const db = require('../../Structures/Schema/antispamsc')

const usersMap = new Map();
const LIMIT = 5;
const TIME = 700000;
const DIFF = 3000;

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     * @param {Client} client  
     */
    execute(message, client) {
        if(message.channel.type === "DM") return;
        if (message.author.bot) return;
        if (message.member.permissions.has("MANAGE_MESSAGES")) return;
        db.findOne({ GuildID: message.guild.id }, async (err, data) => {
            if (data) {
                if (data.igchannel === message.channel.id) return;
                if (usersMap.has(message.author.id)) {
                    const userData = usersMap.get(message.author.id);
                    const { lastMessage, timer } = userData;
                    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
                    let msgCount = userData.msgCount;

                    if (difference > DIFF) {
                        clearTimeout(timer);
                        userData.msgCount = 1;
                        userData.lastMessage = message;
                        userData.timer = setTimeout(() => {
                            usersMap.delete(message.author.id);
                        }, TIME);
                        usersMap.set(message.author.id, userData)
                    }
                    else {
                        ++msgCount;
                        if (parseInt(msgCount) === LIMIT) {
                            message.member.timeout(TIME, "Spamming")
                            message.channel.send(`${message.author} has been Timeout-ed for spamming!\nTime: \`10 minutes\``);
                        } else {
                            userData.msgCount = msgCount;
                            usersMap.set(message.author.id, userData);
                        }
                    }
                }
                else {
                    let fn = setTimeout(() => {
                        usersMap.delete(message.author.id);
                    }, TIME);
                    usersMap.set(message.author.id, {
                        msgCount: 1,
                        lastMessage: message,
                        timer: fn
                    });
                }
            }

        })
    }
}
