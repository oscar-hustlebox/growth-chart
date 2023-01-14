export type Ticker = 'AAPL' | 'TSLA' | 'AMZN';

export type StockResponse = {
  id: string;
  ticker: Ticker;
  exchange: string;
  companyName: string;
  performance: [number, number][];
};
