const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
    name: "spotify",
    description: "Check what you or your friend listing on spotify",
    cooldown: 20000,
    usage: "/spotify [user]",
    options:[
        {
            name:"user",
            description:"users",
            type:"USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const member = interaction.options.getMember("user") || interaction.member
        try{
            if(member.presence.activities[1].name === 'Spotify'){
                const pres = member.presence.activities[1]
                const card = new canvacord.Spotify()
                    .setTitle(pres.details)
                    .setAuthor(pres.state)
                    .setAlbum(pres.assets.largeText)
                    .setStartTimestamp(pres.timestamps.start.getTime())
                    .setEndTimestamp(pres.timestamps.end.getTime())
                    .setImage(pres.assets.largeImageURL())
                    .setBackground("COLOR","#000000")
                    .setProgressBar("BAR","#00FF00")
                card.build()
                .then(data => {
                    const img = new MessageAttachment(data , 'spotify.png')
                    interaction.reply({files:[img]})
                })
                return
            }else if(member.presence.activities[0].name === 'Spotify'){
                const pres = member.presence.activities[0]
                const card = new canvacord.Spotify()
                    .setTitle(pres.details)
                    .setAuthor(pres.state)
                    .setAlbum(pres.assets.largeText)
                    .setStartTimestamp(pres.timestamps.start.getTime())
                    .setEndTimestamp(pres.timestamps.end.getTime())
                    .setImage(pres.assets.largeImageURL())
                    .setBackground("COLOR","#000000")
                    .setProgressBar("BAR","#00FF00")
                card.build()
                .then(data => {
                    const img = new MessageAttachment(data , 'spotify.png')
                    interaction.reply({files:[img]})
                })
                return
            }else if(member.presence.activities[2].name === 'Spotify'){
                const pres = member.presence.activities[2]
                const card = new canvacord.Spotify()
                    .setTitle(pres.details)
                    .setAuthor(pres.state)
                    .setAlbum(pres.assets.largeText)
                    .setStartTimestamp(pres.timestamps.start.getTime())
                    .setEndTimestamp(pres.timestamps.end.getTime())
                    .setImage(pres.assets.largeImageURL())
                    .setBackground("COLOR","#000000")
                    .setProgressBar("BAR","#00FF00")
                card.build()
                .then(data => {
                    const img = new MessageAttachment(data , 'spotify.png')
                    interaction.reply({files:[img]})
                })
                return
            }else if(member.presence.activities[3].name === 'Spotify'){
                const pres = member.presence.activities[3]
                const card = new canvacord.Spotify()
                    .setTitle(pres.details)
                    .setAuthor(pres.state)
                    .setAlbum(pres.assets.largeText)
                    .setStartTimestamp(pres.timestamps.start.getTime())
                    .setEndTimestamp(pres.timestamps.end.getTime())
                    .setImage(pres.assets.largeImageURL())
                    .setBackground("COLOR","#000000")
                    .setProgressBar("BAR","#00FF00")
                card.build()
                .then(data => {
                    const img = new MessageAttachment(data , 'spotify.png')
                    interaction.reply({files:[img]})
                })
                return
            }else if(member.presence.activities[4].name === 'Spotify'){
                const pres = member.presence.activities[4]
                const card = new canvacord.Spotify()
                    .setTitle(pres.details)
                    .setAuthor(pres.state)
                    .setAlbum(pres.assets.largeText)
                    .setStartTimestamp(pres.timestamps.start.getTime())
                    .setEndTimestamp(pres.timestamps.end.getTime())
                    .setImage(pres.assets.largeImageURL())
                    .setBackground("COLOR","#000000")
                    .setProgressBar("BAR","#00FF00")
                card.build()
                .then(data => {
                    const img = new MessageAttachment(data , 'spotify.png')
                    interaction.reply({files:[img]})
                })
                return
            }else if(member.presence.activities[5].name === 'Spotify'){
                const pres = member.presence.activities[5]
                const card = new canvacord.Spotify()
                    .setTitle(pres.details)
                    .setAuthor(pres.state)
                    .setAlbum(pres.assets.largeText)
                    .setStartTimestamp(pres.timestamps.start.getTime())
                    .setEndTimestamp(pres.timestamps.end.getTime())
                    .setImage(pres.assets.largeImageURL())
                    .setBackground("COLOR","#000000")
                    .setProgressBar("BAR","#00FF00")
                card.build()
                .then(data => {
                    const img = new MessageAttachment(data , 'spotify.png')
                    interaction.reply({files:[img]})
                })
                return
            }
        }catch(e){
            const no = new MessageEmbed().setDescription(`${member} is not listing to Spotify`).setColor("RED")
            interaction.reply({embeds:[no]})
        }
    }
}