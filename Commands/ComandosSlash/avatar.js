const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Muestra el avatar tuyo o de una persona")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Menciona un Usuario")
                .setRequired(false)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction) {
        const usuario = interaction.options.getUser("usuario") || interaction.user
        const embed = new EmbedBuilder()
            .setAuthor(({ name: `@${usuario.username}`, iconURL: usuario.displayAvatarURL({ dynamic: true }) }))
            .setImage(usuario.displayAvatarURL({ size: 1024, dynamic: true }))
            .setColor("DarkButNotBlack")

        const wee = new ButtonBuilder()
            .setLabel(" 🦄 | Pegasu´s Support")
            .setURL("https://discord.gg/6VTgqXW79k")
            .setStyle(ButtonStyle.Link);

        const a = new ButtonBuilder()
            .setLabel("📷 | Ver Imagen")
            .setURL(`${usuario.displayAvatarURL({ size: 1024, dynamic: true })}`)
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(wee, a);
        await interaction.reply({
            embeds: [embed],
            components: [row]
        })

    }
};