const chalk = require("chalk");
async function LoadEvents(client) {
    const { loadFiles } = require("../Functions/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Eventos", "Estado");
    require("colors");

    await client.events.clear();

    try {
        const Files = await loadFiles("Events");

        for (const file of Files) {
            const event = require(file);
            const execute = (...args) => event.execute(...args, client);
            client.events.set(event.name, execute);

            if (event.rest) {
                if (event.once) client.rest.once(event.name, execute);
                else client.rest.on(event.name, execute);
            } else {
                if (event.once) client.once(event.name, execute);
                else client.on(event.name, execute);
            }

            table.addRow(event.name, "Cargado");
        }
        const tableString = table.toString().split("\n").map(line => chalk.blue(line)).join("\n"); 1
        console.log(tableString);
        console.log("Eventos Cargados".grey);
    } catch (error) {
        console.error("Error al cargar eventos:".red, error);
    }
}

module.exports = { LoadEvents };