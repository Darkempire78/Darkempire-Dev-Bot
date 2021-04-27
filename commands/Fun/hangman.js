const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
// const hangman = require('discord-hangman');

module.exports = {
    name: "hangman",
    category: "Fun",
    aliases: ["hm"],
    cooldown: 2,
    usage: "hangman",
    description: "Create a game of the Hangman",
    run: async (client, message, args, user, text, prefix) => {
        try{
            // https://www.npmjs.com/package/discord-hangman
            message.channel.send("soon")
            // await hangman.create(message.channel, 'random')
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    }
}