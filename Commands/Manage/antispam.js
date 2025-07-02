const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/antispamsc')

module.exports = {
    name: 'antispam',
    permission: "MANAGE_MESSAGES",
    description: 'to turn antispam on or off',
    usage: "/antispam <mode(ON/OFF)>",
    cooldown: 15000,
    options: [
        {
            name: "mode",
            description: "to turn on and off",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "ON",
                    value: "ON"
                },
                {
                    name: "OFF",
                    value: "OFF"
                }
            ]
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const mode = interaction.options.getString("mode")
        switch (mode) {
            case "ON": {
                db.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
                    if (data) data.delete();
                    new db({
                        GuildID: interaction.guild.id,
                        mode: true,
                    }).save();
                    interaction.reply({ content: `AntiSpam is turned on` , ephemeral:true})
                })
            }
                break;
            case "OFF": {
                db.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
                    if (data) {
                        data.delete();
                        interaction.reply({ content: `AntiSpam is turned off` , ephemeral:true})
                    }
                    if (!data) {
                        interaction.reply({ content: `AntiSpam is already off` , ephemeral:true})
                    }
                })
            }
        }
    }
}
