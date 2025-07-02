const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/warnhan');

module.exports = {
    name: 'clear-warns',
    description: 'clears all warnings of a user',
    permission: "MANAGE_MESSAGES",
    usage: "/clear-warns <user>",
    cooldown: 5000,
    options: [
        {
            name: "user",
            description: "user to clear wanings",
            type: "USER",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const user = interaction.options.getMember("user")
        db.findOne({ guildid: interaction.guild.id, user: user.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await db.findOneAndDelete({ user: user.id, guildid: interaction.guild.id })
                interaction.reply(`Cleared all ${user.displayName}'s warnings`)
            } else {
                interaction.reply('This user does not have any warns in this server!')
            }
        })
    }
}
