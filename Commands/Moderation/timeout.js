const { MessageEmbed, CommandInteraction, Client} = require('discord.js');
const ms = require('ms')

function min(time){

    var number = time.match(/\d+/g);

    const sec = `${number[0]} seconds`
    const min = `${number[0]} minutes`
    const hrs = `${number[0]} hours`
    const day = `${number[0]} days`

    var num = time.match(/[a-zA-Z]+/g);
    
    if(num[0] === 's'){
        return sec
    }
    if(num[0] === 'm'){
        return min
    }
    if(num[0] === 'h'){
        return hrs
    }
    if(num[0] === 'd'){
        return day
    }
}

module.exports = {
    name: 'timeout',
    description: 'mute a user',
    permission: "MODERATE_MEMBERS",
    usage: "/timeout <user> <reason> <time (1m, 1d, 1h...)>",
    options: [
        {
            name: "user",
            description: "user to mute",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason of muting",
            type: "STRING",
            required: true
        },
        {
            name: "time",
            description: "provide time in 1m,1d,1h",
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, options } = interaction

        const Target = options.getMember("user")
        const Reason = options.getString("reason")
        const Duration = options.getString("time")
        const member = interaction.guild.members.cache.get(Target.id)

        const errres = new MessageEmbed()
            .setColor("RED")
            .setDescription(`Couldn't timeout the user, That User is Admin/Moderator`)

        const res = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Timeout-ed: ${Target}\nReason: \`${Reason}\`\nDuration: \`${min(Duration)}\``)
        
        const timeInMs = ms(Duration);
        if(!timeInMs) return interaction.reply({content: "Please Specify a valid Time!!", ephemeral: true})
        
        if(Target.permissions.has("MODERATE_MEMBERS")){
            return interaction.reply({embeds:[errres]})
        }
        
        member.timeout(timeInMs, Reason)
            .then(interaction.reply({embeds:[res]}))
    }
}