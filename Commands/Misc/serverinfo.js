const  { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const G = require('glob');
const moment = require('moment')
module.exports = {
    name: 'serverinfo',
    description: 'gives server info',
    usage: "/serverinfo",
    cooldown:20000,
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction,client) {
        const guild = interaction.guild
        const res = new MessageEmbed()
        .setTitle(guild.name)
        .setThumbnail(guild.iconURL())
        .setColor("RANDOM")
        .addFields([
            {
                name:"Gerneral info",
                value:`ID: ${guild.id}\nName: ${guild.name}\nOwner: <@${guild.ownerId}>`
            },
            {
                name:"Counts",
                value:`Role: \`${guild.roles.cache.size}\` roles
                Categories: \`${guild.channels.cache.filter((ch) => ch.type === "GUILD_CATEGORY").size}\` total
                Channels: \`${guild.channels.cache.filter((ch) => ch.type === "GUILD_TEXT" || ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\` total
                \`\`\`Text: ${guild.channels.cache.filter((ch)=> ch.type === "GUILD_TEXT").size} texts\nVoice: ${guild.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size} vc's\nStages: ${guild.channels.cache.filter((ch) => ch.type === "GUILD_STAGE_VOICE").size} stages\`\`\`
                Emojis: \`${guild.emojis.cache.size}\` total
                \`\`\`Regular: ${guild.emojis.cache.filter((e) => !e.animated).size}\nAnimated: ${guild.emojis.cache.filter((e) => e.animated).size}\`\`\``
            },
            {
                name:"Additional Information",
                value:`Created: \`${moment(guild.createdTimestamp).format("LT")} ${moment(guild.createdTimestamp).format("LL")} (${moment(guild.createdTimestamp).fromNow()})\`
                Region: \`${guild.preferredLocale}\`
                Boost Teir: \`${guild.premiumTier ? `Teir ${guild.premiumTier}` : "None"}\`
                Boost Count: \`${guild.premiumSubscriptionCount || "0"}\``
            }
        ])
        .setFooter({text: `Requested by - ${interaction.user.tag}`})
        interaction.reply({embeds:[res]})
    }
}