//here the event starts
module.exports = async (client, member) => {
    client.channels.fetch("853391996051390475").then(channel => {
        channel.setName(`🏆│${member.guild.memberCount} Members`)
    })
}

