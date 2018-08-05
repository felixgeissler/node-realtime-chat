const moment = require("moment");

//moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
var generateMessage = (from, text) => {
  return {
    from,
    text,
    timestamp: moment().format("DD.MM.YY h:mm")
  }
};

module.exports = {generateMessage};
