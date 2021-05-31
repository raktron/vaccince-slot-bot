const message_format = require('../message-format.json')

class Center {
    constructor(slots){
        this.slots = slots
        this.centerName = slots[0].centerName,
        this.centerPin = slots[0].centerPin
        this.centerAddress = slots[0].centerAddress
        this.feeType = slots[0].feeType
        this.totalSlots = slots.map(x => x.availablity).reduce((a,c) => c + a)
    }

    getFormattedMessage = () => {
        let updateMessage = message_format.heading
        updateMessage += message_format.nextLine
        updateMessage += message_format.CentreBlock
                .replace("[CENTRE]",this.centerName)
                .replace("[PINCODE]",this.centerPin)
                .replace("[ADDRESS]", this.centerAddress)
        this.slots.forEach(slot => {
            updateMessage +=  message_format.nextLine
            updateMessage +=  message_format.slotBlock
                .replace("[DATE]", slot.date.replace(/-/g, "\\-"))
                .replace("[DOSE_1]",slot.dose1)
                .replace("[DOSE_2]",slot.dose2)
                .replace("[AGE]", slot.minAgeLimit)
                .replace("[VACCINE]",slot.vaccine)
                updateMessage += message_format.nextLine
        })
       
        updateMessage += message_format.nextLine
        updateMessage += message_format.FeeType.replace("[FEE]", this.feeType)
        return updateMessage
    }
}

module.exports = Center