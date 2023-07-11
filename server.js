const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/connection");

const PORT = 3002;
const app = express();

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017");
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
  });
});
