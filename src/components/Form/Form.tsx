import React from 'react';
import { useForm } from "react-hook-form";
import { Flex, Select } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import * as yup from "yup";

const schema = yup.object({
  ticker: yup.string().required(),
  period: yup.number().required(),
}).required();

export const Form = ({ data }: { data: any }): React.ReactElement => {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={4}>
          <Select value='AAPL'>
            <option value='AAPL'>Apple</option>
            <option value='AMZN'>Amazon</option>
            <option value='TSLA'>Tesla</option>
          </Select>
          <Select placeholder='Select period'>
            {data?.performance.map(([timestamp]: any) => <option key={timestamp} value={timestamp}>{moment(timestamp).calendar()}</option>)}
          </Select>
      </Flex>
    </form>
  );
}