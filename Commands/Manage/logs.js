const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../Structures/Schema/logshan');

module.exports = {
    name: "set-logs",
    description: 'set the modlog channel',
    permission: "ADMINISTRATOR",
    usage: "/set-logs <channel>",
    options: [
        {
            name: 'channel',
            description: 'The Channel the modlogs will be in',
            type: 'CHANNEL',
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel');
        const guild1 = interaction.guild;
        let webhookid;
        let webhooktoken;
        await channel.createWebhook(guild1.name, { avatar: guild1.iconURL({ format: "png" }) })
            .then(webhook => {
                webhookid = webhook.id;
                webhooktoken = webhook.token;
            });

        Guild.findOne({ guildID: interaction.guild.id }, async (err, guild) => {
            if (!guild) {
                guild = new Guild({
                    guildID: interaction.guild.id,
                    guildName: interaction.guild.name,
                    logChannelID: channel.id,
                    webhookid: webhookid,
                    webhooktoken: webhooktoken
                });

                interaction.reply(`The log channel has been set to ${channel}`);
            } else {
                await Guild.updateOne({
                    logChannelID: channel.id,
                    webhookid: webhookid,
                    webhooktoken: webhooktoken
                });

                return interaction.reply(
                    `The log channel has been updated to ${channel}`
                );
            }
            guild.save()
        });
    }
}