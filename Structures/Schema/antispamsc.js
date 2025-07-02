const mongoDB = require("mongoose")

let Schema = new mongoDB.Schema({
    GuildID: String,
    mode:Boolean,
    igchannel:String,
})

module.exports = mongoDB.model('antispam', Schema)