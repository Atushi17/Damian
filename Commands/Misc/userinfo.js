const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "userinfo",
    type: "USER",
    context: true,
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);
        await target.user.fetch()
        const Responce = new MessageEmbed()
            .setColor(target.user.accentColor || "RANDOM")
            .setAuthor({name: target.user.tag, iconURL: target.user.avatarURL({ dynamic: true })})
            .setThumbnail(target.user.avatarURL({ dynamic: true }))
            .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "")
            .addFields(
                { name: "ID", value: target.user.id },
                { name: "Joined Server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "Account Created", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "Roles", value: target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None" },
                { name: "Accent Colour", value: target.user.accentColor ? `#${target.user.accentColor.toString(16)}` : "None" },
                { name: "Banner", value: target.user.bannerURL() ? "** **" : "None" }
            );

        interaction.reply({ embeds: [Responce], ephemeral: true })

    }
}