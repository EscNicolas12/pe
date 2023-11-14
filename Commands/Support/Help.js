const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Puedes conocer mis funciones"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (interaction.user.id === interaction.member.user.id) {
            await interaction.deferReply();
            await interaction.editReply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setTitle("____Panel de Ayuda____")
                        .setDescription(`**» Categorías**\nCuento con \`4\` categorías  \`\`\`⌨️ Comandos-Slash        🤖 Support\n🔨 Moderación            🔭 System\`\`\` `)
                        .setImage("https://share.creavite.co/88DmCNqMOn1rwbv6.gif")
                        .setColor("DarkButNotBlack")
                        .setFooter({ text: `${interaction.guild.name}`, iconURL: `${client.user.displayAvatarURL()}` })
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId("Menu")
                                .addOptions([
                                    {
                                        label: "Categorías",
                                        description: "Menu Principal.",
                                        value: "uno",
                                        emoji: "<:slash:1168890332239384597>",
                                    },
                                    {
                                        label: "Comandos Slash",
                                        description: "Comandos de Slash",
                                        value: "dos",
                                        emoji: "<:slash2:1168891529419575296>",
                                    },
                                    {
                                        label: "Support",
                                        value: "cuatro",
                                        description: "Comandos de Support",
                                        emoji: '<:support:1168892670119268394>',
                                    },
                                    {
                                        label: "Moderación",
                                        value: "cinco",
                                        description: "Comandos de Moderación",
                                        emoji: '<:moderation:1168893226787282944>',
                                    },
                                    {
                                        label: "System",
                                        description: "Sistema de Bienvenidas",
                                        value: "seis",
                                        emoji: "<:system:1168893699997053080>",
                                    },
                                ])
                        ),

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
                        ),
                ]
            })
        }
    },
};