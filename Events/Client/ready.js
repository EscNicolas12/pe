const { LoadCommands } = require("../../Handlers/commandHandler");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const config = require(`${process.cwd()}/config.json`);
require("colors");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {

        await mongoose.connect(config.dataBaseURL, {
            keepAlive: true,
        }).then(() => {
            console.log("[MONGO DB] Esta Conectado".green);
        }).catch((error) => {
            console.log(`No se pudo conectar a la base de datos ${error}`.red)
        })
        console.log(`${client.user.username} Esta Listo`.blue);

        LoadCommands(client);
    },
};
