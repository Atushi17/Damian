const { MessageEmbed } = require("discord.js")

module.exports = async (client) => {
    const status = (queue) => `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
    client.distube
        .on('playSong', (queue, song) => {
            const psong = new MessageEmbed()
                .setColor("GREEN")
                .setTitle('Playing 🎵')
                .setDescription(`${song.name}`)
                .setThumbnail(`${song.thumbnail}`)
                .addFields({
                    name: "Requested by",
                    value: `${song.user}`,
                    inline: true
                },
                    {
                        name: "Duration",
                        value: `\`${queue.formattedCurrentTime}\` - \`${song.formattedDuration}\``,
                        inline: true
                    },
                    {
                        name: "Views",
                        value: `${song.views}`,
                        inline: true
                    },
                    {
                        name: "Likes 👍",
                        value: `${song.likes}`,
                        inline: true
                    },
                    {
                        name: "Dislikes 👎",
                        value: `${song.dislikes}`,
                        inline: true
                    },
                    {
                        name: "Volume 🔉",
                        value: `\`${queue.volume}\``,
                        inline: true
                    },
                    {
                        name: "Filter",
                        value: `\`${queue.filters.join(', ') || "OFF"}\``,
                        inline: true
                    },
                    {
                        name: "Loop",
                        value: `\`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\``,
                        inline: true
                    },
                    {
                        name: "AutoPlay",
                        value: `\`${queue.autoplay ? "On" : "Off"}\``,
                        inline: true
                    })
            queue.textChannel.send({ embeds: [psong] })
        })
        .on('addSong', (queue, song) => {
            const asong = new MessageEmbed()
                .setColor("WHITE")
                .setTitle("Added Song")
                .setDescription(`Song: \`${song.name}\`  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}`)
            queue.textChannel.send({ embeds: [asong] })
        })
        .on('addList', (queue, playlist) => {
            const plist = new MessageEmbed()
                .setColor("WHITE")
                .setTitle("Playlist Added")
                .setDescription(`Added \`${playlist.name}\` playlist to queue\n${status(queue)}\nRequested by :- ${playlist.member}`)
            queue.textChannel.send({ embeds: [plist] })
        })
        .on('finish', queue => {
            const finis = new MessageEmbed().setColor("RED").setDescription("Finished queue!!")
            queue.textChannel.send({ embeds: [finis] })
        })
        .on("disconnect", queue => queue.textChannel.send({
            embeds: [new MessageEmbed().setColor("RED")
                .setDescription(`leaving the channel...👋`)]
        }))
        .on("empty", queue => queue.textChannel.send({
            embeds: [new MessageEmbed().setColor("RED")
                .setDescription(`Voice channel is empty!\nleaving the channel...👋`)]
        }
        ))
}
