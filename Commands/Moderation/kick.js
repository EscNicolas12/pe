const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js')

module.exports = {
    name: 'kick',
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulsa un usuario del servidor')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Elige al usuario que quieres expulsar')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('razón')
                .setDescription('Razón de la expulción')
                .setRequired(false)
        ),
    /**
     * 
     * @param { ChatInputCommandInteraction } interaction
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser("usuario");
        const ID = user.id;
        const kickUser = client.users.cache.get(ID)

        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            const embed = new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setDescription("❌ No tienes suficientes permisos")
            return await interaction.reply({ embeds: [embed], ephemeral: true }).then(inter => {
                setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
            })
        }
        if (interaction.member.id === ID) return interaction.reply({ content: "No puedes expulsarte a ti mismo", ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        })
        let razon = interaction.options.getString("razón");
        if (!razon) razon = "No se especifico una razón";

        const embedKick = new EmbedBuilder()
            .setTitle('Usuario Baneado')
            .setDescription(`Te han expulsado del servidor **${interaction.guild.name}**`)
            .setFields(
                { name: 'Razón:', value: `\`\`\`yaml\n${razon}\`\`\`` },
            )
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setColor("DarkButNotBlack")

        const embed2 = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setDescription(`**${kickUser.tag}** Ha sido expulsado`)
            .addFields(
                { name: "Razón", value: `\`\`\`yaml\n${razon}\`\`\`` },
                { name: 'Usuario:', value: `${user}`, inline: true },
                { name: 'Admin:', value: `${interaction.user}`, inline: true }
            )

        await interaction.guild.bans.create(kickUser.id, { razon }).catch(err => {
            return interaction.reply({ content: "No puedo expulsar a este miembro", ephemeral: true }).then(inter => {
                setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
            })
        })
        await kickUser.send({ embeds: [embedKick] }).catch(err => {
            return;
        })
        await interaction.reply({ embeds: [embed2] })
    },
};
