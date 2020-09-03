/**
 * check validity of phone number to comply with the international schema
 * 
 * @param number String
 * @returns Boolean
 */
export function isValidPhoneNumber (value: string) {
  const phonePattern = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?[\-\.\ \\\/]?(\d+))?$/
  return phonePattern.test(value)
}

/**
 * check length of a string between min w max specific length
 * 
 * @param value String
 * @param min Number
 * @param max Number
 * @returns Boolean
 */
export function isValidLength(number: number, min: number, max: number) {
  return number >= min && number <= max
}

export function validaFromField(value: string) {
  if(value[0] === '0' || value[0] === '+') {
    return isValidPhoneNumber(value)
  }
  else {
    return isValidLength(value.length, 5, 11)
  }
}