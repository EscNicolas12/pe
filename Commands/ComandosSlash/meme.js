const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Generador de memes"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        let respuestas = [
            "https://i.pinimg.com/236x/a9/40/c8/a940c84189aeb915d153e5f9a53b05b0.jpg",
            "https://i.pinimg.com/236x/9a/19/ac/9a19acda5de604c2f066be8c481d5354.jpg",
            "https://i.pinimg.com/236x/5c/7c/d8/5c7cd8a7654c56d56d028ae492600f10.jpg",
            "https://i.pinimg.com/236x/f1/61/11/f161118505af9daac6838898a51bc4ed.jpg",
            "https://i.pinimg.com/236x/dd/d3/83/ddd3838dab4a88c5aae187ee128e2868.jpg",
            "https://i.pinimg.com/236x/7c/d2/4e/7cd24edd520deeccbde0940861488daf.jpg",
            "https://i.pinimg.com/236x/5c/e6/fc/5ce6fc4ddbc1a336049358866782077c.jpg",
            "https://i.pinimg.com/236x/0d/f8/0c/0df80ce1be9587a388d9c3103018b2f6.jpg",
            "https://i.pinimg.com/236x/a2/0c/df/a20cdff7c622998a0dcad055940036da.jpg",
            "https://i.pinimg.com/236x/87/f5/af/87f5afec62c8e621aab6d2a0bb581724.jpg",
            "https://i.pinimg.com/236x/02/28/8c/02288c28e683ba30fbf1433fa2aaec57.jpg",
            "https://i.pinimg.com/236x/0e/aa/98/0eaa98c2ae0f9da5dba38820141ab42f.jpg",
            "https://i.pinimg.com/236x/87/f5/af/87f5afec62c8e621aab6d2a0bb581724.jpg",
            "https://i.pinimg.com/236x/b2/9b/57/b29b577218ec6fb45858492234a217f6.jpg",
            "https://i.pinimg.com/236x/1c/64/eb/1c64ebef1fdabdafb07f495cbd885e49.jpg",
            "https://i.pinimg.com/236x/95/59/62/955962fcc28fe0acfdbb79c18148183e.jpg",
            "https://i.pinimg.com/236x/c7/9b/b6/c79bb6d5d938719975a5765cee48a76a.jpg",
            "https://i.pinimg.com/236x/24/b9/14/24b914660b33513462b5c5e962c10291.jpg",
            "https://i.pinimg.com/236x/35/34/9a/35349af23d5b8783e82d13452007ade2.jpg",
            "https://i.pinimg.com/236x/60/d7/8f/60d78f0b7e7e494bc25a27e0f5097066.jpg",
            "https://i.pinimg.com/236x/c4/17/c8/c417c8ad3998077abe5ba133410b7fe7.jpg",
            "https://i.pinimg.com/564x/d3/79/a7/d379a7cf50e5490856ff224fc454a1fb.jpg",
            "https://i.pinimg.com/236x/89/e3/b3/89e3b36d8ca1e7ae86d4a507ff0e08dc.jpg",
            "https://i.pinimg.com/236x/5a/7b/b0/5a7bb08257b5c691149cd75085a6db80.jpg",
            "https://i.pinimg.com/236x/c5/50/50/c55050e90eeb52ed263495c93758dedd.jpg",
            "https://i.pinimg.com/236x/3e/18/5e/3e185e6b439f1009acd7156076e957c5.jpg",
            "https://i.pinimg.com/236x/de/e5/73/dee5734438d93a3369f35756f9a926e0.jpg",
            "https://i.pinimg.com/236x/3a/27/84/3a278416856f1750cf47eb624cccb5bd.jpg",
            "https://i.pinimg.com/236x/0f/ce/ab/0fceabe29f771b53650b780ca96a7396.jpg",
            "https://i.pinimg.com/236x/74/d5/61/74d561fef11695c5a8dd00508a24aba5.jpg",
            "https://i.pinimg.com/236x/2d/34/63/2d346314cb3ca30f99c235fd1286e81e.jpg",
            "https://i.pinimg.com/236x/54/81/ff/5481ff222a4d76d480bc1c2986116820.jpg",
            "https://i.pinimg.com/236x/4a/42/cb/4a42cb9fbd70bd388359ea6a1f1adfe9.jpg",
            "https://i.pinimg.com/236x/46/09/3d/46093d2140eeac1d7618bcc723b14881.jpg",
            "https://i.pinimg.com/236x/27/96/63/279663bbeeea9306871ddcc0e048d1e9.jpg",
            "https://i.pinimg.com/236x/30/06/2c/30062c5191d7a2650a8863de0f074947.jpg",
            "https://i.pinimg.com/564x/68/ad/d0/68add0ca0302dde8e3d51dee7d3f097f.jpg",
            "https://i.pinimg.com/564x/10/7a/54/107a547182e2cd210adba54185927085.jpg",
            "https://i.pinimg.com/236x/47/26/29/472629753aa9f72355433bf3af3bfb35.jpg",
            "https://i.pinimg.com/236x/1c/f5/ac/1cf5acfa21bd7523eda74fe7da71c944.jpg",
        ];
        const respuesta = Math.floor(Math.random() * respuestas.length)

        const embed = new EmbedBuilder()
            .setDescription(" **Memes** ")
            .setImage(`${respuestas[respuesta]}`)
            .setFooter({ text: `PowerBy :   ${interaction.guild}` })
            .setColor("DarkButNotBlack");
        interaction.reply({ embeds: [embed] })
    }
};
