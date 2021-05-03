const http = require('http')
const config = require('../config/config.json')

module.exports = {
    name: 'rasa',
    aliases: ['r'],
    category: 'Utility',
    description: 'Uses Rasa to chat with person',
    callback: ({ message, text }) => {
        if (message.channel.type === 'dm') {

            // HTTP POST REQUEST FOR THE RASA API
            const data = JSON.stringify({
                sender: message.author.username,
                message: text
            })

            const options = {
                hostname: config.host,
                port: config.port,
                path: '/webhooks/rest/webhook',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            }

            const req = http.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)

                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    // console.log('Response: ' + chunk);
                    const rasares = JSON.parse(chunk);
                    // console.log(rasares);

                    for (var i = 0; i < rasares.length; i++) {
                        // console.log(rasares[i].text);
                        message.author.send(rasares[i].text)
                    }

                })
            })

            req.on('error', error => {
                console.error(error)
            })

            req.write(data)
            req.end()

        }
    }
}