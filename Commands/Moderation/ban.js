const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "To ban a member from server",
    permission: "BAN_MEMBERS",
    usage: "/ban <user> [reason]",
    options: [
        {
            name: "user",
            description: "user to ban",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason of banning",
            type: "STRING",
            required: false
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const target = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason") || "No reason provided"
        if (target.bannable) {
            const res = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Banned ${target}.\nReason: ${reason}`)
            target.ban({ days: 1, reason: reason })
            interaction.reply({ embeds: [res] })
            try {
                return target.send(`You have been banned from **${interaction.guild.name}**\nReason: ${reason}`)
            } catch(err) {
                console.log('could not send dm')
            }
        } else {
            const res = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ That user is a mod/admin, Sorry i can not ban him/her`)
            return interaction.reply({ embeds: [res] })
        }
    }
}