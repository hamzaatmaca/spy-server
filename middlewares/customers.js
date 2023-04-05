const Customer = require("../model/customerModel");
const redisHelper = require("../helper/redisHelper");

exports.customers = () => {
  const customer = Customer.find().exec();
  customer.then((res) => {
    redisHelper.setRedis("customers", JSON.stringify(res));
  });
};
