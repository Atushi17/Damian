const mongoDB = require("mongoose")

let Schema = new mongoDB.Schema({
    GuildID: String,
    channelID: String,
})

module.exports = mongoDB.model('Chatwithbot', Schema)