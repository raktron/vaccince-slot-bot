class Slot {
    constructor(centerName, centerAddress, centerPin,centerId ,slotAvailability, slotDate, slotAvailablityDose1, slotAvailablityDose2, vaccineName, vaccineFeeType, minAgeLimit){
        this.centerName = centerName
        this.centerAddress = centerAddress
        this.centerPin = centerPin
        this.centerId = centerId
        this.availablity = slotAvailability || 5
        this.date = slotDate
        this.dose1 = slotAvailablityDose1
        this.dose2 = slotAvailablityDose2
        this.vaccine = vaccineName
        this.feeType = vaccineFeeType
        this.minAgeLimit = minAgeLimit
    }
}

module.exports = Slot