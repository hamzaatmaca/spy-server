const Visitors = require("../../model/visitorModel");
const jwtParser = require("../../helper/jwtParser");
const {
  locationFinder,
} = require("../../helper/locationFinder/locationFinder");

exports.visitors = (req, res) => {
  try {
    const payload = {
      ip: req.ip,
      hostname: req.hostname,
      protocol: req.protocol,
      data: req.body,
    };

    const visitors = Visitors(payload);
    visitors.save().then(() => {
      res.status(200).json({ msg: "log saved" });
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed",
      err: error,
    });
  }
};

exports.getVisitors = (req, res) => {
  const decoded = jwtParser(req);
  const visitors = Visitors.find({ hostname: decoded.hostname }).exec();

  visitors
    .then((val) => {
      locationFinder(val).then((loc) => {
        const responseData = val.map((i) => {
          return { date: i.date, location: loc };
        });

        res.status(200).json({
          message: "Visitors",
          data: responseData,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Visitors Error",
        error: err,
      });
    });
};
