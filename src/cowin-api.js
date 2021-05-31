const axios = require('axios').default
const queryString = require('querystring')
const log = require('./log')
const config = require('../config.json')


const getISODate = (date) => {
    const currentDate = date
    const DateString = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`
    return DateString;
}


const getHeaders = () => {
    return {
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Encoding': 'gzip, deflate',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
        'Accept-Charset': 'ISO-8859-1',
        'Origin': 'https://www.cowin.gov.in',
        'referer': 'https://www.cowin.gov.in/'
    }
}

// Commenting out and will be used if required in future
// const getSlotInfomationByCalendar = async (startDate) => {
//     try {
//         console.log('info from calendar')
//         log.info(`getting by calendar for ${startDate}`)
//         const query = queryString.stringify({ district_id: config.cowin.district.id, date: getISODate(startDate) })
//         const headers = getHeaders()
//         const cowinResult = await axios.get(`${config.cowin.byDistrictUrl}?${query}`, { headers })

//         log.info(`App connected to cowin by calendar and got ${cowinResult.data.centers.length} records`)

//         return cowinResult.data.centers
//     }
//     catch (error) {
//         log.error('Failed to connect with cowin apis', error)
//         throw error
//     }
// }

const getSlotInformationByPin = async (pin, date) => {
    try {
        log.info(`getting by pin for ${pin} and ${date}`)
        const query = queryString.stringify({ pincode: pin, date: getISODate(date) })
        const headers = getHeaders()
        const cowinResult = await axios.get(`${config.cowin.byPinUrl}?${query}`, { headers })
        console.log(cowinResult.data.centers)
        log.info(`App connected to cowin by pin ${pin} and got ${cowinResult.data.centers.length} records`)

        return cowinResult.data.centers
    }
    catch (error) {
        log.error('Faled to connect with cowin apis', error)
        throw error
    }
}

module.exports = getSlotInformationByPin