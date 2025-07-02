const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'resume',
    description: 'resume the songs',
    inVoiceChannel: true,
    usage: "/resume",
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
        if (!queue) return interaction.reply(`❌ | There is nothing in the queue right now!`)
        client.distube.resume(interaction)
        interaction.reply("⏯️ | Resumed the song for you :)")
    }
}