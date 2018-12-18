const times = require('../config/custom-times.json');

module.exports = function(weekDay) {
    return times[weekDay] ? times[weekDay] : times.default
}