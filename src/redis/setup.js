import Redis from "ioredis";
let redisInstance;
(function setUpRedis() {
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    db: 0,
    maxRetriesPerRequest: 50, // Increase this limit
    retryStrategy: (times) => {
      if (times > 50) {
        // Stop retrying after 50 attempts
        return null;
      }
      // Delay between retries (e.g., 100ms, increasing exponentially)
      return Math.min(times * 100, 3000);
    },
  });

  redis.on("connect", function () {
    console.log("connected redis success!!!");
  });

  redis.on("error", function (err) {
    // console.log("Connected redis Error " + err);
  });
  redisInstance = redis;
})();
export {redisInstance}