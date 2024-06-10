import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://good-kangaroo-54679.upstash.io",
  token: process.env.REDIS_KEY!,
});
