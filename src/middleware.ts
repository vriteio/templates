import Redis from "ioredis";
import { MiddlewareHandler } from "astro";

const redisClient = new Redis(import.meta.env.REDIS_URL);

export const onRequest: MiddlewareHandler = async (context, next) => {
  context.locals.redis = redisClient;

  return await next();
};
