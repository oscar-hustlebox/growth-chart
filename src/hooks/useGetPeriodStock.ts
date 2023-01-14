import axios from 'axios';
import moment from 'moment';
import { UseQueryResult, useQuery, QueryClient } from 'react-query';
import type { StockResponse, Ticker } from '../types/stocks';

const getStockPeriod = async (ticker: Ticker, period: number) => {
  const { data } = await axios.get(
    `https://challenge.capintel.com/v1/stocks/${ticker}`
  );
  let initialInvestment = 10000;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const performance = data.performance
    .filter(([timestamp]: any) => {
      // subtract the period by 3 years
      const threeYearPrevious = moment(period).subtract(3, 'years').valueOf();
      /**
       * filter out timestamps after the period (Unix Timestamp) but not equal to the period
       */
      return (
        (moment(timestamp) <= moment(period) &&
          moment(timestamp) !== threeYearPrevious) ||
        moment(timestamp) === moment(period)
      );
    })
    .reduce((acc: any, [timestamp, priceGrowth]: any) => {
      const initialAmount = (initialInvestment * priceGrowth) / 100; // 2.036
      initialInvestment = initialAmount + initialInvestment;
      acc.push([...[new Date(timestamp).toISOString(), initialInvestment]]); // 2021-01-01T00:00:00.000Z, 10203.6
      return acc;
    }, []);

  return { ...data, performance };
};

const queryClient = new QueryClient();
export const useGetStockPeriod = (
  ticker: Ticker,
  period: number
): UseQueryResult<StockResponse, unknown> =>
  useQuery({
    queryKey: ['stock', ticker, period],
    queryFn: () => getStockPeriod(ticker, period),
    staleTime: 0, // 0 means the data will never be stale
    enabled: !!ticker && !!period, // only fetch if ticker is defined
    onError: (err) => err,
    onSuccess: () => {
      queryClient.invalidateQueries(['stock', ticker]); // invalidate the previous query
    },
  });
