const { ChatInputCommandInteraction } = require("discord.js")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param { ChatInputCommandInteraction } interaction
     */
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);
            if (!command)
                return interaction.reply({
                    content: "Este comando está desactualizado",
                    ephemeral: true,
                });
            if (command.developer && interaction.user.id !== "1079086709100249114")
                return interaction.reply({
                    content: "Comando solo para developers",
                    ephemeral: true,
                });

            command.execute(interaction, client);
        } else if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if (!button) return new Error("No tiene codigo este boton");

            try {
                await button.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        } else {
            return;
        }
    },
};
