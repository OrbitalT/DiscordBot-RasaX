const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config/config.json')
// const privateMessgae = require('./utility/pm')

client.on('ready', () => {
    console.log('Go For Launch');

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file != baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')

    // command(client, 'server', (message) => {
    //     const {
    //         guild
    //     } = message
    //     const {
    //         name,
    //         region,
    //         memberCount,
    //         owner,
    //         afkTimeout
    //     } = guild
    //     const icon = guild.iconURL()
    //     const embed = new Discord.MessageEmbed()
    //         .setTitle(`Server Info for "${name}"`)
    //         .setThumbnail(icon)
    //         .addFields({
    //             name: "Region",
    //             value: region,
    //         }, {
    //             name: "Members",
    //             value: memberCount,
    //         }, {
    //             name: "Owner",
    //             value: owner.user.tag,
    //         }, {
    //             name: "AFK Timerout",
    //             value: afkTimeout / 60,
    //         })

    //     message.channel.send(embed)
    // })

    // // only for 14 day old messgaes
    // command(client, ['cc', 'clear'], (message) => {
    //     if (message.member.hasPermission('ADMINISTRATOR')) {
    //         message.channel.messages.fetch().then((results) => {
    //             message.channel.bulkDelete(results)
    //         })
    //     }
    // })

    // command(client, 'status', (message) => {
    //     const content = message.content.replace('!status ', '')
    //     client.user.setPresence({
    //         activity: {
    //             name: content,
    //             type: 0,
    //         },
    //     })
    // })

    // privateMessgae(client, 'ping', 'Pong!')
})

client.login(config.token)