const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gg")
        .setDescription("Felicita a un usuario dandole un GG")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Menciona a un usuario")
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, args) {
        const pregunta = interaction.options.getUser("usuario") || interaction.user

        let respuestas = [
            "https://media.tenor.com/HXbjvXMGU0wAAAAC/gg-boys-jaredfps.gif",
            "https://media.tenor.com/25_j3PEhKFAAAAAd/gg.gif",
            "https://media.tenor.com/VsZZ4Fi50U8AAAAC/gg.gif",
            "https://media.tenor.com/rTiyRnPJS7MAAAAd/gg-ez.gif",
            "https://media.tenor.com/1tCsoXTYj1YAAAAC/dj-boucherie-gg.gif",
            "https://media.tenor.com/JRWN1fBDXdoAAAAd/alien-gg.gif"
        ];
        const respuesta = Math.floor(Math.random() * respuestas.length)

        const embed = new EmbedBuilder()
            .setDescription(` <@${interaction.user.id}> Ha dado Un GG a : ${pregunta}`)
            .setImage(`${respuestas[respuesta]}`)
            .setTimestamp()
            .setFooter({ text: `PowerBy :  ${interaction.guild}`, iconURL: `${interaction.user.displayAvatarURL()}` })
            .setColor("DarkButNotBlack");

        interaction.reply({ embeds: [embed] })
    }
};