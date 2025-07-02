const Discord = require("discord.js");
const Guild = require("../Schema/logshan");
const moment = require('moment')

async function send_log(c, guild, color, title, description, thumb) {
    try {
        //CREATE THE EMBED
        const LogEmbed = new Discord.MessageEmbed()
            .setColor(color ? color : "BLACK")
            .setDescription(description ? description.substr(0, 2048) : "\u200b")
            .setTitle(title ? title.substr(0, 256) : "\u200b")
            .setTimestamp()
            .setThumbnail(thumb ? thumb : guild.iconURL({ format: "png" }))
            .setFooter(`${c.user.tag}`, c.user.avatarURL({ format: "png" }));
        //GET THE CHANNEL
        Guild.findOne({ guildID: guild.id }, (err, data) => {
            if (data) {
                const ch = data.logChannelID;
                const logger = c.channels.fetch(ch);
                if (!logger) throw new SyntaxError("CHANNEL NOT FOUND");

                try {
                    const hook = new Discord.WebhookClient({ id: data.webhookid, token: data.webhooktoken });
                    hook.send({
                        username: guild.name,
                        avatarURL: guild.iconURL({ format: "png" }),
                        embeds: [LogEmbed]
                    });
                } catch {
                    return;
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}
module.exports = async (client) => {
    console.log("Loaded Logger Module");

    //Channel create
    client.on("channelCreate", function (channel) {
        send_log(
            client,
            channel.guild,
            "GREEN",
            "Channel CREATED",
            `ChannelNAME: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nChannelTYPE: \`${channel.type}\``
        )
    });

    //Channel delete
    client.on("channelDelete", function (channel) {
        send_log(
            client,
            channel.guild,
            "RED",
            "Channel DELETED",
            `ChannelNAME: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nChannelTYPE: \`${channel.type}\``
        )
    });


    //Channel update
    client.on("channelUpdate", function (oldChannel, newChannel) {
        let newCat = newChannel.parent ? newChannel.parent.name : "NO PARENT";
        let guildChannel = newChannel.guild;
        if (!guildChannel || !guildChannel.available) return;

        let types = {
            GUILD_TEXT: "Text Channel",
            GUILD_VOICE: "Voice Channel",
            UNKNOWN: "No Type",
            GUILD_NEWS: "News Channel",
            GUILD_STORE: "Store Channel",
            GUILD_CATEGORY: "Category",
            GUILD_STAGE_VOICE: "Stage",
            GUILD_PUBLIC_THREAD: "Public Thread",
            GUILD_PRIVATE_THREAD: "Private Thread",
            GUILD_NEWS_THREAD: "News Thread"
        };

        if (oldChannel.name != newChannel.name) {
            send_log(
                client,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - NAME",
                `ChannelNAME: \`${oldChannel.name}\`\nChannelID: \`${oldChannel.id}\`\n\n` +
                `ChannelNAME: \`${newChannel.name}\`\nChannelID: \`${newChannel.id}\``
            );
        } else if (oldChannel.type != newChannel.type) {
            send_log(
                client,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - TYPE",
                `ChannelNAME: \`${oldChannel.name}\`\nChannelID: \`${oldChannel.id
                }\`\nChannelTYPE: \`${types[oldChannel.type]}\`\n\n` +
                `ChannelNAME: \`${newChannel.name}\`\nChannelID: \`${newChannel.id
                }\`\nChannelTYPE: \`${types[newChannel.type]}\``
            );
        } else if (oldChannel.topic != newChannel.topic) {
            send_log(
                client,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - TOPIC",
                `ChannelNAME: \`${oldChannel.name}\`\nChannelID: \`${oldChannel.id}\`\nChannelTOPIC: \`${oldChannel.topic}\`\n\n` +
                `ChannelNAME: \`${newChannel.name}\`\nChannelID: \`${newChannel.id}\`\nChannelTOPIC: \`${newChannel.topic}\``
            );
        };
    });


    //Channel pin
    client.on("channelPinsUpdate", function (channel, time) {
        if (time === null) {
            send_log(
                client,
                channel.guild,
                "YELLOW",
                "Channel PINS REMOVED",
                `ChannelNAME: \`${channel.name}\`\nChannelID: \`${channel.id}\``,
                "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png"
            )
        } else {
            send_log(
                client,
                channel.guild,
                "YELLOW",
                "Channel PINS ADDED",
                `ChannelNAME: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nPinned at \`${moment(time).format('LLL')} UTC\``,
                "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png"
            )
        }
    });

    //Emoji create
    client.on("emojiCreate", function (emoji) {
        send_log(
            client,
            emoji.guild,
            "GREEN",
            "EMOJI CREATED",
            `EMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`
        )
    });

    //Emoji Delete
    client.on("emojiDelete", function (emoji) {
        send_log(
            client,
            emoji.guild,
            "RED",
            "EMOJI DELETED",
            `EMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`
        )
    });


    //Emoji Update
    client.on("emojiUpdate", function (oldEmoji, newEmoji) {
        if (oldEmoji.name !== newEmoji.name) {
            send_log(
                client,
                oldEmoji.guild,
                "ORANGE",
                "EMOJI NAME CHANGED",
                `__Emoji: ${newEmoji}__ \n\n**Before:** \`${oldEmoji.name}\`\n**After:** \`${newEmoji.name}\`\n**Emoji ID:** \`${newEmoji.id}\``
            );
        }
    });

    //Member Ban 
    client.on("guildBanAdd", function (ban) {
        let guild = ban.guild
        let user = ban.user
        send_log(
            client,
            guild,
            "RED",
            "USER BANNED",
            `User: ${user} (\`${user.id}\`)\n\`${user.tag}\`\nReason: \`${ban.reason}\``,
            user.displayAvatarURL({ dynamic: true })
        )
    });

    //Member Ban remove
    client.on("guildBanRemove", function (ban) {
        let guild = ban.guild
        let user = ban.user
        send_log(
            client,
            guild,
            "YELLOW",
            "USER UNBANNED",
            `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
            user.displayAvatarURL({ dynamic: true })
        )
    });

    //Member Leaves
    client.on("guildMemberRemove", function (member) {
        send_log(
            client,
            member.guild,
            "RED",
            "MEMBER LEFT",
            `Member: ${member.user}\nUser ID: \`${member.user.id}\`\nUser Tag: \`${member.user.tag}\``,
            member.user.displayAvatarURL({ dynamic: true })
        );
    });

    //Member update
    client.on("guildMemberUpdate", function (oldMember, newMember) {
        if (oldMember.displayName !== newMember.displayName) {
            send_log(
                client,
                oldMember.guild,
                "YELLOW",
                "Member UPDATE - NICKNAME",
                `USERNAME: \`${oldMember.user.tag}\`\nOld Nickname: \`${oldMember.displayName}\`\nNew Nickname: \`${newMember.displayName}\``,
                oldMember.user.displayAvatarURL({ dynamic: true })
            )
        }
        let options = {};

        if (options[newMember.guild.id]) {
            options = options[newMember.guild.id];
        }
        if (typeof options.excludedroles === "undefined") options.excludedroles = new Array([])
        if (typeof options.trackroles === "undefined") options.trackroles = true

        if (options.trackroles !== false) {
            const oldMemberRoles = oldMember.roles.cache
            const newMemberRoles = newMember.roles.cache

            let rolechanged = newMemberRoles.difference(oldMemberRoles)
            options.excludedroles.forEach(function (key) {
                rolechanged.delete(key)
            })

            if (rolechanged.size !== 0) {

                let roleadded = ""
                let roleremoved = ""

                rolechanged.forEach(function (key) {
                    if (newMemberRoles.has(key.id)) {
                        roleadded += `<@&${key.id}>`
                    } else {
                        roleremoved += `<@&${key.id}>`
                    }
                })
                if (roleadded) {
                    send_log(
                        client,
                        newMember.guild,
                        "YELLOW",
                        `ROLE UPDATE ADDED`,
                        `Member: <@${newMember.user.id}> - ${newMember.user.tag}
                        Role: ${roleadded}
                        Time: \`${moment(Date.now()).format('LLL')} UTC\``,
                        newMember.user.avatarURL({ dynamic: true })
                    )
                } else {
                    send_log(
                        client,
                        newMember.guild,
                        "YELLOW",
                        `ROLE UPDATE REMOVED`,
                        `Member: <@${newMember.user.id}> - ${newMember.user.tag}
                        Role: ${roleremoved}
                        Time: \`${moment(Date.now()).format('LLL')} UTC\``,
                        newMember.user.avatarURL({ dynamic: true })
                    )
                }
            }
        }
    });

    client.on("messageDelete", function (message) {
        send_log(
            client,
            message.guild,
            "ORANGE",
            "Message Deleted",
            `**Author : ** <@${message.author.id}> - *${message.author.tag}*
            **Date : ** ${message.createdAt}
            **Channel : ** <#${message.channel.id}> - *${message.channel.name}*
            **Deleted Message : **\`\`\`${message.content.replace(/`/g, "'")}\`\`\`
            **Attachment URL : **${message.attachments.map(x => x.proxyURL)}`
        );
    });

    client.on("messageUpdate", function (oldMessage, newMessage) {
        if (oldMessage.author.bot) return;
        if (oldMessage.channel.type !== "GUILD_TEXT") return;
        if (newMessage.channel.type !== "GUILD_TEXT") return;
        if (oldMessage.content === newMessage.content) return;

        send_log(
            client,
            oldMessage.guild,
            "YELLOW",
            "Message UPDATED",
            `**Author : ** <@${newMessage.member.user.id}> - *${newMessage.member.user.tag}*
            **Date : ** ${newMessage.createdAt}
            **Channel : ** <#${newMessage.channel.id}> - *${newMessage.channel.name}*
            **Orignal Message : **
            \`\`\`${oldMessage.content.replace(/`/g, "'")}\`\`\`
            **Updated Message : **
            \`\`\`${newMessage.content.replace(/`/g, "'")}\`\`\``
        )
    });

    client.on("roleCreate", function (role) {
        send_log(
            client,
            role.guild,
            "GREEN",
            "ROLE CREATED",
            `ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`
        )
    });

    client.on("roleDelete", function (role) {
        send_log(
            client,
            role.guild,
            "RED",
            "ROLE DELETED",
            `ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`
        )
    });

    client.on("roleUpdate", function (oldRole, newRole) {
        if (oldRole.name !== newRole.name) {
            send_log(
                client,
                oldRole.guild,
                "ORANGE",
                "ROLE NAME CHANGED",
                `__ROLE: ${oldRole}__ \n\n**Before:** \`${oldRole.name}\`
              **After:** \`${newRole.name}\`
              **Role ID:** \`${newRole.id}\``
            );
        } else if (oldRole.color !== newRole.color) {
            send_log(
                client,
                oldRole.guild,
                "ORANGE",
                "ROLE COLOR CHANGED",
                `__ROLE: ${newRole}__ \n\n**Before:** \`${oldRole.color.toString(
                    16
                )}\`
              **After:** \`${newRole.color.toString(16)}\`
              **ROLE ID:** \`${newRole.id}\``
            );
        } else {
            send_log(
                client,
                oldRole.guild,
                "RED",
                "ROLE PERMISSIONS CHANGED",
                `__ROLE: ${newRole}__ \n
              **THE PERMISSIONS CHANGED PLEASE CHECK!!!**
              OLD PERMISSIONS: \`${newRole.permissions.bitfield}\`
              NEW PERMISSIONS: \`${newRole.permissions.bitfield}\`
              **Role ID:** \`${newRole.id}\``
            );
        }
    });

    client.on("voiceStateUpdate", function (oldState, newState) {

        let userid = oldState.id || newState.id
        let guildid = oldState.guild.id || newState.guild.id
        let guild = client.guilds.cache.find(val => val.id === guildid)
        let author = guild.members.cache.find(val => val.id === userid)

        if (oldState.channel === null && newState.channel === null) return;

        var oldChannelName
        var newChannelName

        // SET CHANNEL NAME STRING
        let oldparentname = "unknown"
        let oldchannelname = "unknown"
        let oldchanelid = "unknown"
        if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
        if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
        if (oldState && oldState.channelId) oldchanelid = oldState.channelId

        let newparentname = "unknown"
        let newchannelname = "unknown"
        let newchanelid = "unknown"
        if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
        if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
        if (newState && newState.channelId) newchanelid = newState.channelId

        if (oldState.channelId && oldState.channel) {
            if (typeof oldState.channel.parent !== "undefined") {
                oldChannelName = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`
            } else {
                oldChannelName = `-\n\t**${oldparentname}**\n*${oldchanelid}*`
            }
        }
        if (newState.channelId && newState.channel) {
            if (typeof newState.channel.parent !== "undefined") {
                newChannelName = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`
            } else {
                newChannelName = `-\n\t**${newchannelname}**\n*${newchanelid}*`
            }
        }

        // JOINED 
        if (!oldState.channelId && newState.channelId && !oldState.channel && newState.channel) {
            send_log(
                client,
                newState.guild,
                "GREEN",
                "JOINED VOICE CHANNEL",
                `Member: <@${newState.member.user.id}> - ${newState.member.user.tag}
                VC Joined: <#${newchanelid}> - ${newchannelname}
                Time: \`${moment(Date.now()).format('LLL')} UTC\``,
                newState.member.user.avatarURL({ dynamic: true })
            )
        }


        // LEFT 
        if (oldState.channelId && !newState.channelId && oldState.channel && !newState.channel) {
            send_log(
                client,
                newState.guild,
                "RED",
                "LEFT VOICE CHANNEL",
                `Member: <@${newState.member.user.id}> - ${newState.member.user.tag}
                VC Left: <#${oldchanelid}> - ${oldchannelname}
                Time: \`${moment(Date.now()).format('LLL')} UTC\``,
                newState.member.user.avatarURL({ dynamic: true })
            )
        }


        // SWITCH 
        if (oldState.channelId && newState.channelId && oldState.channel && newState.channel) {
            // False positive check
            if (oldState.channelId !== newState.channelId) {
                send_log(
                    client,
                    newState.guild,
                    "BLUE",
                    "SWITCH VOICE CHANNEL",
                    `Member: <@${newState.member.user.id}> - ${newState.member.user.tag}
                    Old VC: <#${oldchanelid}> - ${oldchannelname}
                    New VC: <#${newchanelid}> - ${newchannelname}
                    Time: \`${moment(Date.now()).format('LLL')} UTC\``,
                    newState.member.user.avatarURL({ dynamic: true })
                )
            }
        }
    });
}