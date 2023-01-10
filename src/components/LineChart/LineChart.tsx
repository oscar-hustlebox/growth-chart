import React from "react";
import moment from "moment";
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"

import type { StockResponse } from "../../types/stocks";

export const LineChart = ({ data }: {
  data: StockResponse
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
        }, series: [{ data: data?.performance }]}
      }
    />
  );
};