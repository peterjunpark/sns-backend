const dayjs = require("dayjs");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  formatTimestamp: (timestamp) => {
    return dayjs(timestamp).format("DD/MM/YYYY");
  },
  hashPassword: (plainPassword) => {
    return bcrypt.hash(plainPassword, saltRounds);
  },
  isEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
};
