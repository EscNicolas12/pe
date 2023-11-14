const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'untimeout',
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Desmutea un usuario del servidor')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Elige al usuario que quieres desmutear')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('razón')
                .setDescription('Razón del desmuteo')
                .setRequired(false)
        ),
    /**
     * 
     * @param { ChatInputCommandInteraction } interaction
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser("usuario");
        const timeMember = await interaction.guild.members.fetch(user.id).catch(console.error);
        const { guild } = interaction;

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            const embed = new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setDescription("❌ No tienes suficientes permisos")
            return await interaction.reply({ embeds: [embed], ephemeral: true }).then(inter => {
                setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
            })
        }
        if (!timeMember.kickable) return interaction.reply({ content: "No puedes desmutear a alguien con un rol superior al tuyo", ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        });
        if (!timeMember.communicationDisabledUntilTimestamp) return interaction.reply({ content: "No puedo desmutear un usuario no muteado", ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        })
        if (interaction.member.id === timeMember.id) return interaction.reply({ content: "No puedes desmutearte a ti mismo", ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        })
        if (timeMember.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: "No se puede desmutear a los miembros del personal o de las personas con permiso de administrador!", ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        })

        let razon = interaction.options.getString("razón");
        if (!razon) razon = "No se especificó una razón";

        await timeMember.timeout(null, razon).catch(console.error);

        const embedKick = new EmbedBuilder()
            .setTitle('Usuario Desmuteado')
            .setDescription(`Nuestro querido amigo ${user} fue desmuteado del servidor`)
            .setFields(
                { name: 'Razón:', value: `\`\`\`yaml\n${razon}\`\`\`` },
                { name: 'Usuario:', value: `${user}`, inline: true },
                { name: 'Admin:', value: `${interaction.user}`, inline: true }
            )
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setColor("DarkButNotBlack");

        interaction.reply({ embeds: [embedKick] });
    },
};