const config = require('../config.json')
const log = require('./log')
const Slot = require('./slot.class')
const getSlotInformationByPin = require('./cowin-api')

const MINIMUM_AGE_LIMIT = 45
const MINIMUM_SLOT_CAPACITY = 4
const MINIMUM_SLOT_CAPACITY_FOR_DOSE = 2


const convertCentersToSlots = (centers) => {
    const slots = []

    for (const center of centers) {
        const centerName = center.name
        const centerAddress = center.address
        const centerPin = center.pincode
        const centerId = center.center_id
        if (config.cowin.pincodes.includes(center.pincode)) {
            console.log('center', center)
            for (const session of center.sessions) {
                // if ((session.available_capacity > 4 || session.available_capacity_dose1 > 2 || session.available_capacity_dose2 > 2) && session.min_age_limit < 45) {
                    if(true) {
                    const slot = new Slot(
                        centerName,
                        centerAddress,
                        centerPin,
                        centerId,
                        session.available_capacity,
                        session.date,
                        session.available_capacity_dose1,
                        session.available_capacity_dose2,
                        session.vaccine,
                        center.fee_type,
                        session.min_age_limit
                    )
                    slots.push(slot)
                }
            }
        }
        else {
            continue
        }
    }

    

    return slots
}


const getSlotInfomation = async () => {
    const currentDate = new Date()
    const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7))

    const calendarByPins = []

    for (const pin of config.cowin.pincodes) {
        calendarByPins.push(...await getSlotInformationByPin(pin, currentDate))
        calendarByPins.push(...await getSlotInformationByPin(pin, nextWeek))
    }

    const slots = convertCentersToSlots([ ...calendarByPins]) || []

    log.info(`Available slots length ${slots.length}`)

    return slots

}


module.exports = getSlotInfomation
