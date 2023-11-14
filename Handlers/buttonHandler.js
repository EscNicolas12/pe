const chalk = require("chalk");

async function loadButtons(client) {
    const { loadFiles } = require("../Functions/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Botones", "Estado");
    require("colors")

    await client.buttons.clear();

    const Files = await loadFiles("Buttons");

    Files.forEach((file) => {
        const button = require(file);
        client.buttons.set(button.data.name, button);

        table.addRow(button.data.name, "Cargados");
    });
    const tableString = table.toString().split("\n").map(line => chalk.blue(line)).join("\n");
    console.log(tableString);

    return console.log("Botones Cargados".cyan);
}

module.exports = { loadButtons };
