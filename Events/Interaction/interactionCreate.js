const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const devs = ["813049288947007528"];
const cooldown = new Map()
const simplydjs = require("simply-djs");
const dd = new MessageEmbed()
    .setColor("RED")
    .setDescription("You can use only this command in an NSFW Channel!")
    .setFooter("💢")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        simplydjs.clickBtn(interaction, {
            timeout: false,
            credit: false,
            ticketname: "ticket-{username}" // Custom Ticket name. {tag} | {id} | {username}
        });
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription("🚫 An error occured while running this command.")
                ]
            }) && client.command.delete(interaction.commandName);

            if (command.devsOnly === true) {
                if (!devs.includes(interaction.member.id)) return interaction.reply({ content: "You can't use this command! It is only for devs", ephemeral: true });
            }

            const cmd = client.commands.get(interaction.commandName);
            if (cmd) {
                if (cmd.cooldown) {
                    const cooldwn = cooldown.get(`${cmd.name}${interaction.user.id}`) - Date.now();
                    const mth = Math.floor(cooldwn / 1000) + "";
                    if (cooldown.has(`${cmd.name}${interaction.user.id}`))
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("RED")
                                    .setDescription(
                                        `You are on a cooldown. Try this command again in \`${mth.split(".")[0]
                                        }\` seconds`
                                    ),
                            ],
                            ephemeral: true,
                        });
                    cooldown.set(
                        `${cmd.name}${interaction.user.id}`,
                        Date.now() + cmd.cooldown
                    );
                    setTimeout(() => {
                        cooldown.delete(`${cmd.name}${interaction.user.id}`);
                    }, cmd.cooldown);
                }
            }

            if (cmd.inVoiceChannel && !interaction.member.voice.channel) return interaction.reply(`❌ | You must be in a voice channel!`)
            if (cmd.nsfw && !interaction.channel.nsfw) return interaction.reply({ embeds: [dd] })
            command.execute(interaction, client)
        }
    }
}