const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../Structures/Schema/suggestsc")

module.exports = {
    name: "suggest",
    description: "Create a suggestion",
    usage: "/suggest <type> <suggestion>",
    options: [
        {
            name: "type",
            description: "Select what your suggestion realted to",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "SERVER",
                    value: "Server"
                },
                {
                    name: "EVENT",
                    value: "Event"
                },
                {
                    name: "BOT",
                    value: "Bot"
                },
                {
                    name: "OTHER",
                    value: "Other"
                }
            ]
        },
        {
            name: "suggestion",
            description: "describe your Suggestion.",
            type: "STRING",
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guildId, member, user } = interaction;

        const Type = options.getString("type");
        const Suggestion = options.getString("suggestion");

        const Embed = new MessageEmbed()
            .setColor("YELLOW")
            .setAuthor({name: user.tag, iconURL:user.displayAvatarURL({ dynamic: true })})
            .addFields(
                { name: "Suggestion: ", value: Suggestion, inline: false },
                { name: "Type: ", value: Type, inline: true },
                { name: "Status", value: "⏳ Pending", inline: true }
            )
            .setTimestamp()

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton().setCustomId("suggest-accept").setLabel("✅ Accept").setStyle("PRIMARY"),
            new MessageButton().setCustomId("suggest-decline").setLabel("⛔ Decline").setStyle("SECONDARY")
        )

        try {
            const M = await interaction.reply({ embeds: [Embed], components: [Buttons], fetchReply: true });
            M.react('<a:tick:936503384771555329>')
            M.react('<a:cross:936503135634063370>')

            await DB.create({
                GuildId: guildId,
                MessageID: M.id,
                Details: [
                    {
                        MemberID: member.id,
                        Type: Type,
                        Suggestion: Suggestion
                    }
                ]
            })
        } catch (err) {
            console.log(err)
        }
    }
}
