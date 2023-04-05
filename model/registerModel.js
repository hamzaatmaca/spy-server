const mongoose = require("mongoose");

const Register = mongoose.model("Register", {
  name: String,
  surname: String,
  email: String,
  password: String,
  hostname: String,
  country: String,
  city: String,
  address: String,
  phone: String,
  date: { type: Date, default: Date.now },
});

module.exports = Register;
