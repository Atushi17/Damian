const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/welcomesc')

module.exports = {
    name: 'welcomer',
    description: 'enable welcomer',
    usage: "/welcomer <channel>",
    permission: "KICK_MEMBERS",
    options: [
        {
            name: "channel",
            description: "channel in which it sends the message",
            type: "CHANNEL",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel("channel")

        db.findOne({ guildid: interaction.guild.id }, async (err, data) => {
            if (!data) {
                data = new db({
                    guildid: interaction.guild.id,
                    channelID: channel.id
                })
                interaction.reply({ content: `Welcome channel is set to ${channel}`, ephemeral: true })
            } else {
                await db.findOneAndDelete({ guildid: interaction.guild.id });
                data = new db({
                    guildid: interaction.guild.id,
                    channelID: channel.id
                })
                interaction.reply({ content: `Welcome channel is updated to ${channel}`, ephemeral: true })
            }
            data.save()
        })
    }
}