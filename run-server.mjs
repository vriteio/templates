import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import fastifyEnv from "@fastify/env";
import fastifyRedis from "@fastify/redis";
import { fileURLToPath } from "node:url";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const runServer = async () => {
  const app = Fastify({ logger: true });

  await app
    .register(fastifyEnv, {
      dotenv: true,
      schema: {
        type: "object",
        required: ["PORT", "REDIS_URL"],
        properties: {
          PORT: {
            type: "string",
            default: 3000,
          },
          HOST: {
            type: "string",
            default: "localhost",
          },
          REDIS_URL: {
            type: "string",
            default: "redis://localhost",
          },
        },
      },
    })
    .register(fastifyStatic, {
      root: fileURLToPath(new URL("./dist/client", import.meta.url)),
    })
    .register(fastifyMiddie);

  await app.register(fastifyRedis, {
    url: app.config.REDIS_URL,
  });
  app.use((req, res, next) => {
    const locals = {
      redis: app.redis,
    };

    ssrHandler(req, res, next, locals);
  });

  app.listen({ host: app.config.HOST, port: app.config.PORT });
};

runServer();
