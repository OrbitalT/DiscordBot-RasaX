module.exports = {
    category: 'Utility',
    description: 'Replies with "Pong"!',
    callback: ({ message }) => {
        message.author.send("Pong!")
    }
}