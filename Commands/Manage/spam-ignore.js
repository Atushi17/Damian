const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/antispamsc')

module.exports = {
    name: 'ignore-spam',
    description: 'Channel in which anti-spam is ignored',
    permission: "MANAGE_MESSAGES",
    usage: "/ignore-spam <channel>",
    cooldown: 10000,
    options: [
        {
            name: "channel",
            description: "channel to be ignored",
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
        db.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.delete()
                data = new db({
                    GuildID: interaction.guild.id,
                    mode: true,
                    igchannel: channel.id
                })
            } else {
                return interaction.reply("First please set antispam on")
            }
            interaction.reply({ content: `${channel} is set as ignored channel` })
            data.save()
        })
    }
}