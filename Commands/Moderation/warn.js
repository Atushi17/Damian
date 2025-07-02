const db = require('../../Structures/Schema/warnhan');
const { MessageEmbed, CommandInteraction } = require('discord.js')

module.exports = {
    name: 'warn',
    description: 'warns members',
    permission: 'MANAGE_MESSAGES',
    usage: "/warn <user> <reason>",
    options: [
        {
            name: "user",
            description: "user to warn",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason of warning",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const user = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason")
        db.findOne({ guildid: interaction.guild.id, user: user.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new db({
                    guildid: interaction.guild.id,
                    user: user.user.id,
                    content: [
                        {
                            moderator: interaction.user.id,
                            reason: reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: interaction.user.id,
                    reason: reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        const send = new MessageEmbed()
            .setDescription(`You have been warned for \`${reason}\` in \`${interaction.guild.name}\``)
            .setColor("RED")
        const embed = new MessageEmbed().setDescription(`Warned ${user} for \`${reason}\``).setColor('BLUE')
        interaction.reply({ embeds: [embed] })
        try{
            user.send({ embeds: [send] })
        }catch{
            console.log('could not dm')
        }
    }
}