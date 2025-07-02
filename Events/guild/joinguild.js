const { MessageEmbed, CLient, Guild } = require("discord.js");

module.exports = {
    name: "guildCreate",
    on: true,
    /**
    * @param {Client} client
    * @param {Guild} guild
    */
    async execute(guild, client) {
        
        let tserver = client.guilds.cache.size;

		client.user.setActivity(`/help | Damian watching ${tserver} server's`, {
			type: 'PLAYING',
		});
        
        const embed = new MessageEmbed()
        .setTitle('Joined a new Guild')//u can change "Guild" to "Server"
        .setAuthor({name:`${client.user.tag}`, iconURL:client.user.displayAvatarURL()})
        .setColor('GREEN')
        .addField('**Guild Info**', ` \`${guild.name} (${guild.id})\``, true)
        .addField('**Owner Info**', `<@${guild.ownerId}>`, true)
        .addField('**Server Member Count**', ` \`${guild.memberCount}\``, true)
        .addField('**Total Servers**', ` \`${client.guilds.cache.size}\``, true)
        .addField('**Total Member count**', ` \`${client.users.cache.size}\``, true)
        .setTimestamp()
        .setThumbnail(guild.iconURL({ dynamic: true }));
        
        const Owner = client.users.cache.get('921735782434218084');
    
        Owner.send({embeds: [embed]});
        
    }}
