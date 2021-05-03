const ee = require("../../botconfig/embed.json");
let client;
module.exports = {
    name: "clear",
    aliases: ["purge"],
    description: "Deletes the provided amount of messages",
    category: "Administration",
    guildOnly: true,
    memberpermissions: "MANAGE_MESSAGES",
    adminPermOverride: true,
    cooldown: 2,
    args: true,
    usage: "clear <amount>",
    run(clientt, message, args) {
        client = clientt //if someone know how to do this please do so
        let msg = args[0]
        if (isNaN(msg)) sendHelp(message, this)
        else clear(message, msg)
    },
};

/**
 * 
 * @param {Object} message Command message which triggered this
 * @param {Integer} msg Number of messages to delete
 */
async function clear(message, msg) {
    let total = msg
    if (msg >= 101) {
        while (msg > 100) {
            message.channel.bulkDelete(100, true).catch(r => r)
            msg -= 100
        }
        if (msg < 100) {
            message.channel.bulkDelete(msg, true).catch(r => r)
            message.reply("Deleted 👍").then(m => m.delete({ setTimeout: 10000 }))
        }
    }
    else {
        await message.channel.bulkDelete(msg, true).catch(r => r)
        message.reply("Deleted 👍").then(m => m.delete({ setTimeout: 10000 }))
    }
    require("../../lib/logs").execute(client, "commands", "clear", `<@${message.member.id}> cleared ${total} messages in <#${message.channel.id}>`, true)
}
/**
 * 
 * @param {object} command The command object defined above
 * @param {Object} message Command message which triggered this
 */
async function sendHelp(command, message) {

    return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERROR | You didn't provided a Title, nor a Description`)
        .setDescription(`Usage: \`${prefix}${command.usage}\``)
    );
}