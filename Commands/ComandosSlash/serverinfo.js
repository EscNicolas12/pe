const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ChannelType } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")//nombre 
        .setDescription("Información del servidor"), //descripción
    /**
     * 
     * @param { ChatInputCommandInteraction } interaction
     */
    async execute(interaction, client) {

        const { guild } = interaction;
        const {
            roles,
        } = guild;
        const sortedRoles = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position);
        const userRoles = sortedRoles.filter(role => !role.managed);
        const managedRoles = sortedRoles.filter(role => role.managed);
        const { createdTimestamp, ownerId, description, members, memberCount, channels } = guild;
        const botcount = members.cache.filter((member) => member.user.bot).size;
        const getChannelTypeSize = (type) => channels.cache.filter((channel) => type.includes(channel.type)).size

        const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
            let totalLength = 0;
            const result = [];

            for (const role of roles) {
                const roleString = `<@&${role.id}>`;

                if (roleString.length + totalLength > maxFieldLength)
                    break;

                totalLength += roleString.length + 1;
                result.push(roleString);
            }

            return result.length;
        }

        const totalchannels = getChannelTypeSize([
            ChannelType.GuildText,
            ChannelType.GuildVoice,
            ChannelType.GuildStageVoice,
            ChannelType.GuildCategory,
            ChannelType.GuildPrivateThread,
            ChannelType.GuildPublicThread,
            ChannelType.GuildForum,
            ChannelType.GuildNews,
            ChannelType.GuildNewsThread,
        ]);
        const embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .addFields(
                {
                    name: `Server Info de ${guild.name}\n\nDescripción`,
                    value: [`${guild.description || "No contiene una Descripción"}`].join("\n"),
                },
                {
                    name: "Datos del Servidor\n",
                    value: [
                        `» **Nombre**: ${guild.name}`,
                        `» **Id**: ${guild.id}`,
                        `» **Creado**: <t:${parseInt(createdTimestamp / 1000)}:R>`,
                        `» **Owner**: <@${ownerId}>`,
                        `» **URL**: ${guild.vanityURLCode || "No tiene URL personalizada"}`
                    ].join("\n"),
                },
                {
                    name: "Miembros",
                    value: [
                        `Usuarios: ${guild.memberCount - botcount}`,
                        `Bots: ${botcount}`,
                    ].join("\n"),
                    inline: true
                },
                {
                    name: "Boosted Server",
                    value: [
                        `Nivel: ${guild.premiumTier}`,
                        `Mejoras: ${guild.premiumSubscriptionCount}`,
                    ].join("\n"),
                    inline: true
                },
                {
                    name: `Canales (\`${totalchannels}\`)`,
                    value: [
                        `Canal de Texto: ${getChannelTypeSize([
                            ChannelType.GuildText,
                            ChannelType.GuildForum,
                            ChannelType.GuildNews,
                        ])}`,
                        `Canal de Voz: ${getChannelTypeSize([
                            ChannelType.GuildStageVoice,
                            ChannelType.GuildVoice,
                        ])}`,
                        `Hilos: ${getChannelTypeSize([
                            ChannelType.GuildPublicThread,
                            ChannelType.GuildPrivateThread,
                            ChannelType.GuildNewsThread,
                        ])}`,
                        `Categorías: ${getChannelTypeSize([
                            ChannelType.GuildCategory,
                        ])}`,
                    ].join("\n"),
                    inline: true
                },
                {
                    name: `Roles del Servidor (\`${maxDisplayRoles(userRoles)}\` de \`${userRoles.length}\`)`, value: `${userRoles.slice(0, maxDisplayRoles(userRoles)).join(" ") || "None"}`, inline: true,
                },
                {
                    name: `Bot Roles (\`${maxDisplayRoles(managedRoles)}\` de \`${managedRoles.length}\`)`, value: `${managedRoles.slice(0, maxDisplayRoles(managedRoles)).join(" ") || "None"}`
                },
                {
                    name: `Banner del Servidor ${guild.name}`,
                    value: guild.bannerURL() ? "** **" : "Este servidor no tiene ningun banner"
                }
            )
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setImage(guild.bannerURL({ size: 1024 }))
            .setFooter({ text: guild.name, iconURL: guild.iconURL({ dynamic: true }) });

        await interaction.reply({ embeds: [embed] })
    }
};
