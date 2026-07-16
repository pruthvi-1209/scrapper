export interface Ticker {
  symbol: string;
  exchange: "NSE" | "BSE";
  companyName: string;
  isin?: string;
  sector?: string;
  industry?: string;
}