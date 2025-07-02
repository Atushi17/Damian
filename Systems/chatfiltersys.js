const Schema = require('../Structures/Schema/filterap')

module.exports = (client) => {
    Schema.find().then((documents) => {
        documents.forEach((doc) => {
            client.filters.set(doc.Guild, doc.Words)
        })
    })
}