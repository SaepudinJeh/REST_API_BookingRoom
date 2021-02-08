const moment = require("moment");

moment.locale('id');

const dateId = moment().format('LLLL');

module.exports = dateId;
