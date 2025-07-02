const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'skip',
    description: 'skips a song',
    inVoiceChannel: true,
    usage: "/skip",
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
        try {
            client.distube.skip(interaction)
            interaction.reply(`✅ | Skipped! Now playing:\n${queue.songs[1].name}`)
        } catch (e) {
            interaction.reply(`❌ | ${e}`)
        }
    }
}