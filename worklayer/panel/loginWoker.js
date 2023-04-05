const Register = require("../../model/registerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const loginUser = Register.findOne({ email: req.body.email }).exec();

  loginUser.then((data) => {
    if (data) {
      bcrypt.compare(req.body.password, data.password).then(function (result) {
        if (result === false) {
          return res.status(401).json({ error: "Password Not Match" });
        } else {
          var token = jwt.sign(
            {
              id: data._id,
              email: req.body.email,
              name: data.name,
              surname: data.surname,
              country: data.country,
              city: data.city,
              phone: data.phone,
              hostname: data.hostname,
            },
            process.env.SECRET
          );
          res.status(200).json({ data: token });
        }
      });
    } else {
      res.status(401).json({
        message: "Unauthorized",
        data: "Kullanıcı adı yada şifre geçersiz",
      });
    }
  });
};
