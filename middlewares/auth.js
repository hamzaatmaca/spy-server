const redisHelper = require("../helper/redisHelper");

const auth = (req, res, next) => {
  next();
  /* redisHelper.getRedis("customers").then((param) => {
    if (req.hostname) {
      const customers = JSON.parse(param);

      const isTrue = customers.find((val) => val.customer === req.hostname);

      if (isTrue === undefined) {
        res.status(403).json({
          message: "Unauthorized Request",
        });
      } else {
        next();
      }
    } else {
      res.status(500).json({
        message: "Host is invalid",
      });
    }
  }); */
};

module.exports = auth;
