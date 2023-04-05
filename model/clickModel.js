const mongoose = require("mongoose");

const Click = mongoose.model("Click", {
  ip: String,
  hostname: String,
  protocol: String,
  data: Object,
  date: { type: Date, default: Date.now },
});

module.exports = Click;
