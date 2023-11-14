const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'timeout',
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mutea un usuario del servidor')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Elige al usuario que quieres mutear')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('tiempo')
                .setDescription('Duración de tiempo de espera')
                .addChoices(
                    { name: "60 segundos", value: "60" },
                    { name: "2 minutos", value: "120" },
                    { name: "5 minutos", value: "300" },
                    { name: "10 minutos", value: "600" },
                    { name: "15 minutos", value: "900" },
                    { name: "20 minutos", value: "1200" },
                    { name: "30 minutos", value: "1800" },
                    { name: "45 minutos", value: "2700" },
                    { name: "3 horas", value: "10000" },
                    { name: "10 horas", value: "36000" },
                    { name: "1 día", value: "86400" },
                    { name: "5 días", value: "432000" },
                    { name: "1 semana", value: "604800" },
                )
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('razón')
                .setDescription('Razón del muteo')
                .setRequired(false)
        ),
    /**
     * 
     * @param { ChatInputCommandInteraction } interaction
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser("usuario");
        const timeMember = await interaction.guild.members.fetch(user.id).catch(console.error);
        const tiempo = interaction.options.getString("tiempo");
        const { guild } = interaction;

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            const embed = new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setDescription("❌ No tienes suficientes permisos")
            return await interaction.reply({ embeds: [embed], ephemeral: true }).then(inter => {
                setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
            })
        }
        if (!timeMember) return await interaction.reply({ content: 'El usuario mencionado ya no se encuentra en el servidor', ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        })
        if (!timeMember.kickable) return interaction.reply({ content: "No puedes mutear a alguien con un rol superior al tuyo", ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        })
        if (!tiempo) return interaction.reply({ content: "Debe establecer una duración válida para el tiempo de espera", ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        })
        if (interaction.member.id === timeMember.id) return interaction.reply({ content: "No puedes mutearte a ti mismo", ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        })
        if (timeMember.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: "No se puede mutear a los miembros del personal o de las personas con permiso de administrador!", ephemeral: true }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        })

        let razon = interaction.options.getString("razón");
        if (!razon) razon = "No se especificó una razón";

        await timeMember.timeout(tiempo * 1000, razon).catch(console.error);

        const embedKick = new EmbedBuilder()
            .setTitle('Usuario Muteado')
            .setDescription(`Nuestro querido amigo ${user} fue muteado del servidor`)
            .setFields(
                { name: 'Razón:', value: `\`\`\`yaml\n${razon}\`\`\`` },
                { name: 'Usuario:', value: `${user}`, inline: true },
                { name: 'Admin:', value: `${interaction.user}`, inline: true },
                { name: 'Tiempo', value: `${tiempo / 60} minuto(s)`, inline: true }
            )
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setColor("DarkButNotBlack");

        interaction.reply({ embeds: [embedKick] });
    },
};