const config = require('../config.json')
const axios = require('axios').default
const queryString = require('querystring')
const log = require('./log')

const MINIMUM_AGE_LIMIT = 45

const getISODate = () => {
    const currentDate = new Date()
    const DateString = `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}` 
    return DateString;
}

const formatSessions = ( sessions ) => {
    const condensedSessions = []
    for (const session of sessions) {
        if(session.available_capacity > 0 && session.min_age_limit < MINIMUM_AGE_LIMIT){
            // Add more condition to filter session if required
            const newSession = {
                date: session.date,
                slots_dose_1: session.available_capacity_dose1,
                slots_dose_2: session.available_capacity_dose2,
                ageLimit: session.min_age_limit,
                vaccine: session.vaccine
            }
            condensedSessions.push(newSession)
        }
    }
    return condensedSessions
}

const processSlotsInformation = (response) => {
    const slots = []
    for (const center of response.centers) {
        const formattedSession = formatSessions(center.sessions)
        if(config.cowin.pincodes.includes(center.pincode)){
            const newCenter = {
                id: center.center_id,
                name: center.name,
                addr: center.address,
                pin: center.pincode,
                sessions: formattedSession,
                available : formattedSession.length > 0 ? formatSessions.length : false,
                feeType: center.fee_type
            }
            slots.push(newCenter)
        }
    }   
    return slots
}

const getSlotInfomation = async () => {
    try{
    const query = queryString.stringify({district_id: config.cowin.district.mysuru, date: getISODate()})
    const headers = {
        'Accept':'text/html,application/xhtml+xml,application/xml',
        'Accept-Encoding':'gzip, deflate',
        'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
        'Accept-Charset':'ISO-8859-1',
        'Origin':'https://www.cowin.gov.in',
        'referer':'https://www.cowin.gov.in/'
    }
    const cowinResult = await axios.get(`${config.cowin.byDistrictUrl}?${query}`,{headers})
    const slots = processSlotsInformation(cowinResult.data)
    const availableSlots = slots.filter(slot => slot.available > 0)
    log.info(`App connected to cowin and got ${slots.length} records`)

    return availableSlots
    }
    catch(error){
        log.error('Failed to connect with cowin apis',error)
    }
}


module.exports = getSlotInfomation
