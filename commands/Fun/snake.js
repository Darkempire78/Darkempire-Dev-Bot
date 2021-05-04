const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const snake = require("snakecord");

module.exports = {
    name: "snake",
    category: "Fun",
    aliases: [],
    cooldown: 2,
    usage: "snake",
    description: "Create a game of the Snake game",
    run: async (client, message, args, user, text, prefix) => {
        try{
            // https://www.npmjs.com/package/snakecord
            const snakeGame = new snake({
                title: "Snake Game",
                color: "BLUE",
                timestamp: true,
                gameOverTitle: "You win!"
                    })
    
            snakeGame.newGame(message)
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