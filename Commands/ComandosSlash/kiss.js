const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')
const Schema = require("../../Models/kissSchema")
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Besa un usuario del servidor')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Elige al usuario')
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options } = interaction
        const user = options.getMember('usuario')
        if (interaction.user.id === user.id) {
            return interaction.reply("No puedes Besarte a ti mismo", true)
        }
        if (user.id === client.user.id) return interaction.reply({ content: "No gracias, Selecciona a otro usuario con </kiss:1172096300465004584>" }).then(inter => {
            setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
        });

        try {
            const userData = await Schema.findOne({ guildId: interaction.guild.id, userId: user.id })
            if (!userData) {
                await Schema.create({
                    guildId: interaction.guild.id,
                    userId: user.id,
                    kissCount: 1
                })
                let result = await axios.get('https://api.otakugifs.xyz/gif?reaction=kiss');
                if (!result) {
                    result = "https://i.imgur.com/XJemn7Q.png"
                }
                const kissEmbed = new EmbedBuilder()
                    .setColor("DarkButNotBlack")
                    .setDescription(`**💋 ${interaction.user.displayName}** acaba de besar a **${user.displayName}** 💋`)
                    .setImage(result.data.url)
                    .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                    .setTimestamp()
                return interaction.reply({ content: `<@${user.id}> tiene(s) 1 beso en total`, embeds: [kissEmbed] })
            }
            if (userData) {
                userData.kissCount++
                const result = await axios.get('https://api.otakugifs.xyz/gif?reaction=kiss');
                const kissEmbed = new EmbedBuilder()
                    .setColor("DarkButNotBlack")
                    .setDescription(`**💋 ${interaction.user.displayName}** acaba de besar a **${user.displayName}** 💋`)
                    .setImage(result.data.url)
                    .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                    .setTimestamp()

                userData.save()
                return interaction.reply({ content: `<@${user.id}> tiene(s) ${userData.kissCount} besos en total`, embeds: [kissEmbed] })
            }
        } catch (error) {
            console.log(error);
            return interaction.reply("Se produjo un error", true)
        }
    }
};