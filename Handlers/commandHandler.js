const chalk = require("chalk");

async function LoadCommands(client) {
    const { loadFiles } = require("../Functions/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Comandos", "Estado");
    require("colors")

    await client.commands.clear();

    let commandsArray = [];

    const Files = await loadFiles("Commands");

    Files.forEach((file) => {
        const command = require(file);
        client.commands.set(command.data.name, command);

        commandsArray.push(command.data.toJSON());

        table.addRow(command.data.name, "Cargados");
    });
    const tableString = table.toString().split("\n").map(line => chalk.blue(line)).join("\n");
    console.log(tableString);
    client.application.commands.set(commandsArray);

    return console.log("Comandos Cargados".grey);
}

module.exports = { LoadCommands };
