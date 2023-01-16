import axios from 'axios';
import moment from 'moment';
import { UseQueryResult, useQuery, QueryClient } from 'react-query';
import type { StockResponse, Ticker } from '../types/stocks';
import { calculatePerformance } from '../utils';

const getStockPeriod = async (ticker: Ticker, period: number) => {
  const { data } = await axios.get(
    `https://challenge.capintel.com/v1/stocks/${ticker}`
  );

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

    // use utility function to calculate the performance calculatePerformance()
    const calculatedPerformance = calculatePerformance(performance);

  return { ...data, performance: calculatedPerformance };
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
  });
