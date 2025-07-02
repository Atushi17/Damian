const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
module.exports = {
    name: 'play',
    description: 'play a song',
    inVoiceChannel: true,
    usage: "/play",
    cooldown: 5000,
    options: [
        {
            name: "song",
            description: "song to play",
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        let memberVoiceChannel = interaction.member.voice.channel
        const arg = interaction.options.getString("song")
        let query = interaction.options.get("song").value;

        if (interaction.guild.me.voice.channelId && memberVoiceChannel.id !== interaction.guild.me.voice.channelId) {
            return interaction.reply({ content: `I am already playing music in <#${interaction.guild.me.voice.channelId}>`, ephemeral: true })
        }

        const res = new MessageEmbed()
            .setColor("YELLOW")
            .setTitle("SEARCHING...")
            .setDescription(`🔎 ${arg}`)
        interaction.reply({ embeds: [res] })

        client.distube.play(memberVoiceChannel, query, { textChannel: interaction.channel, member: interaction.member })
    }
}
