import { Router, type Request, type Response } from "express";

interface HealthResponse {
  status: "ok";
  service: string;
  version: string;
}

const HEALTH_RESPONSE: HealthResponse = {
  status: "ok",
  service: "MarketVerse Server",
  version: "0.1.0",
};

export const healthRouter = Router();

healthRouter.get("/health", (_req: Request, res: Response<HealthResponse>): void => {
  res.status(200).json(HEALTH_RESPONSE);
});
