const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const moment = require("moment");

module.exports = {
    name: 'whois',
    description: "get user's info",
    usage: "/whois [user]",
    options: [
        {
            name: "user",
            description: "user to get info",
            type: "USER",
            required: false
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild } = interaction
        const owner = await interaction.guild.fetchOwner()
        const member = interaction.options.getMember("user") || interaction.member
        const avpng = member.user.displayAvatarURL({ format: "png", dynamic: true })
        const joinedServerAt = `📅 ${moment(member.joinedTimestamp).format("DD/MM/YYYY")}`
        const isBot = member.user.bot ? "✅" : "❌";
        let memberPermissons = `${member.permissions.toArray().map(p => `\`${p}\``).join(", ")}`;
        if (member.user.id === owner.id) {
            memberPermissons = "SERVER OWNER"
        };
        const joinedDiscordAt = `📅 ${moment(member.user.createdTimestamp).format("DD/MM/YYYY")}`
        const flags = {
            DISCORD_EMPLOYEE: '<:employee:936503222737186828>',
            PARTNERED_SERVER_OWNER: '<:partnerbadge:936503356803940433>',
            BUGHUNTER_LEVEL_1: '<:bughunter1:936503067191439380>',
            BUGHUNTER_LEVEL_2: '<:bughunter2:936503099181371512>',
            HYPESQUAD_EVENTS: '<:HypeSquad:936503031648886824>',
            HOUSE_BRAVERY: '<:hypesquad_bravery:936503274327121970>',
            HOUSE_BRILLIANCE: '<:hypesquad_briliance:936503305633406986>',
            HOUSE_BALANCE: '<:hypesquad_balance:936503249652056084>',
            EARLY_SUPPORTER: '<:earlysupporter:936503197000929330>',
            TEAM_USER: 'Team User',
            SYSTEM: '<:verified:936503418544062474>',
            VERIFIED_BOT: '<:verifiedbot1fromvega:936503447237308436><:discordverifiedbot2fromvega:936503168995573811>',
            EARLY_VERIFIED_BOT_DEVELOPER: '<:verifiedbotdeveloper:936503470922535002>',
            DISCORD_CERTIFIED_MODERATOR: '<:moderator:936503330065219634>'
        };
        const userFlags = member.user.flags.toArray();
        const badges = userFlags.length ? userFlags.map(flag => flags[flag]).join(", ") : "None";
        const statuses = {
            "online": "🟢",
            "idle": "🌙",
            "dnd": "⛔",
            "offline": "⚫️",
        };
        const status = `${statuses[member.presence.status]} ${member.presence.status}`
        const activity = member.presence.activities[0];
        var userstatus = "None";
        if (activity) {
            if (activity.type === "CUSTOM_STATUS") {
                let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a" : ""}:${activity.emoji.name}:${activity.emoji.id}>` : activity.emoji.name : ""}`
                userstatus = `${emoji} \`${activity.state || 'None'}\``
            }
            else {
                userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
            }
        };
        const totalRoles = await member.roles.cache.size;
        const roles = await member.roles;
        const highestRole = member.roles.highest.id === guild.id ? 'None' : member.roles.highest;
        function trimArray(arr, maxLen = 25) {
            if (Array.from(arr.values()).length > maxLen) {
                const len = Array.from(arr.values()).length - maxLen;
                arr = Array.from(arr.values()).sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
                arr.map(role => `<@&${role.id}>`)
                arr.push(`${len} more...`);
            }
            return arr.join(", ");
        }
        const Roles = await member.roles.cache.size < 25 ? Array.from(roles.cache.values()).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : "None";

        await member.user.fetch()
        const Responce = new MessageEmbed()
            .setColor(member.user.accentColor || "RANDOM")
            .setAuthor({name: member.user.tag, iconURL: member.user.avatarURL({ dynamic: true })})
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setImage(member.user.bannerURL({ dynamic: true, size: 512 }) || "")
            .addFields(
                { name: `Avatar `, value: `[PNG](${avpng})`, inline: false },
                { name: `Joined Server At `, value: `${joinedServerAt}`, inline: false },
                { name: `Account Created AT `, value: `${joinedDiscordAt}`, inline: false },
                { name: `Bot `, value: `${isBot}`, inline: false },
                { name: `Badges `, value: `${badges}`, inline: false },
                { name: `Status `, value: `${status}`, inline: false },
                { name: `Activity `, value: `${userstatus}`, inline: false },
                { name: `ID `, value: `${member.user.id}`, inline: false },
                { name: `Roles `, value: `${Roles}`, inline: false },
                { name: `Highest Role `, value: `${highestRole}`, inline: false },
                { name: "Banner", value: member.user.bannerURL() ? "** **" : "None" }
            );

        interaction.reply({ embeds: [Responce] })
    }
}
