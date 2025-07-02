const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    description: "To kick a member from server",
    permission: "KICK_MEMBERS",
    usage: "/kick <user> [reason]",
    options: [
        {
            name: "user",
            description: "user to kick",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description:"reason of kicking",
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
        if(target.kickable){
            const res = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ kicked ${target}.\nReason: ${reason}`)
            target.kick({reason: reason})
            try{
                target.send(`You have been kicked from **${interaction.guild.name}**\nReason: ${reason}`)
            }catch{
                console.log("Couldn't dm")
            }
            return interaction.reply({embeds:[res]})
        } else {
            const res = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ That user is a mod/admin, Sorry i can not kick him/her`)
            return interaction.reply({embeds:[res]})
        }
    }
}