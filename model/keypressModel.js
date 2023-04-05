const mongoose = require("mongoose");

const KeyPress = mongoose.model("KeyPress", {
  ip: String,
  hostname: String,
  protocol: String,
  data: Object,
  date: { type: Date, default: Date.now },
});

module.exports = KeyPress;
