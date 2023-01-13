import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";
import type { StockResponse, Ticker } from "../types/stocks";

const getStock = async (ticker: string) => {
  const { data } = await axios.get(
    `https://challenge.capintel.com/v1/stocks/${ticker}`
  );
  return data;
};

export const useGetStock = (
  ticker: Ticker,
  period?: string
): UseQueryResult<StockResponse, unknown> =>
  useQuery({
    queryKey: ["stock", ticker, period],
    queryFn: () => getStock(ticker),
    staleTime: 0, // 0 means the data will never be stale
    enabled: !!ticker, // only fetch if ticker is defined
    select: (data: StockResponse) => {
      let initialInvestment = 10000;
      /**
       * @description
       * The performance array is an array of arrays. Each array contains the timestamp and the price growth.
       * The price growth is the percentage of growth of the stock price.
       * The performance array is sorted by timestamp.
       * @example
       * let initialInvestment = 10000
       * For example, If for the first period of 'AAPL' 2.036, it means it went up by 2.036%. The amount is now: 10 203.60$
       */
      const performance = data.performance.reduce(
        (acc, [timestamp, priceGrowth]) => {
          const initialAmount = (initialInvestment * priceGrowth) / 100; // 2.036
          initialInvestment = initialAmount + initialInvestment;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          /* @ts-ignore to-fix */
          acc.push([...[new Date(timestamp).toISOString(), initialInvestment]]);
          return acc;
        },
        []
      );
      return {
        ...data,
        performance,
      };
    },
    onError: (err) => err,
  });
