const {MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js")
module.exports = {
    name: "invite",
    description: "Invite me to your server!",
    usage: "/invite",
    cooldown:10000,
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
      
        const Invite = new MessageEmbed()
        .setTitle("Invite Me!")
        .setDescription("I'm a cool Discord Bot, ain't I? Use the buttons below to invite me to your server or join our support server!\n\nStay Safe 👋")
        .setColor('PURPLE')
        .setThumbnail(interaction.user.displayAvatarURL())

        let row = new MessageActionRow().addComponents(
            new MessageButton()
                .setURL("https://discord.com/api/oauth2/authorize?client_id=881212769700028497&permissions=8&scope=bot%20applications.commands")
                .setLabel("Invite Me")
                .setStyle("LINK"),

            new MessageButton()
                .setURL("https://discord.gg/UsfBdUH85n")
                .setLabel("Support Server")
                .setStyle("LINK"),

            new MessageButton()
                .setURL("https://damianji.herokuapp.com")
                .setLabel("Website")
                .setStyle("LINK"),
        );
        interaction.reply({ embeds: [Invite],components: [row]});
    }
  };
