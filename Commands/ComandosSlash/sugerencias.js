const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js')
const suggestSchema = require('../../Models/suggestSchema')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Crea una sugerencia'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('DarkButNotBlack')
        try {
            const suggestData = await suggestSchema.findOne({ guildSuggest: interaction.guild.id })
            if (!suggestData || !suggestData.guildChannel) return interaction.reply({ embeds: [embed.setDescription('No existe un sistema de sugerencias en el servidor')], ephemeral: true })
            if (suggestData.Enabled == false) return interaction.reply({ embeds: [embed.setDescription('El sistema de sugerencias está inactivo')], ephemeral: true })
            const suggestModal = new ModalBuilder()
                .setCustomId('suggestModal')
                .setTitle('Deja tu sugerencia')

            const suggestDesc = new TextInputBuilder()
                .setCustomId('suggestdesc')
                .setLabel('¿Cual es tu sugerencia?')
                .setStyle(TextInputStyle.Paragraph)

            const componenteModal = new ActionRowBuilder().addComponents(suggestDesc)

            suggestModal.addComponents(componenteModal)

            await interaction.showModal(suggestModal)
        } catch (error) {
            console.log(error);
            return interaction.reply({ embeds: [embed.setDescription('Ocurrio un error inesperado')], ephemeral: true })
        }
    }

};