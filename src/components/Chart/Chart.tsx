import React, { ReactElement } from 'react';
import { Card } from '@chakra-ui/react';
import { useGetStock } from '../../hooks/useGetStock';
import { LineChart } from '../LineChart/LineChart';
import { Form } from '../Form/Form';
import type { Ticker } from '../../types/stocks';
import { useGetStockPeriod } from '../../hooks/useGetPeriodStock';

const Chart = (): ReactElement => {
  const [ticker, setTicker] = React.useState<Ticker>('AAPL');
  const [period, setPeriod] = React.useState<number>(0);
  const { data: stockData } = useGetStock(ticker as Ticker);
  const { data: stockPeriodData } = useGetStockPeriod(ticker, period);

  const handleFormChange = (stockTicker: Ticker, periodMax: number) => {
    setTicker(stockTicker);
    setPeriod(periodMax);
  }

  if (!stockData) return <></>;
  return (
    <Card p={8} pt={10} m={20}>
      <LineChart data={stockPeriodData?.performance.length ? stockPeriodData : stockData} />
      <Form data={stockData} handleFormChange={handleFormChange} />
    </Card>
  );
};

export default Chart;
