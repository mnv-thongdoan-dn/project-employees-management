import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart Employees',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'New Employees',
      data: [12, 20, 8, 4, 32, 17, 24, 3, 5, 9, 10, 15],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Employees Out',
      data: [8, 10, 2, 5, 6, 21, 30, 16, 7, 9, 13, 9],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

 const Chart = () => {
  return <Bar options={options} data={data} />;
}

export default Chart;
