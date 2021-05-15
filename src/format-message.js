const message_format = require('../message-format.json')

const formatMessage = (centerInformation) => {
    let updateMessage = message_format.heading
    updateMessage += message_format.nextLine
    updateMessage += message_format.CentreBlock
            .replace("[CENTRE]",centerInformation.name)
            .replace("[PINCODE]",centerInformation.pin)
            .replace("[ADDRESS]", centerInformation.addr)
    centerInformation.sessions.forEach(session => {
        updateMessage +=  message_format.nextLine
        updateMessage +=  message_format.slotBlock
            .replace("[DATE]", session.date.replace(/-/g, "\\-"))
            .replace("[SLOTS]",session.slots)
            .replace("[AGE]", session.ageLimit)
            .replace("[VACCINE]",session.vaccine)
            updateMessage += message_format.nextLine
    })
   
    updateMessage += message_format.nextLine
    updateMessage += message_format.FeeType.replace("[FEE]", centerInformation.feeType)
    return updateMessage
}

module.exports = formatMessage