import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "",
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    yAxes: [{
      gridLines: {
        drawBorder: false,
        zeroLineColor: 'transparent'
      },
    }],
    x: {
      border: {
        display: false,
      },
      ticks: {
        display: false,
        drawBorder: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      ticks: {
        display: false,
        beginAtZero: true,
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: '#FF5403',
      tension: 0.1,
      borderWidth: 0.5,
    },
  ],
};

export function LineChart() {
  
  return (
    <>
      <Line options={options} data={data} height={95}  />
      <div className="flex border-t border-gray-200 pt-3 justify-between m-0 p-0">
        <p className='text-grey-soft text-xs'>Apr 1, 2022</p>
        <p className='text-grey-soft text-xs'>Apr 30, 2022</p>
      </div>
    </>
  )
}
