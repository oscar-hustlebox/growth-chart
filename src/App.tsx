import React from 'react';
import './App.css';
import { ChartView } from './components/Chart';
import { ChakraProvider } from '@chakra-ui/react'

function App(): React.ReactElement {
  return (
    <ChakraProvider>
      <ChartView />
    </ChakraProvider>
  );
}

export default App;
