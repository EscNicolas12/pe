const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Puedes invitarme a tu servidor"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`Panel de Invitación`)
            .setDescription(`Hola <@${interaction.user.id}> Bienvenido a mi panel de invitación.
            \n- Unete a mi servidor, click en el boton : \` 🦄 | Pegasu´s Support\`
            \n- Invitame, click en el boton : \`⚜️ | Invitame a tu Servidor \``)
            .setColor("DarkButNotBlack")
            .setImage("https://share.creavite.co/gNwABTD00Fj6EqD6.gif")
            .setTimestamp()

        const button = new ButtonBuilder()
            .setLabel(" ⚜️ | Invitame a tu Servidor")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=985465046316515368&permissions=8&scope=applications.commands%20bot")
            .setStyle(ButtonStyle.Link);

        const wee = new ButtonBuilder()
            .setLabel(" 🦄 | Pegasu´s Support")
            .setURL("https://discord.gg/6VTgqXW79k")
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(wee, button);
        await interaction.reply({
            embeds: [embed],
            components: [row]
        })
    }
};
