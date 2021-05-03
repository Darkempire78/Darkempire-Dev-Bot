const { MessageEmbed } = require("discord.js");
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");
let client;
module.exports = {
    /**
     * 
     * @param {string} type Type of action (command/event/....)
     * @param {string} action What happended ? (command name/user leaves/...)
     * @param {string} description Description of the embed
     * @param {boolean} success Operation was a success ? (determines embed's color)
     */
    execute(clientt, type, action, description, success = null) {
        client = clientt //if someone know how to do this better, please do so
        for (logsTypes in config.logs) {
            if (config.logs[logsTypes].hasOwnProperty(type.toLocaleLowerCase())) {
                if (config.logs[logsTypes][type.toLocaleLowerCase()]?.everything == true
                    || config.logs[logsTypes][type.toLocaleLowerCase()][action.toLocaleLowerCase()] == true
                    || config.logs[logsTypes][type.toLocaleLowerCase()]?.unkown == true
                ) { sendEmbed(logsTypes, type, action, description, success) }
            }
            else if (config.logs[logsTypes].unkown == true) {
                sendEmbed(logsTypes, type, action, description, success)
            }
        }

    },
};
/**
 * 
 * @param {string} logsTypes Is it public/private/other ?
 * @param {string} type Type of action (command/event/....)
 * @param {string} action What happended ? (command name/user leaves/...)
 * @param {string} description Description of the embed
 * @param {boolean} success Operation was a success ? (determines embed's color)
 */
async function sendEmbed(logsTypes, type, action, description = "\u200b", success) {
    client.channels.cache.find(c => c.id == config.logs[logsTypes].channel).send(new MessageEmbed()
        .setColor(success ? ee.color : success == false ? ee.wrongcolor : 0)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`📰 LOGS 📰`)
        .addField(`${type} ${action ? action : " "}`, description)
    );

}