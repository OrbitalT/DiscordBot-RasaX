module.exports = {
    category: 'Utility',
    description: 'Replies with "Pong"!',
    callback: ({ message }) => {
        if (message.channel.type === 'dm') {
            message.author.send("Pong!")
        }
    }
}