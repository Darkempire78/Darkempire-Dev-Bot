//here the event starts
module.exports = async (client, member) => {
    try {
        console.log(member.guild.memberCount)
        client.channels.fetch("853391996051390475").then(channel => {
            channel.setName(`🏆│${member.guild.memberCount} Members`)
        })
    } 
    catch (error) {
        console.error(error)
    }
    
}