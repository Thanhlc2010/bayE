import Redis from "ioredis";
let redisInstance;
(function setUpRedis() {
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    db: 0,
  });

  redis.on("connect", function () {
    console.log("connected redis success!!!");
  });

  redis.on("error", function (err) {
    console.log("Connected redis Error " + err);
  });
  redisInstance = redis;
})();
export {redisInstance}