const {
    prefix
} = require('../config/config.json')

const valiadatePermissions = (permissions) => {
    const validPermissions = [
        ADMINISTRATOR,
        CREATE_INSTANT_INVITE,
        KICK_MEMBERS,
        BAN_MEMBERS,
        MANAGE_CHANNELS,
        MANAGE_GUILD,
        ADD_REACTIONS,
        VIEW_AUDIT_LOG,
        PRIORITY_SPEAKER,
        STREAM,
        VIEW_CHANNEL,
        SEND_MESSAGES,
        SEND_TTS_MESSAGES,
        MANAGE_MESSAGES,
        EMBED_LINKS,
        ATTACH_FILES,
        READ_MESSAGE_HISTORY,
        MENTION_EVERYONE,
        USE_EXTERNAL_EMOJIS,
        VIEW_GUILD_INSIGHTS,
        CONNECT,
        SPEAK,
        MUTE_MEMBERS,
        DEAFEN_MEMBERS,
        MOVE_MEMBERS,
        USE_VAD,
        CHANGE_NICKNAME,
        MANAGE_NICKNAMES,
        MANAGE_ROLES,
        MANAGE_WEBHOOKS,
        MANAGE_EMOJIS,
    ]

    for (const permission of permission) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}"`)
        }
    }
}

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionsError = 'No Prems',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions

    if (typeof commands === 'sting') {
        commands = [commands]
    }

    console.log(`Registering command "${commands[0]}"`);

    if (permissions.length) {
        if (typeof permissions === 'string') {
            valiadatePermissions(permissions)
        }
    }

    client.on('message', message => {
        const {
            member,
            content,
            guild
        } = message

        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                for (const permission of permissions) {
                    if (!member.hasPermissions(permission)) {
                        message.reply(permissionsError)

                        return
                    }
                }

                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => role.name === requiredRole)
                    if (!role || member.roles.cache.has(role.id)) {
                        message.reply(`You msut have "${requiredRole}" role for this command.`)

                        return
                    }
                }

                const arguments = content.split(/[ ]+/)

                arguments.shift()

                if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                    message.reply(`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`)

                    return
                }

                callback(message, arguments, arguments.join(' '))

                return
            }
        }
    })
}