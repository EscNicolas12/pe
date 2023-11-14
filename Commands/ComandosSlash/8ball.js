const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("🎱 Bola Magica de Pegasu´s")
        .addStringOption(option =>
            option.setName("pregunta")
                .setDescription("Escribe la pregunta que deseas que adivine")
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, args) {
        const pregunta = interaction.options.getString("pregunta") || interaction.user

        let respuestas = [
            "● Si",
            "● No",
            "● No lo se",
            "● Quiza",
            "● Puede que si",
            "● Puede que no",
            "● Claramente si",
            "● Claramente no",
            "● Es probable que si",
            "● Es probable que no",
            "● En definitiva",
            "● Muy dudoso",
            "● Confia en ellos",
            "● ¡Por supuesto!",
            "● No te fies de ello",
            "● Mejor no te digo nada",
        ];
        const respuesta = Math.floor(Math.random() * respuestas.length)

        const embed = new EmbedBuilder()
            .setTitle(" > ** *La bola predicira tu futuro* **")
            .addFields(
                { name: `\`\❓\`\  **${interaction.user.username} Tu pregunta es :**`, value: ` > *${pregunta} * ` },
                { name: `\`\❗\`\  **${interaction.user.username} Esta es tu respuesta**:`, value: ` > *\`\ ${respuestas[respuesta]}\`\ * ` }
            )
            .setFooter({ text: `PowerBy :   ${interaction.guild}`, iconURL: `${interaction.user.displayAvatarURL()}` })
            .setColor("DarkButNotBlack");

        interaction.reply({ embeds: [embed] })
    }
};