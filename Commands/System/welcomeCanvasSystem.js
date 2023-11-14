const { SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction, ChannelType, EmbedBuilder } = require('discord.js');
const welcomeSchema = require("../../Models/canvasSchema");
module.exports = {
    Cooldown: false,
    data: new SlashCommandBuilder()
        .setName("sistema-bienvenida2")
        .setDescription("Bienvenidas en embed")
        .addChannelOption(option =>
            option.setName("canal")
                .setDescription("Elije un canal donde quieras mostrar la bienvenida")
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("mensaje")
                .setDescription("Ingresa un mensaje de bienvenida")
                .setMinLength(1)
                .setMaxLength(3000)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("imagen")
                .setDescription("Ingresa una imagen (URL)")
                .setMinLength(1)
                .setRequired(false)
        ),
    /**
     * 
     * @param { ChatInputCommandInteraction } interaction
     * @param { Client } client
     */
    async execute(interaction, client) {
        const canal = interaction.options.getChannel("canal");
        const mensaje = interaction.options.getString("mensaje").replace(/,g/, "\n");
        const imagen = interaction.options.getString("imagen");

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            const embed = new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setDescription("❌ No tienes suficientes permisos")
            return await interaction.reply({ embeds: [embed], ephemeral: true }).then(inter => {
                setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
            })
        }
        const welcomeData = await welcomeSchema.findOne({ guildId: interaction.guild.id });

        if (!welcomeData) {
            await welcomeSchema.create({
                guildId: interaction.guild.id,
                channelId: canal.id,
                message: mensaje,
                imagenUrl: imagen,
            })

            return interaction.reply({ content: `Se creo el sistema de bienvenidas con canvas`, ephemeral: true })
        } else {
            await welcomeSchema.findOneAndUpdate({
                guildId: interaction.guild.id
            }, {
                guildId: interaction.guild.id,
                channelId: canal.id,
                message: mensaje,
                imagenUrl: imagen,
            })
            return interaction.reply({ content: `Se actualizo el sistema de bienvenidas con canvas`, ephemeral: true })
        }


    }
};
