const moment = require("moment-timezone");

const dateId = moment.tz(Date.now(), "Asia/Jakarta");

module.exports = dateId;
