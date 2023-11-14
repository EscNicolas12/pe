function antiCrash(err, channel) {
    try {
        const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(err.message)
            .setDescription(`${err.stack}`)
            .setTimestamp()
        client.channels.cache.get(channel).send({ embeds: [embed] })
    } catch {
        console.log(err.message + "\n" + err.stack)
    }
}

process.on('uncaughtException', (err) => antiCrash(err, "1164660215392776395"))
process.on('unhandleRejection', (reason) => antiCrash(reason, "1164660215392776395"))