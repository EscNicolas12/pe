const { EmbedBuilder } = require('discord.js');
const suggestSchema = require("../../Models/suggestSchema")

module.exports = {
    name: "suggestSystem",
    async execute(interaction) {
        const { customId, member } = interaction;
        if (interaction.isModalSubmit() && customId === "suggestModal") {
            try {
                const data = await suggestSchema.findOne({ guildSuggest: interaction.guild.id });
                if (!data) {
                    return;
                }
                const suggestChannel = member.guild.channels.cache.get(data.guildChannel);
                const suggestDesc = interaction.fields.getTextInputValue("suggestdesc");
                const suggestEmbed = new EmbedBuilder()
                    .setTitle("📫 __Nueva Sugerencia__")
                    .setColor("DarkButNotBlack")
                    .setDescription(`<@${interaction.user.id}> realizó una sugerencia\n**La sugerencia es**: \`\`\`yaml\n${suggestDesc}\`\`\``)
                    .setTimestamp()
                await suggestChannel.send({ embeds: [suggestEmbed] }).then(async (m) => {
                    await m.react('👍🏻');
                    await m.react('🙅🏻');
                    await m.react('🤷🏻‍♂️');
                    await m.react('👎🏻');
                });
                await interaction.reply({ content: "Se ha enviado la sugerencia", ephemeral: true }).then(inter => {
                    setTimeout(() => inter.interaction.deleteReply(), 7 * 1000);
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
};