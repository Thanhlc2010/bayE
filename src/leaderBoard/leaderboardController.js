import { redisInstance } from "../redis/setup.js";
import {io} from '../ws.js'
async function getLeaderBoard(req, res) {
  const { id = 1 } = req.param;
  const { limit = 10 } = req.query;

  const result = await redisInstance.zrange(`auction_scores_${id}`, 0, limit, "REV", "WITHSCORES");
  const resultObj = []
  for (let i = 0; i < result.length; i+=2) {
    const timestamp = await redisInstance.hget(`auction_timestamps_${id}`, result[i]);

    const newObj = {
      id: Math.ceil((i + 1) /2),
      name: result[i],
      bid: result[i + 1],
      timestamp: timestamp
    }
    resultObj.push(newObj);
  }
  return res.send({ message: resultObj });
}
async function updateLeaderBoard(req, res) {
  const { id } = req.params;

  const { name, bid } = req.body;
  const currentTimestamp = Date.now();
  await redisInstance.zadd(`auction_scores_${id}`, bid, name);
  await redisInstance.hset(`auction_timestamps_${id}`, name, currentTimestamp);

  const result = await redisInstance.zrange(`auction_scores_${id}`, 0, 10, "REV", "WITHSCORES");
  const resultObj = []
  for (let i = 0; i < result.length; i+=2) {
    const timestamp = await redisInstance.hget(`auction_timestamps_${id}`, result[i]);

    const newObj = {
      id: Math.ceil((i + 1) /2),
      name: result[i],
      bid: result[i + 1],
      timestamp: timestamp 
    }
    resultObj.push(newObj);
  }

  const check = io.emit("leaderboard", resultObj);
  console.log({check})
  return res.send({ message: "Added Successfully" });
}
export { getLeaderBoard, updateLeaderBoard };
