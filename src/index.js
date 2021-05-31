
const cron = require('node-cron')

const log = require('./log')
const formatMessage = require('./format-message')
const getSlotInfomation = require('./slots')
const bot = require('./bot')



function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   

const process = async () => {
    const availableSlots = await getSlotInfomation()
    if(availableSlots.length === 0) {
        log.info('no available appointments')
        return ;
    }
    for (const slot of availableSlots) {
        const message = formatMessage(slot)
        await sleep(1000)
        await bot.sendMessage(message)
    }
    log.info(`slots available: ${availableSlots.length} messages sent to telegram`)
    return ;
}


// Polling rate kept at 5 minutes. 

cron.schedule('*/30 * * * * *', async () => {
    log.info('running task every 30 seconds')
    await process()
    log.info('process completed')
})

// This is a test line
