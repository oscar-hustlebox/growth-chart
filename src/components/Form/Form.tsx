import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";import { Flex, Select } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import * as yup from "yup";
import { StockResultsType } from '../../hooks/useGetStocks';

const schema = yup.object({
  ticker: yup.string().required(),
  period: yup.number().required(),
}).required();

export const Form = ({ data }: { data: StockResultsType }): React.ReactElement => {
  const { control, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ticker: data.ticker || 'AAPL',
      /* It's setting the default value of the period to the first timestamp in the data. */
      period: moment(data?.performance[0][0] || 0).calendar(),
    }
  });

  const watchAllFields = watch();

  useEffect(() => {
    if (watchAllFields.ticker && watchAllFields.period) {
      // TODO make api call
    }
  }, [watchAllFields]);

  return (
    <form>
      <Flex gap={4}>

      <Controller
        name="ticker"
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
          name="period"
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