import axios, { AxiosError } from "axios";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import moment from "moment";
import type { Ticker } from "../types/stocks";

export type PayloadType = {
  ticker: Ticker;
  period: number;
};

const getStockPeriod = async (payload: PayloadType) => {
  const { data } = await axios.get(
    `https://challenge.capintel.com/v1/stocks/${payload.ticker}`
  );
  return data;
};

export const useGetStockPeriod = (): UseMutationResult<
  PayloadType,
  AxiosError,
  PayloadType,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(
    ["stock"],
    (payload: PayloadType) => getStockPeriod(payload),
    {
      onSuccess: (data, { period }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const performance = data.performance.filter(([timestamp]) => {
          // subtract the period by 3 years
          const threeYearPrevious = moment(period)
            .subtract(3, "years")
            .valueOf();
          /**
           * remove timestamp after the period (Unix Timestamp) but not equal to the period
           */
          return (
            (moment(timestamp).isBefore(moment(period)) &&
              moment(timestamp) >= threeYearPrevious) ||
            timestamp === period
          );
        });
        queryClient.setQueryData(["period", data.ticker], {
          ...data,
          performance,
        });
      },
      onError: (err) => console.log("err", err),
    }
  );
};
