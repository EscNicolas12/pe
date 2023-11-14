const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js')

module.exports = {
    name: 'unban',
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('desbanea un usuario')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Elige al usuario que quieres desbanear')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('razón')
                .setDescription('Razón del desbaneo')
                .setRequired(false)
        ),
    /**
     * 
     * @param { ChatInputCommandInteraction } interaction
     */
    async execute(interaction, client) {
        const userID = interaction.options.getUser("usuario");

        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            const embed = new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setDescription("❌ No tienes suficientes permisos")
            return await interaction.reply({ embeds: [embed], ephemeral: true }).then(inter => {
                setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
            })
        }
        if (interaction.member.id === userID) return interaction.reply({ content: "No puedes banearte a ti mismo", ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        })
        let razon = interaction.options.getString("razón");
        if (!razon) razon = "No se especifico una razón";

        const embed2 = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setDescription(`**${userID}** Ha sido desbaneado`)
            .addFields(
                { name: "Razón", value: `\`\`\`yaml\n${razon}\`\`\`` },
                { name: 'Usuario:', value: `${userID}`, inline: true },
                { name: 'Admin:', value: `${interaction.user}`, inline: true }
            )

        await interaction.guild.bans.fetch()
            .then(async bans => {
                if (bans.size == 0) return await interaction.reply({ content: "No hay nadie baneado en este servidor", ephemeral: true }).then(inter => {
                    setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
                })
                let bannedID = bans.find(ban => ban.user.id == userID);
                if (!bannedID) return await interaction.reply({ content: "El Id indicado no está baneado en este servidor", ephemeral: true }).then(inter => {
                    setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
                })
                await interaction.guild.bans.remove(userID, razon).catch(err => {
                    return interaction.reply({ content: "No puedo desbanear a este usuario", ephemeral: true }).then(inter => {
                        setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
                    })
                })
            })
        await interaction.reply({ embeds: [embed2] })
    },
};
