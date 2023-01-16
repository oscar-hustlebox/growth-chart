import React, { ReactElement, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex, Select } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import * as yup from 'yup';
import type { StockResponse, Ticker } from '../../types/stocks';

const schema = yup.object({
  ticker: yup.string().required(),
  period: yup.string().required(),
}).required();

export const Form = ({ data, period, handleFormChange }: {
    data: StockResponse,
    period: number,
    handleFormChange: (t: Ticker, p: number) => void
}): ReactElement => {
  const { control, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ticker: data.ticker,
      /* It's setting the default value of the period to the first timestamp in the data. */
      period: moment(period).calendar() || moment(data.performance[0][0]).calendar(),
    }
  });

  const watchAllFields = watch();

  useEffect(() => {
    handleFormChange(watchAllFields.ticker, watchAllFields.period);
  }, [watchAllFields, handleFormChange])

  return (
    <form>
      <Flex gap={4}>
        <Controller
          name='ticker'
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <option value='AAPL'>Apple</option>
              <option value='AMZN'>Amazon</option>
              <option value='TSLA'>Tesla</option>
            </Select>
          )}
        />
        <Controller
          name='period'
          control={control}
          render={({ field }) => (
            <Select {...field}>
              {data?.performance.map(([timestamp]: any) => <option key={timestamp} value={timestamp}>{moment(timestamp).calendar()}</option>)}
            </Select>
          )}
        />
      </Flex>
    </form>
  );
}
