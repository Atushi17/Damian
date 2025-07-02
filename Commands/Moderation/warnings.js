const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/warnhan');

module.exports = {
    name: 'warnings',
    description: 'gives you all the warnings',
    permission: 'MANAGE_MESSAGES',
    usage: "/warnings <user>",
    options: [
        {
            name: "user",
            description: "users to get warnings",
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
                const res = new MessageEmbed()
                    .setTitle(`${user.displayName}'s warns`)
                    .setDescription(`
                        ${data.content.map(
                        (w, i) =>
                            `\`${i + 1}\` | Moderator : ${interaction.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}\n`
                    )}
                    `)
                    .setColor("BLUE")
                interaction.reply({ embeds: [res] })
            } else {
                interaction.reply('User has no Warnings')
            }

        })
    }
}