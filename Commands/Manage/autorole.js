const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const schema = require('../../Structures/Schema/autorolesc')

module.exports = {
    name: "autorole",
    description: "Gives role whenever someone joins",
    permission:"MANAGE_ROLES",
    usage: "/autorole <options(add/remove)> <role>",
    options:[
        {
            name: "options",
            description: "Select an option.",
            type: "STRING",
            required: true,
            choices: [
                { name: "Add", value: "add"},
                { name: "Remove", value: "remove"},
            ]
        },
        {
            name:"role",
            description: "Provide the role for autorole",
            type: "ROLE",
            required: true
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction , client) {
        await interaction.deferReply();
        const { guild , options} = interaction;

        const Choice = options.getString("options")
        const role = options.getRole("role")

        const errembd = new MessageEmbed()
            .setColor('RED')
            .setDescription("⛔ You cannot add roles that are higher than yours.")

        const errbot = new MessageEmbed()
            .setColor('RED')
            .setDescription("⛔ This role is superior than the bot's role, bot's role should be higher than the role that is given.")

        const res = new MessageEmbed()
            .setDescription(`Added ${role} to autorole system.`)
            .setColor('GREEN')

        const removeres = new MessageEmbed()
            .setDescription(`Removed ${role} from autorole system.`)
            .setColor('GREEN')

        if (role.position > interaction.member.roles.highest.position) {
            return interaction.reply({ embeds: [errembd], ephemeral: true });
        }
        if (role.position > interaction.guild.me.roles.highest.position) return interaction.reply({ embeds: [errbot], ephemeral: true });

        switch (Choice) {
            case "add":
                schema.findOne({Guild: guild.id}, async(err,data) => {
                    if(err) throw err;
                    if(!data) {
                        await schema.create({
                            Guild: guild.id,
                            roles: role.id
                        })

                        return interaction.editReply({embeds:[res]})
                    }
                    if(data) {
                        data.roles.push(role.id)
                        interaction.editReply({embeds:[res]})
                    }

                    data.save();
                })
                break;
        
            case "remove":
                schema.findOne({Guild: guild.id}, async(err,data) => {
                    if(err) throw err;
                    if(!data) return interaction.editReply({content:`There is no data to remove!`, ephemeral: true})
                    if(data) {
                        data.roles.remove(role.id)
                        interaction.editReply({embeds:[removeres]})
                    }

                    data.save();
                })
                break;
        }
    }
}
