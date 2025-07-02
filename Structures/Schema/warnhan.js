const moongose = require('mongoose')

let Schema = new moongose.Schema({
    guildid: String,
    user: String,
    content: Array
})

module.exports = moongose.model('warns', Schema)