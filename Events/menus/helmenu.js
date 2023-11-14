const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'menu',
    async execute(interaction) {
        if (interaction.isAnySelectMenu()) {
            const messageToEdit = await interaction.channel.messages.fetch(interaction.message.id).catch(console.error);

            if (!messageToEdit) {
                console.error("El mensaje no pudo ser encontrado.");
                return;
            }

            let embed;
            let selectedValue = interaction.values[0];// Obtén el valor seleccionado

            switch (selectedValue) {
                case "uno":
                    embed = new EmbedBuilder()
                        .setTitle("____Panel de Ayuda____")
                        .setDescription(`**» Categorías**\nCuento con \`4\` categorías  \`\`\`⌨️ Comandos-Slash        🤖 Support\n🔨 Moderación            🔭 System\`\`\` `)
                        .setImage("https://share.creavite.co/88DmCNqMOn1rwbv6.gif")
                        .setColor("DarkButNotBlack")
                        .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
                    break;

                case "dos":
                    embed = new EmbedBuilder()
                        .setTitle(`Categoría de Slash\n\n @${interaction.user.tag} Estos son mis comandos de slash\nCuento con \`12\` comandos.`)
                        .addFields(
                            { name: `Comandos 1`, value: `</calculadora:1172074230599389207> **Calculadora Cientifica**\n</ping:1159642468480987146> **Lentencia de la API**\n</avatar:1169032467131416578> **Avatar tuyo o miembro**\n</8ball:1169032467131416577> **Preguntame**\n</meme:1169032467131416581> **Generador de memes**\n</gg:1169032467131416580> **Felicita a alguien**\n</kiss:1172096300465004584> **Besa a alguien**`, inline: true },
                            { name: `Comandos 2`, value: `</serverinfo:1172040971165372436> **Información del servidor**\n</suggest-setup:1171381803353907242> **Crea un sistema de sugerencias**\n</suggest:1171381803353907241> **Escribe tu sugerencia**\n</user info:1172030873546260510> **Información de un usuario o el tuyo**\n</user banner:1172030873546260510>`, inline: true }
                        )
                        .setTimestamp()
                        .setColor("DarkButNotBlack");
                    break;

                case "cuatro":
                    embed = new EmbedBuilder()
                        .setTitle("Categoría de Support")
                        .setDescription(`${interaction.user} Si tienes alguna unete a mi servidor undele en el boton.\n \`\`\`🦄 | Pegasu´s Support\`\`\`\nSi quieres invitar ingresa el comando " </invite:1169032467555029064> " o undele en el boton.\n \`\`\`⚜️ | Invitame a tu Servidor\`\`\``)
                        .setTimestamp()
                        .setColor("DarkButNotBlack");
                    break;

                case "cinco":
                    embed = new EmbedBuilder()
                        .setTitle("Categoría de Moderación")
                        .setDescription(`${interaction.user} Estos son mis comandos de Moderación\nCuento con \`6\`comandos.\n\n</ban:1159873703929196654> **Baneo un usuario**\n</unban:1169032467131416584> **Desbaneo el usuario**\n</kick:1159655624418791554> **Expulso un usuario**\n</mute:1169032467131416583> **Muteo a Alguien**\n</unmute:1169032467131416585> **Desmuteo a alguien**\n</clear:1169032467131416582> **Borro mensajes**`)
                        .setTimestamp()
                        .setColor("DarkButNotBlack");
                    break;

                case "seis":
                    embed = new EmbedBuilder()
                        .setTitle("Categoría de Systems")
                        .setDescription(`${interaction.user} Sistemas de bienvenidas y salidas.\n\nCrea un sistema de bienvenida con:\n</sistema-bienvenida:1169032467555029066> **Género un sistema de bienvenidas**\n\nCrea un sistema de bienvenidas con :\n</sistema-bienvenida2:1172699287600242759> **Género un sistemas de bienvenidas en imagenes de circulos con canvas**\n\nCrea un sistema de despedidas con:\n</sistema-salidas:1169032467555029065> **Género un sistema de salidas**`)
                        .setTimestamp()
                        .setColor("DarkButNotBlack");
                    break;

                default:
                    console.error("Valor de selección no válido.");
                    return;
            }

            // Crea un nuevo menú desplegable con la opción seleccionada
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('Menu')
                .setPlaceholder('Selecciona una opción')
                .addOptions([
                    {
                        label: "Categorías",
                        value: "uno",
                        description: "Menu Principal.",
                        emoji: "<:slash:1168890332239384597>",//here I want that emoji to go that I sent you
                        default: selectedValue === "uno", // Marca la opción seleccionada
                    },
                    {
                        label: "Comandos Slash",
                        description: "Comandos de Slash",
                        value: "dos",
                        emoji: "<:slash2:1168891529419575296>",
                        default: selectedValue === "dos",
                    },
                    {
                        label: "Support",
                        value: "cuatro",
                        description: "Comandos de Support",
                        emoji: '<:support:1168892670119268394>',
                        default: selectedValue === "cuatro",
                    },
                    {
                        label: "Moderación",
                        value: "cinco",
                        description: "Comandos de Moderación",
                        emoji: '<:moderation:1168893226787282944>',
                        default: selectedValue === "cinco",
                    },
                    {
                        label: "System",
                        description: "Sistema de Bienvenidas",
                        value: "seis",
                        emoji: "<:system:1168893699997053080>",
                        default: selectedValue === "seis",
                    },
                ]);

            // Crea una nueva fila de acción con el menú desplegable
            const row = new ActionRowBuilder().addComponents(selectMenu);

            // Actualiza el mensaje original con el nuevo Embed y el menú desplegable
            await interaction.deferReply({ ephemeral: true, fetchReply: false });
            await interaction.deleteReply();
            await messageToEdit.edit({
                embeds: [embed],
                components: [row,
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel(" 🦄 | Pegasu´s Support")
                                .setURL("https://discord.gg/6VTgqXW79k")
                                .setStyle(ButtonStyle.Link),

                            new ButtonBuilder()
                                .setLabel(" ⚜️ | Invitame a tu Servidor")
                                .setURL("https://discord.com/api/oauth2/authorize?client_id=985465046316515368&permissions=8&scope=applications.commands%20bot")
                                .setStyle(ButtonStyle.Link),
                        )
                ],
            })
        }
    }
}
