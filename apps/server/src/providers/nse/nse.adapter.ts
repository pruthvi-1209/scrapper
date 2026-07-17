import type { Ticker, Quote } from "@marketverse/core";

import { QUOTE_EQUITY, SEARCH } from "./constants/nse-endpoints.js";
import { NSEClientError } from "./errors/NSEClientError.js";
import { NSEClient } from "./nse.client.js";

interface NseSearchResponseShape {
  data?: unknown;
  result?: unknown;
  symbols?: unknown;
  entries?: unknown;
}

export class NSEAdapter {
  constructor(private readonly client: NSEClient = new NSEClient()) {}

  public async search(query: string): Promise<Ticker[]> {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      return [];
    }

    const endpoint = `${SEARCH}?symbol=${encodeURIComponent(normalizedQuery)}`;

    try {
      const response = await this.client.get<unknown>(endpoint);
      const items = this.extractItems(response);

      return items
        .map((item) => this.mapTicker(item))
        .filter((ticker): ticker is Ticker => ticker !== null);
    } catch (error) {
      if (error instanceof NSEClientError) {
        throw error;
      }

      throw new NSEClientError(
        `Failed to search tickers for "${normalizedQuery}"`,
        endpoint,
        undefined,
        error,
      );
    }
  }

  private extractItems(response: unknown): unknown[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (response && typeof response === "object") {
      const payload = response as NseSearchResponseShape;

      if (Array.isArray(payload.data)) {
        return payload.data;
      }

      if (Array.isArray(payload.result)) {
        return payload.result;
      }

      if (Array.isArray(payload.symbols)) {
        return payload.symbols;
      }

      if (Array.isArray(payload.entries)) {
        return payload.entries;
      }
    }

    return [];
  }

  private mapTicker(item: unknown): Ticker | null {
    if (!item || typeof item !== "object") {
      return null;
    }

    const record = item as Record<string, unknown>;
    const symbol = this.readString(record.symbol ?? record.Symbol ?? record.symbolName ?? record.name);

    if (!symbol) {
      return null;
    }

    return {
      symbol,
      exchange: "NSE",
      companyName: this.readString(record.companyName ?? record.company ?? record.name) ?? symbol,
      isin: this.readString(record.isin ?? record.ISIN),
      sector: this.readString(record.sector),
      industry: this.readString(record.industry),
    };
  }

  private readString(value: unknown): string | undefined {
    if (typeof value === "string") {
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    }

    return undefined;
  }

  public async getQuote(symbol: string): Promise<Quote> {
  const endpoint = `${QUOTE_EQUITY}?symbol=${encodeURIComponent(symbol)}`;

  const response = await this.client.get<any>(endpoint);

  return {
    symbol: response.info.symbol,
    companyName: response.info.companyName,
    price: response.priceInfo.lastPrice,
    previousClose: response.priceInfo.previousClose,
    change: response.priceInfo.change,
    changePercent: response.priceInfo.pChange,
    open: response.priceInfo.open,
    high: response.priceInfo.intraDayHighLow.max,
    low: response.priceInfo.intraDayHighLow.min,
  };
}
}
