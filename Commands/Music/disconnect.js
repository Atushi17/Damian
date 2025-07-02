const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
module.exports = {
    name: 'disconnect',
    description: 'disconnect from voice channel',
    inVoiceChannel: true,
    usage: "/disconnect",
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
        if (!interaction.guild.me.voice.channelId) return interaction.reply({ content: "I am not in a voice channel!!", ephemeral: true })
        client.distube.voices.leave(interaction.guild.id)
        interaction.reply({ content: "Disconnected!!", ephemeral: true })
    }
}