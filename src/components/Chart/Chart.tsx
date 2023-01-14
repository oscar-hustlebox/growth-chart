import React, { ReactElement } from 'react';
import { Card, Flex, Heading } from '@chakra-ui/react';
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
    <>
    <Heading as="h1" size="2xl" textAlign="center" p={8} color="white">CAPINTEL CHALLENGE</Heading>
    <Flex alignItems="center" justifyContent="space-between" mx={20}>
        <Heading as="h2" size="xl" pb={8} color="white">Growth of $10,000</Heading>
        <Heading as="h2" size="xl" pb={8} color="white">{stockData.ticker}:{stockData.exchange}</Heading>
    </Flex>
    <Card p={8} pt={10} mx={20} bgColor="white" boxShadow="2xl">
      <LineChart data={stockPeriodData?.performance.length ? stockPeriodData : stockData} />
      <Form data={stockData} handleFormChange={handleFormChange} />
    </Card>
    </>
  );
};

export default Chart;
