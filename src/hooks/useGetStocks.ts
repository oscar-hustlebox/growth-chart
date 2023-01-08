import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

type PayloadType = string;

const getStock = async (payload: PayloadType) => {
  const { data } = await axios.get(
    `https://challenge.capintel.com/v1/stocks/${payload}`
  );
  return data;
};

export const useGetStock = (
  ticker: "AAPL" | "TSLA" | "AMZN"
): UseQueryResult<
  {
    id: string;
    ticker: string;
    exchange: string;
    companyName: string;
    performance: [number, number][];
  },
  unknown
> =>
  useQuery(["stock", ticker], () => getStock(ticker), {
    staleTime: 0,
    select: (res: {
      id: string;
      ticker: string;
      exchange: string;
      companyName: string;
      performance: [number, number][];
    }) => {
      let initialInvestment = 10000;
      /**
       * create a new array from the {res.performance}
       * example
       * let initialInvestment = 10000
       * For example, If for the first period of 'AAPL' 2.036, it means it went up by 2.036%. The amount is now: 10 203.60$
       */
      console.log("res", res.performance);
      const modfifiedPerformance = res.performance.reduce(
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
        performance: modfifiedPerformance,
      };
    },
    onError: (err) => err,
  });
