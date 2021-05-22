const config = require('../config.json')
const axios = require('axios').default
const log = require('./log')

const sendMessage = async (message) => {
    try{
        const URL = `${config.telegram.host}${config.telegram.botToken}/${config.telegram.methods.sendMessage}`
        const payload = {
            chat_id: config.telegram.chatId.live,
            text: message,
            parse_mode: 'MarkdownV2'
        }

        const result = await axios.post(URL, payload)
        log.info(`message set to bot to id ${config.telegram.chatId.live}`)
    }
    catch(error){
        log.error('Failed to send message to bot',error)
    }
}

module.exports = {
    sendMessage
}