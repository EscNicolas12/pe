const { SlashCommandBuilder, ChannelType } = require('discord.js')
const suggestSchema = require('../../Models/suggestSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest-setup')
        .setDescription('Crea el sistema de sugerencias')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Elige el canal de las sugerencias')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options } = interaction
        const suggestChannel = options.getChannel('canal')
        suggestSchema.findOne({ guildSuggest: interaction.guild.id }, async (err, data) => {
            if (err) {
                await interaction.reply({ content: "Hubo un error al realizar la sugerencia :()", ephemeral: true })
                console.log(err)
            }
            if (!data) {
                await suggestSchema.create({
                    guildSuggest: interaction.guild.id,
                    guildChannel: suggestChannel.id
                })

                return interaction.reply({ content: "Se ha creado correctamente el sistema de sugerencias", ephemeral: true })
            }
            if (data) {
                return interaction.reply({ content: "Tienes una data creada", ephemeral: true })
            }
        })
    }
};