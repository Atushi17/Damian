const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const Scraper = require('mal-scraper');

module.exports = {
    name: 'ani-search',
    description: 'Shows Information about an Anime',
    usage: "/ani-search <name>",
    cooldown: 10000,
    options: [
        {
            name: "name",
            description: "name of anime",
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        let Text = interaction.options.getString("name")
        if (Text.length > 200) return interaction.reply(`Text Limit - 200`);
        interaction.reply(`**Searching It For You 🔍**`);
        let Replaced = Text.replace(/ /g, " ");
        let Anime;
        let Embed;
        try {
            Anime = await Scraper.getInfoFromName(Replaced);
            if (!Anime.genres[0]) Anime.genres[0] = "None";
            Embed = new MessageEmbed()
                .setColor("RANDOM")
                .setURL(Anime.url)
                .setTitle(Anime.title)
                .setDescription(Anime.synopsis)
                .addField(`Type`, Anime.type, true)
                .addField(`Status`, Anime.status, true)
                .addField(`Premiered`, Anime.premiered, true)
                .addField(`Episodes`, Anime.episodes, true)
                .addField(`Duration`, Anime.duration, true)
                .addField(`Popularity`, Anime.popularity, true)
                .addField(`Genres`, Anime.genres.join(", "))
                .setThumbnail(Anime.picture)
                .setFooter({text:`Score - ${Anime.score}`})
                .setTimestamp();
        } catch (error) {
            console.log(error)
            return interaction.channel.send(`**No Anime Found!**`)
        };

        return interaction.channel.send({ embeds: [Embed] });
    }
}