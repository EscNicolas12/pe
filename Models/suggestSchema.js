const { model, Schema } = require('mongoose');

let suggestSchema = new Schema({
    guildSuggest: String,
    guildChannel: String,
})

module.exports = model("suggest", suggestSchema)