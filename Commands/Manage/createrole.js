const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'addrole',
    description: 'adds a role',
    permission: "MANAGE_ROLES",
    usage: '/addrole <role name>',
    cooldown: 10000,
    options: [
        {
            name: "name",
            description: "role name",
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const rolename = interaction.options.getString("name")
        const res = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Created role ${rolename}`)

        await interaction.guild.roles.create({
            name: rolename,
            reason: "asked by moderator"
        })

        interaction.reply({ embeds: [res] })
    }
}