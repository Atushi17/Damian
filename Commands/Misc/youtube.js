const { MessageEmbed, CommandInteraction, Client, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'youtube',
    description: 'play youtube in vc',
    usage: "/youtube",
    permissions: "START_EMBEDDED_ACTIVITIES",
    cooldown: 50000,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const channel = interaction.member.voice.channel
        const embed = new MessageEmbed()
            .setColor("RED")
            .setDescription("> :860133545544908802: **You must be connected to a voice channel to use this command.**")
        const embedembed = new MessageEmbed()
            .setDescription("I was unable to start a yt together session.")
            .setColor("DARK_RED")
        if (!channel) return interaction.reply({ embeds: [embed] })
        client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
            if (!invite.code) return interaction.reply({ embeds: [embedembed] })
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("Youtube")
                        .setStyle("LINK")
                        .setURL(invite.code))
            const inviteembed = new MessageEmbed()
                .setDescription("> **Click on the button to start playing Youtube**")
                .setFooter({text:"Note: It's only for PC users"})
                .setColor("RANDOM")
            interaction.reply({ embeds: [inviteembed], components: [row] })
        });
    }
}
