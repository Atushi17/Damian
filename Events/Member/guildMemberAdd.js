const { MessageEmbed, GuildMember, MessageAttachment, Client } = require("discord.js");
const Canvacord = require("canvacord");
const db = require('../../Structures/Schema/welcomesc')

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     * @param {Client} client
     */
    execute(member, client) {
        
        const { user , guild} = member;

        db.findOne({guildid: guild.id}, async(err,data) =>{
            if(data){
                const text = data.channelID
                const channel = client.channels.cache.get(text)
                const image = new Canvacord.Welcomer()
                    .setUsername(user.username)
                    .setDiscriminator(user.discriminator)
                    .setMemberCount(guild.memberCount.toString())
                    .setGuildName(guild.name)
                    .setAvatar(user.displayAvatarURL({format: 'png', size: 1024}))
                    .setColor("border", "#000000")
                    .setColor("username-box", "#000000")
                    .setColor("discriminator-box", "#000000")
                    .setColor("message-box", "##FFFFFF")
                    .setColor("title", "#FFFFFF")
                    .setColor("avatar", "#FFFFFF")
                    .setBackground("https://cdn.discordapp.com/attachments/852813280271663125/904272425921953802/eee.png")
                image.build().then(data => {
                    const img = new MessageAttachment(data , 'welcome.png')
                    return channel.send({files:[img],content:`**${member} WELCOME TO ${guild.name}**`})
                })
            }
        })
    }
}
