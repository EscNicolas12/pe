const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "clear",
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Elimina una cantidad de mensajes de un canal')
        .addIntegerOption((option) =>
            option.setName('cantidad').setDescription('Cantidad de mensajes a eliminar').setRequired(true),
        )
        .addUserOption((option) =>
            option.setName('usuario').setDescription('Eliminar mensajes de usuario').setRequired(false),
        ),
    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('cantidad');
        const target = options.getUser('usuario');
        const mensajes = await interaction.channel.messages.fetch();

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            const embed = new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setDescription("❌ No tienes suficientes permisos")
            return await interaction.reply({ embeds: [embed], ephemeral: true }).then(inter => {
                setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
            })
        }

        if (amount < 1 || amount > 99) {
            const errorEmbed = new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setDescription('❌ | Debes ingresar un número entre 1 y 99.')
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true }).then(inter => {
                setTimeout(() => inter.interaction.deleteReply(), 9 * 1000);
            })
        }

        if (target) {
            let i = 0;
            const filtered = [];
            mensajes.filter((message) => {
                if (message.author.id === target.id && amount > i) {
                    filtered.push(message);
                    i++;
                }
            });
            const messages = await interaction.channel.bulkDelete(filtered, true);

            const embed1 = new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setDescription(`He eliminado \`${messages.size}\` mensaje(s) de ${target} `)
                .setTimestamp()
            await interaction.reply({ embeds: [embed1] }).then(inter => {
                setTimeout(() => inter.interaction.deleteReply(), 7 * 1000);
            });
        } else {
            interaction.channel.bulkDelete(amount, true).then((messages) => {
                const embed2 = new EmbedBuilder()
                    .setColor("DarkButNotBlack")
                    .setDescription(`✅ | Se han borrado ${messages.size} mensaje(s).`);
                if (messages.size < amount) {
                    embed2.setDescription('❌ | Lo siento, no puedo borrar mensajes más antiguos de 14 días.');
                }
                interaction.reply({ embeds: [embed2] }).then(inter => {
                    setTimeout(() => inter.interaction.deleteReply(), 7 * 1000);
                });
            })
        }
    },
};