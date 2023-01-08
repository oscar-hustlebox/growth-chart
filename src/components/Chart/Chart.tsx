import React from 'react';
import { useGetStock } from '../../hooks/useGetStocks';
import { LineChart } from '../LineChart/LineChart';
import { Form } from '../Form/Form';

const Chart = (): React.ReactElement => {
  const { data } = useGetStock('TSLA');

  return (
    <div>
      <h1>Chart</h1>
      {data ? <LineChart data={data} /> : null}
      <Form />
    </div>
  );
};

export default Chart;
