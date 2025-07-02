const moongose = require('mongoose')

let Schema = new moongose.Schema({
    guildid: String,
    channelID: String
})

module.exports = moongose.model('welcomer', Schema)