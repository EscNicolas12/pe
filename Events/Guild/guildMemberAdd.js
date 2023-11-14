const { GuildMember, EmbedBuilder } = require("discord.js");
const welcomeSchema = require("../../Models/welcomeSchema");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    /**
     * 
     * @param {GuildMember} member
     */
    async execute(member, guild) {
        const welcomeData = await welcomeSchema.findOne({ guildId: member.guild.id });
        if (!welcomeData) return;
        const channel = member.guild.channels.cache.get(welcomeData.channelId); if (!channel) return;
        const mensaje = welcomeData.message; if (!mensaje) return;
        let imagen = welcomeData.imagenUrl;
        if (!imagen) return imagen = 'https://eskipaper.com/images/black-screen-2.jpg'

        const welcomeEmbed = new EmbedBuilder()
            .setAuthor({ name: `${member.guild.name}`, iconURL: guild.user.avatarURL({ sieze: 4096, dynamic: true }) })
            .setDescription(`**Bienvenido** <@${member.user.id}> \n> ${mensaje}`)
            .setColor("DarkButNotBlack")
            .setImage(imagen)
            .setFooter({ text: `Contigo Somos : ${member.guild.memberCount}` })
            .setTimestamp()

        return channel.send({ embeds: [welcomeEmbed] })
    }
};
