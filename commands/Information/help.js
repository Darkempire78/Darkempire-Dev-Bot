const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "help",
    category: "Information",
    aliases: ["h", "commandinfo", "cmds", "cmd"],
    cooldown: 4,
    usage: "help [Command]",
    description: "Returns all Commmands, or one specific command",
    run: async (client, message, args, user, text, prefix) => {
        try {
            if (args[0]) {
                const embed = new MessageEmbed();
                const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
                if (!cmd) {
                    return message.channel.send(embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
                }
                if (cmd.name) embed.addField("**Command :**", `\`${cmd.name}\``);
                if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
                if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
                if (cmd.aliases) embed.addField("**Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
                if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
                else embed.addField("**Cooldown**", `\`${config.defaultCommandCooldown}\``);
                if (cmd.usage) {
                    embed.addField("**Usage**", `\`${config.prefix}${cmd.usage}\``);
                    embed.setFooter("Syntax: <> = required, [] = optional");
                }
                if (cmd.useage) {
                    embed.addField("**Usage**", `\`${config.prefix}${cmd.useage}\``);
                    embed.setFooter("Syntax: <> = required, [] = optional");
                }
                return message.channel.send(embed.setColor(ee.color));
            } else {
                const embed = new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle("HELP MENU 🔰 Commands")
                    .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
                const commands = (category) => {
                    return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
                };
                try {
                    for (let i = 0; i < client.categories.length; i += 1) {
                        const current = client.categories[i];
                        const items = commands(current);

                        if (items.length >= 1) {
                            embed.addField(`**${current.toUpperCase()} (${items.length})**`, `> \`${items.join("`\n > `")}\``, true);
                        }
                    }
                } catch (e) {
                    console.log(String(e.stack).red);
                }
                message.channel.send(embed);
            }
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