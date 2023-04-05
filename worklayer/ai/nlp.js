const Click = require("../../model/clickModel");
const Keypress = require("../../model/keypressModel");
const Submit = require("../../model/submitModel");

exports.getNlpData = (req, res) => {
  const clickData = Click.find().exec();
  const keypressData = Keypress.find().exec();
  const submitData = Submit.find().exec();

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
