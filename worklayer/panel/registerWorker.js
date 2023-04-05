const Register = require("../../model/registerModel");
const bcrypt = require("bcrypt");

exports.register = (req, res) => {
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    if (err) return res.status(500).json({ error: "Password Not Salted" });

    const userAlreadyExist = await Register.findOne({
      email: req.body.email,
    });

    if (userAlreadyExist) {
      return res.status(500).json({ data: "User Already Exists" });
    } else {
      let userObj = {
        name: req.body.name,
        surname: req.body.surname,
        country: req.body.country,
        city: req.body.city,
        phone: req.body.phone,
        hostname: req.body.hostname,
        password: hash,
        email: req.body.email,
        address: req.body.address,
      };

      await Register.create(userObj)
        .then((user) => {
          return res.status(201).json({
            data: "User Created",
          });
        })
        .catch((err) => {
          return res.status(500).json({ error: err });
        });
    }
  });
};
