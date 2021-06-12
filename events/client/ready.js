const axios = require('axios');
const fs = require('fs');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/831531284030291989/XUvdCCsNdPIOj2kPJZc10fE7pqt5kBzQen-WRXcxo92TzU-oKVMkqjZ827XjIe6QNd1J");

//here the event starts
const config = require("../../botconfig/config.json")
module.exports = client => {
    try{
        const stringlength = 69;
        console.log("\n")
        console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃".bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃".bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
        console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
    }catch{ /* */ }

    try{
        client.user.setActivity("?help | https://github.com/Darkempire78/Darkempire-Dev-Bot", { type: "PLAYING" });
    }catch (e) {
        console.log(String(e.stack).red);
    }
    //Change status each 10 minutes
    // setInterval(()=>{
    //     try{
    //     client.user.setActivity(`?help ${client.user.username}`, { type: "PLAYING" });
    //     }catch (e) {
    //         console.log(String(e.stack).red);
    //     }
    // }, 10*60*1000)

    // Check each 5 minutes
    setInterval(()=>{
        try{
            // GitHub
            axios.get('https://api.github.com/users/Darkempire78/followers?per_page=100')
            .then(response => {
                const followersNumber = response.data.length;
                const newFollower = response.data[followersNumber - 1]
                // Read last follower
                let lastFollower = JSON.parse(fs.readFileSync("./lastGithubFollower.json"));
                if (newFollower != lastFollower["lastGithubFollower"]) {
                    // Update channel + send notif
                    client.channels.fetch("853329566512054283").then(channel => {
                        console.log(channel)
                        channel.setName(`🚀│${followersNumber} GitHub Followers`)
                    })

                    if (followersNumber > lastFollower["followersNumber"]) {
                        const embed = new MessageBuilder() // https://www.npmjs.com/package/discord-webhook-node
                            .setTitle('New GitHub Follower')
                            .setAuthor(newFollower["login"], newFollower["avatar_url"], newFollower["html_url"])
                            .setColor('#26CB18')
                            .setDescription(`[${newFollower["login"]}](${newFollower["html_url"]}) has just followed [Darkempire78](https://github.com/Darkempire78)`)
                        
                        hook.send(embed);
                    }
        
                    // Set last follower
                    newJsonData = {
                        "followersNumber": followersNumber,
                        "lastGithubFollower": newFollower
                    }
                    fs.writeFileSync("./lastGithubFollower.json", JSON.stringify(newJsonData));
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        catch (e) {
            console.log(String(e.stack).red);
        }
    }, 5*60*1000)
}

// 5*60*1000