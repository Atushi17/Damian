const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'set the volume btw 1 to 150',
    inVoiceChannel: true,
    usage: "/volume <vol>",
    cooldown: 10000,
    options: [
        {
            name: "vol",
            description: "volume to set",
            type: "NUMBER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        let memberVoiceChannel = interaction.member.voice.channel
        if (interaction.guild.me.voice.channelId && memberVoiceChannel.id !== interaction.guild.me.voice.channelId) {
            return interaction.reply({ content: `I am already playing music in <#${interaction.guild.me.voice.channelId}>`, ephemeral: true })
        }
        const arg = interaction.options.getNumber("vol")
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply(`❌ | There is nothing in the queue right now!`)
        const volume = parseInt(arg)
        if (isNaN(volume)) return interaction.reply(`❌ | Please enter a valid number!`)
        client.distube.setVolume(interaction, volume)
        interaction.reply(`✅ | Volume set to \`${volume}\``)
    }
}