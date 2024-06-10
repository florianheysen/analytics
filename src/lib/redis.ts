import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://funny-boxer-54682.upstash.io",
  token: process.env.REDIS_KEY!,
});
