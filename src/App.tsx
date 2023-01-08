import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useGetStock } from './hooks/useGetStocks';
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"

import moment from "moment";

function App(): React.ReactElement {
  const { data } = useGetStock('TSLA');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HighchartsReact highcharts={Highcharts} options={
          {
            chart: {
              marginLeft: 40
            },
            title: {
              text: ''
            },
            xAxis: {
              categories: data?.performance.map(([timestamp]) => moment(timestamp).calendar()),
            },
            yAxis: {
              title: {
                text: 'null'
              }
            }, series: [{ data: data?.performance.slice(0, 5) }]}
          }
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
