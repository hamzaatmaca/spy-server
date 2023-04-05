const mongoose = require("mongoose");

const Submit = mongoose.model("Submit", {
  ip: String,
  hostname: String,
  protocol: String,
  data: Object,
  date: { type: Date, default: Date.now },
});

module.exports = Submit;
