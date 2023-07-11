const dayjs = require("dayjs");

module.exports = {
  formatTimestamp: (timestamp) => {
    dayjs(timestamp).format("DD/MM/YYYY");
  },
};
