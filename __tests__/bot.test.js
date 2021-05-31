const {sendMessage } = require('../src/bot')
const axios = require('axios')
const log = require('../src/log')

jest.mock('axios')
jest.mock('../src/log')

describe('Testing bot.js', () => {
    it('should throw error when request fails', async () => {
        const message = 'This is a test message'

        axios.post.mockImplementation(() => {
            return Promise.reject(new Error("boom"))
        })

        log.info.mockImplementation((message) => console.log(messsage))
        log.error.mockImplementation((errorMsg) => {
            expect(errorMsg.message.toEqual('Failed to send message to bot'))
        })
       
        try{
            sendMessage(message)
        }
        catch(error){
            expect(error).toEqual('boom')
        }
    })

    it('should send out message to telegram bot' , async () => {
        const message = 'This is a test message'

        axios.post.mockImplementation((url, payload) => {
            expect(payload.message).toEqual('This is a test message')
            return Promise.resolve({})
        })

        log.info.mockImplementation(() => {})
        log.error.mockImplementation(() => {})
       
        
        sendMessage(message)
        
    })
})