const mongoose = require("mongoose");

const Visitors = mongoose.model("Visitors", {
  ip: String,
  hostname: String,
  protocol: String,
  data: Object,
  date: { type: Date, default: Date.now },
});

module.exports = Visitors;
