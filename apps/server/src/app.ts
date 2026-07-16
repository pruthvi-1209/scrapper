import express, { type Express } from "express";
import cors from "cors";

import { registerRoutes } from "./routes/index.js";
import { errorMiddleware } from "./middelware/error.middleware.js";
import { notFoundMiddleware } from "./middelware/not-found.middleware.js";

export const createApp = (): Express => {
  const app = express();

  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(express.json());

  app.use(registerRoutes());

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
};
