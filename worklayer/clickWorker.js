const mongoose = require("mongoose");

const Click = mongoose.model("Click", {
  ip: String,
  hostname: String,
  protocol: String,
  data: Object,
  date: { type: Date, default: Date.now },
});

const saveClickEvents = (req, res) => {
  try {
    const payload = {
      ip: req.ip,
      hostname: req.hostname,
      protocol: req.protocol,
      data: req.body,
    };

    const click = new Click(payload);
    click.save().then(() => {
      res.status(200).json({ msg: "log saved" });
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed",
      err: error,
    });
  }
};

module.exports = {
  saveClickEvents,
};
