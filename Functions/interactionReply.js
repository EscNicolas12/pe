const { EmbedBuilder } = require("discord.js");

function correctoReply(interaction, razon, invisible) {
    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle("✅ | Operación Completada ")
                .addFields(
                    { name: "✅👍🏻", value: ` \`\`\`yaml\n${razon}\`\`\` ` }
                )
                .setColor("DarkButNotBlack")
        ],
        ephemeral: invisible
    })
}

module.exports = correctoReply
