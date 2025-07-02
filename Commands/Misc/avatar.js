const  { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'gets avatar of users',
    usage: "/avatar [user]",
    cooldown:5000,
    options:[
        {
            name:"user",
            description: "user to get description",
            type:"USER",
            required:false
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction,client) {
        const user = interaction.options.getUser("user") || interaction.user
        const av = new MessageEmbed()
        .setImage(user.avatarURL({dynamic:true}))
        .setAuthor({name:`${user.tag}`, iconURL:user.avatarURL({dynamic:true})})
        interaction.reply({embeds:[av]})
    }
}