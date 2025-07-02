const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'get server queue',
    inVoiceChannel: true,
    usage: "/queue",
    cooldown: 10000,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        let memberVoiceChannel = interaction.member.voice.channel
        if (interaction.guild.me.voice.channelId && memberVoiceChannel.id !== interaction.guild.me.voice.channelId) {
            return interaction.reply({ content: `I am already playing music in <#${interaction.guild.me.voice.channelId}>`, ephemeral: true })
        }
        const queue = client.distube.getQueue(interaction)
        if (!queue) {
            const er = new MessageEmbed()
                .setDescription("❌ | The queue is empty !!")
                .setColor("RED")
            return interaction.reply({ embeds: [er] })
        }
        try {
            let curqueue = queue.songs.map((song, id) =>
                `**${id === 0 ? "Playing:" : `${id}.`}**. ${song.name} - \`${song.formattedDuration}\``
            ).join("\n");
            const respon = new MessageEmbed()
                .setColor("DARK_VIVID_PINK")
                .setTitle("Current Queue!")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setDescription(curqueue)
            interaction.reply({ embeds: [respon] })
        } catch (e) {
            const er = new MessageEmbed()
                .setDescription("❌ | There was an error")
                .setColor("RED")
            interaction.reply({ embeds: [er] })
        }
    }
}