const { GuildMember, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { Welcome } = require("niby-welcomes");
const welcomeSchema = require("../../Models/canvasSchema");

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

        let welcomeImage = await new Welcome()
            .setWelcomeMessage("Bienvenid@") //Puedes reemplazar el texto
            .setUsername(member.user.displayName, /*OPCIONAL*/ { color: "#ffffff" })
            .setMemberCount(`Disfruta tu estadía`, /*OPCIONAL*/ { color: "#ffffff" }) //Puedes reemplazar el texto
            .setAvatar(member.user.displayAvatarURL({ size: 512, extension: 'png' }))
            .setBackgroundUrl(imagen, /*OPCIONAL*/ { opacity: 0.8 }) //Puedes reemplazar la opacidad, es decir que tan oscuro quieres que se vea el fondo, recomendable como esta
            .setBorder(false, /*OPCIONAL*/ { color: "#ffffff", size: 8 }) //Si quieres un borde en la imagen, te recomiendo que no, se veo feo en el embed
            .setStyle("koya") //koya, mee6 existen dos estilos el mee6 y el koya, yo tengo el koya
            .build();

        const attachment = new AttachmentBuilder(welcomeImage, { name: `${member.user.username}welcome.png` })
        const welcomeEmbed = new EmbedBuilder()
            .setAuthor({ name: `${member.guild.name}`, iconURL: member.user.avatarURL({ size: 4096, dynamic: true }) })
            .setDescription(`${mensaje}`)
            .setColor("DarkButNotBlack")
            .setImage(`attachment://${member.user.username}welcome.png`)
            .setTimestamp()

        return channel.send({ embeds: [welcomeEmbed], files: [attachment] })
    }
};