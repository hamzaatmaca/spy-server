const mongoose = require("mongoose");

const Submit = mongoose.model("Submit", {
  ip: String,
  hostname: String,
  protocol: String,
  data: Object,
  date: { type: Date, default: Date.now },
});

const saveSubmitEvents = (req, res) => {
  try {
    const payload = {
      ip: req.ip,
      hostname: req.hostname,
      protocol: req.protocol,
      data: req.body,
    };

    const submit = new Submit(payload);
    submit.save().then(() => {
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
  saveSubmitEvents,
};
