import axios from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import type { StockResponse, Ticker } from '../types/stocks';
import { calculatePerformance } from '../utils';

const getStock = async (ticker: string) => {
  const { data } = await axios.get(
    `https://challenge.capintel.com/v1/stocks/${ticker}`
  );
  return data;
};

export const useGetStock = (
  ticker: Ticker
): UseQueryResult<StockResponse, unknown> =>
  useQuery({
    queryKey: ['stock', ticker],
    queryFn: () => getStock(ticker),
    staleTime: 0, // 0 means the data will never be stale
    enabled: !!ticker, // only fetch if ticker is defined
    select: (data: StockResponse) => {
      const performance = calculatePerformance(data.performance);
      return {
        ...data,
        performance,
      };
    },
    onError: (err) => err,
  });
