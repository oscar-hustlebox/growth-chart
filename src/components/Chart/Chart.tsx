import React from 'react';
import { Card } from '@chakra-ui/react';
import { useGetStock } from '../../hooks/useGetStocks';
import { LineChart } from '../LineChart/LineChart';
import { Form } from '../Form/Form';
import type { Ticker } from '../../types/stocks';

const Chart = (): React.ReactElement => {
  const { data } = useGetStock('TSLA' as Ticker);

  if (!data) return <></>;
  return (
    <Card p={4} m={20}>
      <h1>Chart</h1>
      <LineChart data={data} />
      <Form data={data} />
    </Card>
  );
};

export default Chart;
