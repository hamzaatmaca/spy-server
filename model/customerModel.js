const mongoose = require("mongoose");

const Customer = mongoose.model("Customer", {
  customer: String,
  date: { type: Date, default: Date.now },
});

module.exports = Customer;
