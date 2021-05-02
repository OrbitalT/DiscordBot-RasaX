const http = require('http')

module.exports = {
    category: 'Utility',
    description: 'Uses Rasa to chat with person',
    callback: ({ message }) => {
        if (message.channel.type === 'dm') {

            // const data = JSON.stringify({
            //     sender: 'testerC',
            //     message: 'Lease'
            //   })
              
            //   const options = {
            //     hostname: '1.2.1.51',
            //     port: 5005,
            //     path: '/webhooks/rest/webhook',
            //     method: 'POST'
            //   }
              
            //   const req = http.request(options, res => {
            //     console.log(`statusCode: ${res.statusCode}`)
              
            //     res.on('data', d => {
            //       process.stdout.write(d)
            //     })
            //   })
              
            //   req.on('error', error => {
            //     console.error(error)
            //   })
              
            //   req.write(data)
            //   req.end()

            message.author.send(author)
        }
    }
}