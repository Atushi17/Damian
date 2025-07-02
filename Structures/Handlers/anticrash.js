const { MessageEmbed } = require('discord.js');

module.exports = async (client) => {
	process.on('unhandledRejection', (reason, promise) => {
		const channel = client.channels.cache.get('967790418601328670');

		const embed = new MessageEmbed()
			.setAuthor(`Anti Crash`)
			.setTitle(`Unhandled Rejection`)
			.setURL('https://nodejs.org/api/process.html#event-unhandledrejection')
			.addField('Promise', `\`\`\`${promise}\`\`\``, true)
			.addField('Reason', `\`\`\`${reason}\`\`\``, true)
			.setTimestamp()
			.setFooter('Imagine a bot without anti-crash')
			.setColor('RED');

		return channel.send({ embeds: [embed] });
	});

	process.on('uncaughtException', (err, origin) => {
		const channel = client.channels.cache.get('967790418601328670');

		const embed = new MessageEmbed()
			.setAuthor(`Anti Crash`)
			.setTitle(`Uncaught Exception`)
			.setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
			.addField('Origin', `\`\`\`${origin}\`\`\``, true)
			.addField('Error', `\`\`\`${err}\`\`\``, true)
			.setTimestamp()
			.setFooter('Imagine a bot without anti-crash')
			.setColor('RED');

		return channel.send({ embeds: [embed] });
	});

	process.on('uncaughtExceptionMonitor', (err, origin) => {
		const channel = client.channels.cache.get('967790418601328670');

		const embed = new MessageEmbed()
			.setAuthor(`Anti Crash`)
			.setTitle(`Uncaught Exception Monitor`)
			.setURL(
				'https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor'
			)
			.addField('Origin', `\`\`\`${origin}\`\`\``, true)
			.addField('Error', `\`\`\`${err}\`\`\``, true)
			.setTimestamp()
			.setFooter('Imagine a bot without anti-crash')
			.setColor('RED');

		return channel.send({ embeds: [embed] });
	});

	process.on('multipleResolves', (type, promise, reason) => {
		const channel = client.channels.cache.get('967790418601328670');

		const embed = new MessageEmbed()
			.setAuthor(`Anti Crash`)
			.setTitle(`Multiple Resolves`)
			.setURL('https://nodejs.org/api/process.html#event-multipleresolves')
			.addField('Type', `\`\`\`${type}\`\`\``, false)
			.addField('Promise', `\`\`\`${promise}\`\`\``, true)
			.addField('Reason', `\`\`\`${reason}\`\`\``, true)
			.setTimestamp()
			.setFooter('Imagine a bot without anti-crash')
			.setColor('RED');

		return channel.send({ embeds: [embed] });
	});
};
