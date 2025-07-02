const { Client, Collection, MessageEmbed, CommandInteraction } = require('discord.js');
const client = new Client({ intents: 32767 });
const config = require('./config.json');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const DisTube = require("distube");
const { SpotifyPlugin } = require('@distube/spotify');
const Ascii = require('ascii-table');
const { DiscordTogether } = require('discord-together');

client.distube = new DisTube.default(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    leaveOnStop: false,
    searchSongs: 1,
    emptyCooldown: 120,
    plugins: [new SpotifyPlugin()]
});


client.commands = new Collection();
client.discordTogether = new DiscordTogether(client);
client.filters = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

["giveawayhan", "mod-logshan", "distubehan"].forEach(han => {
    require(`./Handlers/${han}`)(client);
});


client.login(config.token)
