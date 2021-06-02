export const Regex = {
    
    regexNameFirstName: (value) => {
        return /^([A-Za-z]{3,15})?([-]{0,1})?([A-Za-z]{3,15})$/.test(value)
    },
    regexEmail: (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    },
    regexAddressAndCity: (value) => {
        return /^[A-Za-z0-9\s]{5,40}$/.test(value)
    }
}