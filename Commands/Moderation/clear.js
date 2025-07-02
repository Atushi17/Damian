const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Deletes a specified number of messages from a channel or a target.",
    permission: "MANAGE_MESSAGES",
    usage: "/clear <amount> [user]",
    options: [
        {
            name: "amount",
            description: "Selete the aount of messages to delete from a channel",
            type: "NUMBER",
            required: true
        },
        {
            name: "user",
            description: "Select a user to clear their messages.",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction){
        const {channel, options} = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("user");
        if(Amount >= 100){
            interaction.reply({content:"You can't purge more than 100 messages"})
            setTimeout(function(){ 
                interaction.deleteReply(); 
            }, 10000);
            return
        }

        const Messages = await channel.messages.fetch();
        const Response = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK");

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 Cleared \`${messages.size}\` messages from ${Target}.`);
                interaction.reply({embeds: [Response]});
                setTimeout(function(){ 
                    interaction.deleteReply(); 
                }, 10000);
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 Cleared \`${messages.size}\` messages from this channel.`);
                interaction.reply({embeds:[Response]});
                setTimeout(function(){ 
                    interaction.deleteReply(); 
                }, 10000);
            });
        }
    }
}