import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";
import type { StockResponse, Ticker } from "../types/stocks";

const getStock = async (payload: string) => {
  const { data } = await axios.get(
    `https://challenge.capintel.com/v1/stocks/${payload}`
  );
  return data;
};

export const useGetStock = (
  ticker: Ticker
): UseQueryResult<StockResponse, unknown> =>
  useQuery(["stock", ticker], () => getStock(ticker), {
    staleTime: 0,
    select: (res: StockResponse) => {
      let initialInvestment = 10000;
      /**
       * create a new array from the {res.performance}
       * example
       * let initialInvestment = 10000
       * For example, If for the first period of 'AAPL' 2.036, it means it went up by 2.036%. The amount is now: 10 203.60$
       */
      const performance = res.performance.reduce(
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
        ...res,
        performance,
      };
    },
    onError: (err) => err,
  });
