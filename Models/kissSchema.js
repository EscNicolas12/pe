const { model, Schema } = require('mongoose')

let kissSchema = new Schema({
    guildId: String,
    userId: String,
    kissCount: Number,
    kissCountUser: Number,
})

module.exports = model("kiss", kissSchema)