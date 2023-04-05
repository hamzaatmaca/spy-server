const jwt = require("jsonwebtoken");

const jwtParser = (req) => {
  return (decoded = jwt.verify(req.headers.authorization, process.env.SECRET));
};

module.exports = jwtParser;
