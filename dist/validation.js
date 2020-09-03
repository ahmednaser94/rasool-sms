"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaFromField = exports.isValidLength = exports.isValidPhoneNumber = void 0;
/**
 * check validity of phone number to comply with the international schema
 *
 * @param number String
 * @returns Boolean
 */
function isValidPhoneNumber(value) {
    const phonePattern = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?[\-\.\ \\\/]?(\d+))?$/;
    return phonePattern.test(value);
}
exports.isValidPhoneNumber = isValidPhoneNumber;
/**
 * check length of a string between min w max specific length
 *
 * @param value String
 * @param min Number
 * @param max Number
 * @returns Boolean
 */
function isValidLength(number, min, max) {
    return number >= min && number <= max;
}
exports.isValidLength = isValidLength;
function validaFromField(value) {
    if (value[0] === '0' || value[0] === '+') {
        return isValidPhoneNumber(value);
    }
    else {
        return isValidLength(value.length, 5, 11);
    }
}
exports.validaFromField = validaFromField;
