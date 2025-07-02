const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const filters = ["3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "flanger"]
module.exports = {
    name: 'filter',
    description: 'set a filter',
    inVoiceChannel: true,
    usage: "/filter <name>",
    cooldown: 10000,
    options: [
        {
            name: "name",
            description: "name of the filter",
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
        if (interaction.guild.me.voice.channelId && memberVoiceChannel.id !== interaction.guild.me.voice.channelId) {
            return interaction.reply({ content: `I am already playing music in <#${interaction.guild.me.voice.channelId}>`, ephemeral: true })
        }
        const arg = interaction.options.getString("name")
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply(`${client.emotes.error} | There is nothing in the queue right now!`)
        if (arg === "off" && queue.filter) client.distube.setFilter(interaction, queue.filter)
        else if (Object.keys(client.distube.filters).includes(arg)) {
            const fil = client.distube.setFilter(interaction, arg)
            interaction.reply(`Current Queue Filter: \`${fil.join(', ') || "Off"}\``)
        }
        else if (arg) return interaction.reply(`${client.emotes.error} | Not a valid filter\ Avaiable filters - ${filters}`)
    }
}