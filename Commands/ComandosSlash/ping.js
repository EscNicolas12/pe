const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Lentencia del bot"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setDescription(`** Pong :ping_pong: \n\n:incoming_envelope: Api:**  \`\ ${Math.round(client.ws.ping)}ms \`\ `)
            .setColor("DarkButNotBlack")
            .setTimestamp()
        interaction.reply({ embeds: [embed] })
    }
};
