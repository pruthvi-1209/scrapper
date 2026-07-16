import { Ticker } from "@marketverse/core";

export interface SearchProvider {
  search(query: string): Promise<Ticker[]>;
}