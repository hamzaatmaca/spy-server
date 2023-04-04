const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connection is very Successfull`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = db;
