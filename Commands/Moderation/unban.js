const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "unban",
    description: "To unban a member from server",
    permission: "BAN_MEMBERS",
    usage: "/unban <user id>",
    options: [
        {
            name: "id",
            description: "id of the user to unban",
            type: "STRING",
            required: true
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const id = interaction.options.getString("id")
        try {
            interaction.guild.bans.remove(id)
            const res = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Unbanned <@${id}>`)
            interaction.reply({ embeds: [res] })
        } catch (e) {
            const res = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ Cannot find <@${id}> in banned list`)
            interaction.reply({ embeds: [res] })
        }
    }
}