const dayjs = require("dayjs");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  formatTimestamp: (timestamp) => {
    return dayjs(timestamp).format("DD/MM/YYYY");
  },
  hashPassword: async (plainPassword) => {
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      console.log(hashedPassword);
      return hashedPassword;
    } catch (err) {
      console.error("Error hashing password.");
      throw err;
    }
  },
  isEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
};
