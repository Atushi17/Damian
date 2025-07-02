const { MessageEmbed, GuildMember, MessageAttachment, Client, Role } = require("discord.js");
const schema = require('../../Structures/Schema/autorolesc')

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     * @param {Client} client
     */
    async execute(member, client) {
        
        const {guild} = member

        schema.findOne({Guild: guild.id}, async(err, data) => {
            if(err) throw err
            if(!data) return;
            if(data) {
                let rolearray = data.roles
                rolearray.forEach(role => {
                    const check = guild.roles.cache.get(role)
                    if(!check) return rolearray.remove(role);
                    member.roles.add(role)
                });
            }

            data.save();
        })
    }
}