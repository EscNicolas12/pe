const { EmbedBuilder } = require("discord.js");

function errorReply(interaction, razon, invisible) {
    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(":x: | Error ")
                .addFields(
                    { name: "Error", value: ` \`\`\`yaml\n${razon}\`\`\` ` }
                )
                .setColor("DarkButNotBlack")
        ],
        ephemeral: invisible
    })
}

module.exports = errorReply
