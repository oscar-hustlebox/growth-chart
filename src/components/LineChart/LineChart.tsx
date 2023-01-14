import React, { ReactElement } from "react";
import moment from "moment";
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"

import type { StockResponse } from "../../types/stocks";

type LineChartProps =  {
  data: StockResponse
};

export const LineChart = ({ data }: LineChartProps):ReactElement => (
  <HighchartsReact
    highcharts={Highcharts}
    options={
      {
        chart: {
            marginLeft: 70,
            credits: {
                enabled: false,
                text: '',
            }
        },
        title: {
            display: false,
            text: null,
          },
          subtitle: {
            text: null,
        },
        xAxis: {
            categories: data?.performance.map(([timestamp]) => moment(timestamp).calendar()),
            title: {
                text: 'Date (MM/DD/YYYY)'
            }
        },
        yAxis: {
            title: {
                text: 'Growth ($)',
            },
        },
        legend: {
            enabled: false
        },
        series: [
            { data: data?.performance }
        ],
      }
    }
  />
);