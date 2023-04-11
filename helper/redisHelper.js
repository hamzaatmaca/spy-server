const redis = require("redis");
const client = redis.createClient();

class RedisHelper {
  constructor() {
    client.on("error", (error) => {
      console.log(error);
    });

    /* client.connect(); */
  }

  setRedis(key, value) {
    client.set(key, value, (error, message) => {
      if (error) return error;
      return message;
    });
  }
  getRedis(key) {
    return client.get(key);
  }
}

const redisHelper = new RedisHelper();

module.exports = redisHelper;
