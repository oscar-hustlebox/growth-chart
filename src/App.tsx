import React from 'react';
import './App.css';
import { ChartView } from './components/Chart';
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from 'react-query';

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: 'purple.700',
      },
    })
  },
})

const queryClient = new QueryClient()

function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ChartView />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
