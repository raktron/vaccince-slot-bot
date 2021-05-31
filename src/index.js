
const cron = require('node-cron')

const log = require('./log')
const formatMessage = require('./format-message')
const getSlotInfomation = require('./slots')
const bot = require('./bot')
const Center = require('./center.class')
var cache = require('memory-cache')   

const DEFAULT_CACHE_TIMEOUT = 4 * 60 * 60 * 1000  // 4 hours


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }   

const process = async () => {
    const availableSlots = await getSlotInfomation()
    if(availableSlots.length === 0) {
        log.info('no available appointments')
        return 
    }

       
       const uniqueCenters = [...new Set(availableSlots.map(x=>x.centerId))]
       for (const centerId of uniqueCenters) {
        const center = new Center(availableSlots.filter(x=> x.centerId === centerId))
        if(center.totalSlots > cache.get(centerId)){
          const message = center.getFormattedMessage()
          await sleep(1000)
          await bot.sendMessage(message)
          cache.put(center.centerPin, center.totalSlots, DEFAULT_CACHE_TIMEOUT)
        }
        else{
          continue
        }
       }
    log.info(`slots available: ${uniqueCenters.length} messages sent to telegram`)
    return 
}



// Polling rate kept at 30 seconds. 

cron.schedule('*/30 * * * * *', async () => {
    log.info('running task every 30 seconds')
    await process()
    log.info('process completed')
})

