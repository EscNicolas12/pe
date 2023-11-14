const { GuildMember, EmbedBuilder } = require("discord.js");
const leaveSchema = require("../../Models/leaveSchema");

module.exports = {
    name: "guildMemberRemove",
    once: false,
    /**
     * 
     * @param {GuildMember} member
     */
    async execute(member, guild) {
        const welcomeData = await leaveSchema.findOne({ guildId: member.guild.id });
        if (!welcomeData) return;
        const channel = member.guild.channels.cache.get(welcomeData.channelId); if (!channel) return;
        const mensaje = welcomeData.message; if (!mensaje) return;
        let imagen = welcomeData.imagenUrl;
        if (!imagen) return imagen = 'https://eskipaper.com/images/black-screen-2.jpg'


        const welcomeEmbed = new EmbedBuilder()
            .setDescription(`**Adios** <@${member.user.id}> \n> ${mensaje}`)
            .setColor("DarkButNotBlack")
            .setImage(imagen)
            .setFooter({ text: `Sin ti Somos : ${member.guild.memberCount}` })
            .setTimestamp()

        return channel?.send({ embeds: [welcomeEmbed] })
    }
};
