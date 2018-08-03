const moment = require("moment");

var generateMessage = (from, text) => {
  return {
    from,
    text,
    timestamp: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  }
};

module.exports = {generateMessage};
