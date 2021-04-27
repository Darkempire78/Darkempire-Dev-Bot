const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const smartestchatbot = require('smartestchatbot')
const chatBot = new smartestchatbot.Client()

module.exports = {
    name: "chatbot",
    category: "Fun",
    aliases: ["cb"],
    cooldown: 2,
    usage: "chatbot <query>",
    description: "",
    run: async (client, message, args, user, text, prefix) => {
        try{
            if(!args[0])
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | You didn't provided a qurey`)
                    .setDescription(`Usage: \`${prefix}${this.usage}\``)
                );

            // https://www.npmjs.com/package/smartestchatbot/v/1.0.4
            chatBot.chat({message: message.content, name: client.user.username, owner:"Darkempire", user: parseInt(message.author.id), language:"en"}).then(reply => {
                reply = reply.replace("@everyone", "").replace("@here", "")
                message.channel.send(`<@${message.author.id}> ${reply}`);
        })

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