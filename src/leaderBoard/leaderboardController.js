import { redisInstance } from "../redis/setup.js";
import { io } from "../ws.js";
async function getLeaderBoard(req, res) {
  const { id } = req.params;
  const { limit = 10 } = req.query;

  const result = await redisInstance.zrange(`auction_scores_${id}`, 0, limit, "REV", "WITHSCORES");
  const resultObj = [];
  for (let i = 0; i < result.length; i += 2) {
    const timestamp = await redisInstance.hget(`auction_timestamps_${id}`, result[i]);
    const pictures = await redisInstance.hget(`auction_bidder_pictures_${id}`, result[i]);
    const name = await redisInstance.hget(`auction_users_${id}`, result[i]);

    const newObj = {
      id: Math.ceil((i + 1) / 2),
      name: name,
      bid: result[i + 1],
      timestamp: timestamp,
      pictures: pictures,
    };
    resultObj.push(newObj);
  }
  return res.send({ message: resultObj });
}
async function updateLeaderBoard(req, res) {
  const { id } = req.params;

  const { name, bid, profilePicture, userId } = req.body;
  const currentTimestamp = Date.now();
  await redisInstance.zadd(`auction_scores_${id}`, bid, userId);
  await redisInstance.hset(`auction_timestamps_${id}`, userId, currentTimestamp);
  await redisInstance.hset(`auction_bidder_pictures_${id}`, userId, profilePicture);
  await redisInstance.hset(`auction_users_${id}`, userId, name);

  const result = await redisInstance.zrange(`auction_scores_${id}`, 0, 10, "REV", "WITHSCORES");
  const resultObj = [];
  for (let i = 0; i < result.length; i += 2) {
    const timestamp = await redisInstance.hget(`auction_timestamps_${id}`, result[i]);
    const pictures = await redisInstance.hget(`auction_bidder_pictures_${id}`, result[i]);
    const name = await redisInstance.hget(`auction_users_${id}`, result[i]);

    const newObj = {
      id: Math.ceil((i + 1) / 2),
      name: name,
      bid: result[i + 1],
      timestamp: timestamp,
      picture: pictures,
    };
    resultObj.push(newObj);
  }

  io.emit("leaderboard", resultObj);

  return res.send({ message: "Added Successfully" });
}
export { getLeaderBoard, updateLeaderBoard };
