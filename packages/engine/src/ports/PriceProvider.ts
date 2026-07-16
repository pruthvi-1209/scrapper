import {
  Quote,
  PriceCandle,
  TimeInterval,
} from "@marketverse/core";

export interface PriceProvider {
  getQuote(symbol: string): Promise<Quote>;

  getHistory(
    symbol: string,
    interval: TimeInterval
  ): Promise<PriceCandle[]>;
}