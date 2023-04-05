const Register = require("../../model/registerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const loginUser = Register.findOne({ email: req.body.email });
  console.log(loginUser);
  if (loginUser) {
    bcrypt
      .compare(req.body.password, loginUser.password)
      .then(function (result) {
        if (result === false) {
          return res.status(401).json({ error: "Password Not Match" });
        } else {
          var token = jwt.sign(
            {
              id: loginUser._id,
              email: req.body.email,
              name: loginUser.name,
              surname: loginUser.surname,
              country: loginUser.country,
              city: loginUser.city,
              phone: loginUser.phone,
              hostname: loginUser.hostname,
            },
            process.env.SECRET
          );
          res.status(200).json({ data: token });
        }
      });
  }
};
