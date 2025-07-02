const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const progressbar = require('string-progressbar')
module.exports = {
    name: 'nowplaying',
    description: 'check which song is playing right now',
    usage: "/nowplaying",
    cooldown: 10000,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        try {
            const queue = client.distube.getQueue(interaction)
            queue.songs.map((song, id) => {
                if (id === 0) {
                    var total = song.duration
                    var current = queue.currentTime
                    let pro = progressbar.splitBar(total, current, 17)[0]
                    const psong = new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle('Playing 🎵')
                        .setDescription(`${song.name}-[${song.user}]\n` + `**[${queue.formattedCurrentTime}]**${pro}**[${song.formattedDuration}]**`)
                        .setThumbnail(`${song.thumbnail}`)
                        .addFields({
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
                    interaction.reply({ embeds: [psong] })
                }
            })
        }
        catch (e) {

            embedbuilder(client, interaction, "RED", "Current Queue!", `❌ | There is nothing playing!`)

        }
        function embedbuilder(client, interaction, color, title, description) {
            let embed = new MessageEmbed()
                .setColor(color)
                .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()});
            if (title) embed.setTitle(title);
            if (description) embed.setDescription(description);
            return interaction.reply({ embeds: [embed] });
        }
    }
}
