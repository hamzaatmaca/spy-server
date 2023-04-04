const redisHelper = require("../helper/redisHelper");
const mongoose = require("mongoose");

const Customer = mongoose.model("Customer", {
  customer: String,
});

exports.customers = () => {
  const customer = Customer.find().exec();
  customer.then((res) => {
    redisHelper.setRedis("customers", JSON.stringify(res));
  });
};
