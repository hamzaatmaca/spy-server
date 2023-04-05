const mongoose = require("mongoose");

const Register = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  hostname: String,
  country: String,
  city: String,
  address: String,
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Register", Register);
