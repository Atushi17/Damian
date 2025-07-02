const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'stops the song and clear the queue',
    inVoiceChannel: true,
    usage: "/stop",
    cooldown: 5000,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        let memberVoiceChannel = interaction.member.voice.channel
        if (interaction.guild.me.voice.channelId && memberVoiceChannel.id !== interaction.guild.me.voice.channelId) {
            return interaction.reply({ content: `I am already playing music in <#${interaction.guild.me.voice.channelId}>`, ephemeral: true })
        }
        const queue = client.distube.getQueue(memberVoiceChannel)
        if (!queue) return interaction.reply(`❌ | There is nothing in the queue right now!`)
        queue.stop(memberVoiceChannel)
        interaction.reply("✅ | STOPED!!")
    }
}
