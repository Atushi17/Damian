const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/warnhan');

module.exports = {
    name: 'remove-warn',
    description: 'removes one warning for a user',
    permission: 'MANAGE_MESSAGES',
    usage: "/remove-warn <user> <warning no.>",
    options: [
        {
            name: "user",
            description: "user to remove warn",
            type: "USER",
            required: true
        },
        {
            name: "warning",
            description: "which warning to remove",
            type: "INTEGER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const user = interaction.options.getMember("user")
        const int = interaction.options.getInteger("warning")
        db.findOne({ guildid: interaction.guild.id, user: user.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                let number = int - 1
                data.content.splice(number, 1)
                interaction.reply(`Deleted the warn for ${user}`)
                data.save()
            } else {
                interaction.reply('This user does not have any warns in this server!')
            }
        })
    }
}
