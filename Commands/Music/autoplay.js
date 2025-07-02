const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'autoplay',
    description: 'toggle autoplay on or off',
    inVoiceChannel: true,
    usage: "/autoplay",
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
        try {
            let mode = client.distube.toggleAutoplay(interaction);
            const rr = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Changed!")
                .setDescription("Mode changed to:`" + (mode ? "ON" : "OFF") + "`")
            interaction.reply({ embeds: [rr] })
        }
        catch (e) {
            const er = new MessageEmbed()
                .setColor("RED")
                .setDescription("You can change the mode when Some song in queue")
                .setTitle("ERROR")
            interaction.reply({ embeds: [er] })
        }
    }
}