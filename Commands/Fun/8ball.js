const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const answers = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes - definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
]

module.exports = {
    name: '8ball',
    description: 'Asks the Magic 8-Ball for some psychic wisdom',
    usage: "/8ball <question>",
    options: [
        {
            name: "question",
            description: "ask me a question",
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const question = interaction.options.getString("question")
        const embed = new MessageEmbed()
            .setTitle('🎱  The Magic 8-Ball  🎱')
            .addField('Question', question)
            .addField('Answer', `${answers[Math.floor(Math.random() * answers.length)]}`)
            .setFooter({text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTimestamp()
            .setColor(interaction.guild.me.displayHexColor);
        interaction.reply({ embeds: [embed] });
    }
}