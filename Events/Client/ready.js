const { Client } = require("discord.js")
const mongoose = require('mongoose')
const { Database } = require('../../Structures/config.json')

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    async execute(client) {
        console.log("The client is now ready!")
        
        let tserver = client.guilds.cache.size;

		client.user.setActivity(`/help`, {
			type: 'PLAYING',
		});

        const channel = client.channels.cache.get("")
        channel.send("I AM ONLINE!!")

        if (!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the database!")
        }).catch((err) => {
            console.log(err)
        });
        
        require('../../Systems/chatfiltersys')(client);
    }
}
    
