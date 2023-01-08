import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"

import moment from "moment";
import React from "react";

export const LineChart = ({ data }: {
  data: {
    id: string;
    ticker: string;
    exchange: string;
    companyName: string;
    performance: [number, number][];
  }
}):React.ReactElement => {
  return (
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
  );
};