const buildPayload = require('../helpers/build-payload');
const customTimes = require('./custom-times');
const delorean = require('@gabrieluizramos/delorean-js');

function formataPayload(data, random) {
    const weekDay = delorean.setDate(data).getWeekDay('short');
    const horarios = customTimes(weekDay);

    if(random) {
        return buildPayload(data, randomizeHours(horarios), weekDay);
    }

    return buildPayload(data, horarios, weekDay);
}

const formatNumberWith2Digits = (number) => number < 10 ? `0${number}` : number;

const formatDateToBr = (date) => `${formatNumberWith2Digits(date.getDate())}/${formatNumberWith2Digits(date.getMonth() + 1)}/${date.getFullYear()}`;

const formateDateToISO = (date) => `${date.getFullYear()}-${formatNumberWith2Digits(date.getMonth() + 1)}-${formatNumberWith2Digits(date.getDate())}`;

function randomizeHours(hours) {
    return hours.map((hour, index) => {
        if(index % 2 == 0) {
            random = getRandomInt(-10, 10)
        } else {
            random = random * -1
        }
        
        hourParts = hour.split(":")
        
        date = new Date()
        date.setUTCHours(parseInt(hourParts[0]), parseInt(hourParts[1]), 0, 0)
        date = addMinutes(date, random)

        return formatNumberWith2Digits(date.getUTCHours())+":"+formatNumberWith2Digits(date.getUTCMinutes())
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

module.exports = {
    formataPayload,
    formatNumberWith2Digits,
    formatDateToBr,
    formateDateToISO
};
