const mongoDB = require("mongoose")

let Schema = new mongoDB.Schema({
    GuildID: String,
    mode: Boolean,
})

module.exports = mongoDB.model('maintenance', Schema)