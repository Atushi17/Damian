const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'sudo',
    description: 'Makes a webhook to impersonate someone',
    permission: "MANAGE_WEBHOOKS",
    usage: '/sudo <user> <message>',
    cooldown: 10000,
    options: [
        {
            name: 'user',
            description: 'user to impersonte',
            type: "USER",
            required: true
        },
        {
            name: 'message',
            description: 'message to be impersonated',
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const message = interaction.options.getString('message')
        const member = interaction.options.getMember('user')
        const webhook = await interaction.channel.createWebhook(member.displayName, {
            avatar: member.user.avatarURL({format:'png'}),
            channel: interaction.channel.id
        });
        await webhook.send({content: message}).then(() => {
            webhook.delete();
        });
        interaction.reply({ content: 'Done', ephemeral: true })
    }
}