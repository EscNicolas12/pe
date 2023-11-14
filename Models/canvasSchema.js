const { model, Schema } = require("mongoose");

let welcomeSchema = new Schema({
    guildId: { type: String, required: false },
    channelId: { type: String, required: false },
    message: { type: String, required: false },
    imagenUrl: { type: String, required: false },
})

module.exports = model("bienvenidas2", welcomeSchema)