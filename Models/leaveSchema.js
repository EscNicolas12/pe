const { model, Schema } = require("mongoose");

let leaveSchema = new Schema({
    guildId: { type: String, required: false },
    channelId: { type: String, required: false },
    message: { type: String, required: false },
    imagenUrl: { type: String, required: false },
})

module.exports = model("salidas", leaveSchema)