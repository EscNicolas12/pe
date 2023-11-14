const { EmbedBuilder } = require("discord.js");

function userPermsReply(interaction, razon, invisible) {
    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(":x: | Error")
                .addFields(
                    { name: "Necesitas los siguientes permisos", value: ` \`\`\`prolog\n${razon}\`\`\` ` }
                )
                .setColor("DarkButNotBlack")
        ],
        ephemeral: invisible
    })
}

module.exports = userPermsReply
