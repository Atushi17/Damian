const { CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
    name: "move",
    description: "move all members from one vc to other",
    permission: "MOVE_MEMBERS",
    usage: "/move <channel>",
    options: [
        {
            name: "channel",
            description: "channel to move",
            type: "CHANNEL",
            channelTypes: ['GUILD_VOICE'],
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const channelmv = interaction.options.getChannel("channel")
        if (channelmv.type !== 'GUILD_VOICE') return interaction.reply({ content: "PLEASE MENTION A VOICE CHANNEL", ephemeral: true })
        const channel = interaction.guild.channels.cache.get(interaction.member.voice.channel.id)
        channel.members.forEach(member => {
            member.voice.setChannel(channelmv)
        })
        interaction.reply(`Moved all members from ${channel} to ${channelmv}`)
    }
}
