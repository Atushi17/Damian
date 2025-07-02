const { Client, MessageEmbed, CommandInteraction } = require('discord.js');


module.exports = {
    name: 'membercount',
    description: 'Check members in the server',
    usage: "/membercount",
    cooldown:10000,
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction , client) {
        const {guild} = interaction;
        const embed = new MessageEmbed()
        .setColor("#FF0000")
        .setAuthor({name: `Member Count of ${interaction.guild}`, iconURL: interaction.guild.iconURL({ dynamic: true })})
        .setTitle("Members")
        .setDescription (`Total: ${guild.members.cache.size}\n Members: ${guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${guild.members.cache.filter(member => member.user.bot).size}`, true)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setFooter({text: `Requested by ${interaction.user.tag}`})
        .setTimestamp()
       
            interaction.reply({ embeds: [embed]})
  }
}