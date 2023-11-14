const { EmbedBuilder } = require("discord.js");

function botPermsReply(interaction, razon, invisible) {
    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(":x: | Error")
                .addFields(
                    { name: "Necesito los siguientes permisos", value: ` \`\`\`prolog\n${razon}\`\`\` ` }
                )
                .setColor("DarkButNotBlack")
        ],
        ephemeral: invisible
    })
}

module.exports = botPermsReply
