const Click = require("../../model/clickModel");
const Keypress = require("../../model/keypressModel");
const Submit = require("../../model/submitModel");
const jwt = require("jsonwebtoken");

exports.getNlpData = (req, res) => {
  const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
  const clickData = Click.find({ hostname: decoded.hostname }).exec();
  const keypressData = Keypress.find({ hostname: decoded.hostname }).exec();
  const submitData = Submit.find({ hostname: decoded.hostname }).exec();

  Promise.all([clickData, keypressData, submitData])
    .then((val) => {
      res.status(200).json({
        data: val,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Failed",
        message: err,
      });
    });
};
