const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require(`discord.js`);
const { options } = require("node-os-utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("hola")
        .addSubcommand(command => command
            .setName("info")
            .setDescription("Obtienes la información tuya")
            .addUserOption(option => option
                .setName(`usuario`)
                .setDescription(`Obtienes la información de un usuario`)
                .setRequired(false)))
        .addSubcommand(command => command
            .setName("banner")
            .setDescription(`Obtienes tu banner`)
            .addUserOption(option => option.setName(`usuario`).setDescription(`Obtienes el banner de un usuario`).setRequired(false)))
        .setDMPermission(false),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {

        const { options } = interaction;
        const sub = options.getSubcommand()

        switch (sub) {
            case 'info':

                try {
                    const formatter = new Intl.ListFormat(`en-GB`, { style: `narrow`, type: `conjunction` });

                    const badges = {
                        Staff: "<:nuevo1:1172044569098072145>",
                        Partner: "<:nuevo2:1172044571421712446>",
                        Hypesquad: "<:nuevo3:1172044572541591613>",
                        HypeSquadOnlineHouse1: "<:nuevo4:1172044574059921468>",
                        HypeSquadOnlineHouse2: "<:nuevo5:1172044576236769280>",
                        HypeSquadOnlineHouse3: "<:nuevo6:1172044577302126662>",
                        PremiumEarlySupporter: "<:nuevo7:1172044577876758560>",
                        BugHunterLevel2: "<:nuevo8:1172044580095528970>",
                        BugHunterLevel1: "<:nuevo9:1172044885050789888>",
                        ActiveDeveloper: "<:nuevo10:1172048315714641981>",
                        TeamPseudoUser: "tpu",
                        VerifiedBot: "vb",
                        CertifiedModerator: "cm",
                        BotHttpInteractions: "bhi",
                    }

                    const user = interaction.options.getUser("usuario") || interaction.user;
                    const userFlags = user.flags.toArray();
                    const member = await interaction.guild.members.fetch(user.id);
                    const topRoles = member.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map(role => role)
                        .slice(0, 3)
                    const banner = await (await client.users.fetch(user.id, { force: true })).bannerURL({ size: 4096 });
                    const booster = member.premiumSince ? `<a:nuevo10:1172044581886505000> Yes` : `No`;
                    const ownerE = `<:nuevo11:1172044672865157170>`;
                    const devs = `<:nuevo12:1172044583530668092>`;
                    const owners = `245339452464037888`;
                    const MutualServers = [];

                    for (const Guild of client.guilds.cache.values()) {
                        if (Guild.members.cache.has(member.id)) {
                            MutualServers.push(`[${Guild.name}](https://discord.com/guilds/${Guild.id})`)
                        }
                    }

                    const embed = new EmbedBuilder()
                        .setAuthor({ name: `información de @${member.user.tag}`, iconURL: member.displayAvatarURL() })
                        .setTitle(`**@${member.user.tag}** ${userFlags.length ? formatter.format(userFlags.map(flag => `${badges[flag]}`)) : ` `}`)
                        .setColor("DarkButNotBlack")
                        .setThumbnail(member.displayAvatarURL())
                        .setDescription(`• **Id** - ${member.id}\n• **Boosted** - ${booster}\n• **Top Rol** - ${topRoles}\n• **Entró al servidor** - <t:${parseInt(member.joinedAt / 1000)}:R>\n• **Cuenta creada** - <t:${parseInt(user.createdAt / 1000)}:R>`)
                        .addFields({ name: `Banner`, value: banner ? " " : "No contiene ningún banner" })
                        .setImage(banner)

                    if (member.id == interaction.guild.ownerId) {
                        embed
                            .setTitle(`**${member.user.tag}** ${ownerE} ${userFlags.length ? formatter.format(userFlags.map(flag => `${badges[flag]}`)) : ` `}`)
                    }
                    if (owners.includes(member.id)) {
                        embed
                            .setTitle(`**${member.user.tag}** ${devs} ${userFlags.length ? formatter.format(userFlags.map(flag => `${badges[flag]}`)) : ` `}`)
                    }
                    if (owners.includes(member.id) && member.id == interaction.guild.ownerId) {
                        embed
                            .setTitle(`**${member.user.tag}** ${devs} ${ownerE} ${userFlags.length ? formatter.format(userFlags.map(flag => `${badges[flag]}`)) : ` `}`)
                    }

                    await interaction.reply({ embeds: [embed] })
                } catch (error) {
                    const embed2 = new EmbedBuilder()
                        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
                        .setThumbnail(client.user.displayAvatarURL())
                        .setDescription(`Este usuario no se encuentra en este servidor, por favor ingresa un mimebro de este servidor`)
                        .setColor("DarkButNotBlack")
                        .setTitle(`Error`)
                        .setFooter({ text: `${client.user.tag}`, iconURL: client.user.displayAvatarURL() })
                        .setTimestamp();

                    await interaction.reply({ embeds: [embed2] }).then(inter => {
                        setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
                    })
                }

                break;

            case 'banner':
                try {
                    const user = interaction.options.getUser(`usuario`) || interaction.user;
                    const member = await interaction.guild.members.fetch(user.id);
                    const banner = await (await client.users.fetch(user.id, { force: true })).bannerURL({ size: 4096 });

                    const embed = new EmbedBuilder()
                        .setColor("DarkButNotBlack")
                        .setAuthor({ name: `${user.tag}`, iconURL: member.displayAvatarURL() })
                        .addFields({ name: `Banner de ${user.tag}`, value: banner ? " " : "No contiene ningún banner" })
                        .setImage(banner)
                        .setTimestamp()

                    await interaction.channel.sendTyping(), await interaction.reply({ embeds: [embed] });
                } catch (error) {
                    interaction.reply({ content: 'Algo salio mal, por favor intenta de nuevo.', ephemeral: true }).then(inter => {
                        setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
                    })
                }
        }
    }
}