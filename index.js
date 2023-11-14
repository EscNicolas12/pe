const { Client, GatewayIntentBits, Partials, ActivityType, Collection, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, Message } = require("discord.js");
const config = require(`${process.cwd()}/config.json`);
require("colors");

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});

client.on("ready", () => {

    const time = (1000 * 5);

    let status = [
        [{
            name: "Pegasu´s Support",
            type: ActivityType.Watching
        }],
    ];
    setInterval(() => {
        function randomStatus() {
            let astatus = status[Math.floor(Math.random() * status.length)];
            client.user.setPresence({ activities: astatus, status: "online" });
        }
        randomStatus();
    }, time)
    console.log('No hay Errores'.red)
});

const { LoadEvents } = require("./Handlers/eventHandler");
const { loadButtons } = require("./Handlers/buttonHandler");

client.config = require("./config.json");
client.events = new Collection;
client.commands = new Collection;
client.buttons = new Collection;

loadButtons(client);
LoadEvents(client);

client.login(config.token)

