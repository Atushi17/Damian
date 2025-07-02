const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'jump',
    description: 'jump to a specific song',
    inVoiceChannel: true,
    usage: "/jump <song number>",
    cooldown: 10000,
    options: [
        {
            name: "number",
            description: "song number",
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
        const arg = interaction.options.getString("number")
        let queue = client.distube.getQueue(interaction);
        if (0 <= Number(arg) && Number(arg) <= queue.songs.length) {
            embedbuilder(client, interaction, "GREEN", "JUMPED", `Jumped to ${parseInt(arg)} songs!`)
            client.distube.jump(interaction, parseInt(arg))
        }
        else {
            embedbuilder(client, interaction, "RED", "ERROR", `Please use a number between **0** and **${DisTube.getQueue(interaction).length}**`)
        }
        function embedbuilder(client, interaction, color, title, description) {
            let embed = new MessageEmbed()
                .setColor(color)
                .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()});
            if (title) embed.setTitle(title);
            if (description) embed.setDescription(description);
            return interaction.reply({ embeds: [embed] });
        }
    }
}