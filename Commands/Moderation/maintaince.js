const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/mantaincemodesc')
module.exports = {
    name: 'maintenance',
    description: 'put your server in maintenace',
    usage: "/maintenance <mode (ON/OFF)>",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "mode",
            description: "enable or disable it",
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
                    if (data) {
                        return interaction.reply({ content: "Maintenance mode is already ON !!", ephemeral: true })
                    } else {
                        data = new db({
                            GuildID: interaction.guild.id,
                            mode: true
                        })
                        interaction.guild.channels.cache.forEach(ch => {
                            ch.permissionOverwrites.edit(interaction.guild.roles.everyone.id, {
                                VIEW_CHANNEL: false,
                                CONNECT: false
                            })
                        })
                        interaction.guild.channels.create('maintainence-chat', { //Create a channel
                            type: 'text', //Make sure the channel is a text channel
                            permissionOverwrites: [{ //Set permission overwrites
                                id: interaction.guild.roles.everyone.id,
                                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                            }]
                        });
                        interaction.guild.channels.create('maintainence-vc', { //Create a channel
                            type: 'GUILD_VOICE', //Make sure the channel is a text channel
                            permissionOverwrites: [{ //Set permission overwrites
                                id: interaction.guild.roles.everyone.id,
                                allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
                            }]
                        });
                        interaction.reply(`Done i have hidden the all voice  AND TEXT Channels which were in server and maken an maintainence vc and maintainence`)
                    }
                    data.save()
                })
            }
                break;
            case "OFF": {
                db.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
                    if (data) {
                        await db.findOneAndDelete({ mode: true })
                        interaction.guild.channels.cache.forEach(ch => {
                            ch.permissionOverwrites.edit(interaction.guild.roles.everyone.id, {
                                VIEW_CHANNEL: true,
                                CONNECT: true
                            })
                        })
                        try {
                            interaction.guild.channels.cache.find(channel => channel.name === "maintainence-chat").delete("Maintainence mode off");
                            interaction.guild.channels.cache.find(channel => channel.name === "maintainence-vc").delete("Maintainence mode off");
                            interaction.reply(`Done i have unhidden the all voice  AND TEXT Channels which were in server and deleted the maintainence vc and maintainence chat`)
                        } catch (err) {
                            interaction.reply("Was not able to find the maintenance vc or chat")
                            interaction.channel.send(`Done i have unhidden the all voice  AND TEXT Channels which were in server!`)
                        }
                    }
                })
            }
        }
    }
}