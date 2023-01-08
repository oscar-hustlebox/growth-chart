import React from 'react';
import { Card } from '@chakra-ui/react';
import { useGetStock } from '../../hooks/useGetStocks';
import { LineChart } from '../LineChart/LineChart';
import { Form } from '../Form/Form';

const Chart = (): React.ReactElement => {
  const { data } = useGetStock('TSLA');

  return (
    <Card p={4} m={20}>
      <h1>Chart</h1>
      {data ? <LineChart data={data} /> : null}
      <Form data={data} />
    </Card>
  );
};

export default Chart;
