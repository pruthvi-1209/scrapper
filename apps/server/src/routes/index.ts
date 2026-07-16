import { Router } from "express";

import { healthRouter } from "./health.route.js";

export const registerRoutes = (): Router => {
  const router = Router();

  router.use(healthRouter);

  return router;
};
