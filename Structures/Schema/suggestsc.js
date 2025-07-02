const moongose = require('mongoose')

let Schema = new moongose.Schema({
    Guildid: String,
    MessageID: String,
    Details: Array
})

module.exports = moongose.model('suggest', Schema)