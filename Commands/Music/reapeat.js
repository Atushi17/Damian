const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'repeat',
    description: 'repeats a queue or song',
    inVoiceChannel: true,
    usage: "/repeat <mode (OFF/SONG/QUEUE)>",
    cooldown: 10000,
    options: [
        {
            name: "mode",
            description: "repeat mode",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "OFF",
                    value: "OFF"
                },
                {
                    name: "SONG",
                    value: "SONG"
                },
                {
                    name: "QUEUE",
                    value: "QUEUE"
                }
            ]
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
        const arg = interaction.options.getString("mode")
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply(`❌ | There is nothing playing!`)
        let mode = null
        switch (arg) {
            case "OFF":
                mode = 0
                break
            case "SONG":
                mode = 1
                break
            case "QUEUE":
                mode = 2
                break
        }
        mode = client.distube.setRepeatMode(interaction, mode)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
        interaction.reply(`✅ | Set repeat mode to \`${mode}\``)
    }
}