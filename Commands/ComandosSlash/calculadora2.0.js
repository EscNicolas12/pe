const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js');
const math = require("mathjs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("calculadora")
        .setDescription("Calculadora Cientifica"),

    async execute(interaction) {
        const IdPrefix = "calculator";
        const embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setDescription("```\nLos resultados se mostrarán aquí\n```")

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("AC")
                    .setCustomId(IdPrefix + "_clear")
                    .setStyle(ButtonStyle.Danger),

                new ButtonBuilder()
                    .setLabel("(")
                    .setCustomId(IdPrefix + "_(")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setLabel(")")
                    .setCustomId(IdPrefix + "_)")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setLabel("⌫")
                    .setCustomId(IdPrefix + "_backspace")
                    .setStyle(ButtonStyle.Primary),
            )

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("1")
                    .setCustomId(IdPrefix + "_1")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel("2")
                    .setCustomId(IdPrefix + "_2")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel("3")
                    .setCustomId(IdPrefix + "_3")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel("/")
                    .setCustomId(IdPrefix + "_/")
                    .setStyle(ButtonStyle.Primary),
            )

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("4")
                    .setCustomId(IdPrefix + "_4")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel("5")
                    .setCustomId(IdPrefix + "_5")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel("6")
                    .setCustomId(IdPrefix + "_6")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel("*")
                    .setCustomId(IdPrefix + "_*")
                    .setStyle(ButtonStyle.Primary),
            )

        const row3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("7")
                    .setCustomId(IdPrefix + "_7")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel("8")
                    .setCustomId(IdPrefix + "_8")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel("9")
                    .setCustomId(IdPrefix + "_9")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel("-")
                    .setCustomId(IdPrefix + "_-")
                    .setStyle(ButtonStyle.Primary),
            )
        const row4 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("0")
                    .setCustomId(IdPrefix + "_0")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel(".")
                    .setCustomId(IdPrefix + "_.")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setLabel("=")
                    .setCustomId(IdPrefix + "_=")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setLabel("+")
                    .setCustomId(IdPrefix + "_+")
                    .setStyle(ButtonStyle.Success),
            )

        const msg = await interaction.reply({ embeds: [embed], components: [row, row1, row2, row3, row4], ephemeral: true });

        let data = "";
        const collector = msg.createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 600000
        });

        collector.on("collect", async i => {

            const id = i.customId;
            const value = id.split("_")[1];
            let extra = "";

            if (value === "=") {
                try {
                    data = math.evaluate(data).toString();
                } catch (e) {
                    data = "";
                    extra = "Se ha producido un error, haga clic en AC para reiniciar"
                }
            } else if (value === "clear") {
                data = "";
                extra = "Los resultados se mostrarán aquí"
            } else if (value === "backspace") {
                data = data.slice(0, -1);
            } else {
                const lc = data[data.length - 1];

                data += `${(
                    (parseInt(value) == value || value === ".")
                    &&
                    (lc == parseInt(lc) || lc === ".")
                ) || data.length === 0 ? "" : ""}` + value;

            }

            i.update({ embeds: [new EmbedBuilder().setColor("DarkButNotBlack").setDescription(`\`\`\`\n${data || extra}\n\`\`\``)], components: [row, row1, row2, row3, row4], ephemeral: false })
        })
    }
};
