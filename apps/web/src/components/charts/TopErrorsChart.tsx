import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TopErrorsChart: React.FC = () => {
  const data = {
    labels: [
      'Connection timeout',
      'Database query failed',
      'Authentication failed',
      'API rate limit exceeded',
      'Memory limit reached',
    ],
    datasets: [
      {
        label: 'Occurrences (24h)',
        data: [42, 38, 27, 21, 18],
        backgroundColor: 'rgba(239, 68, 68, 0.7)', // red
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 32,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(42, 67, 101, 0.9)',
        titleColor: 'rgba(255, 255, 255, 1)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        bodyFont: {
          size: 13,
        },
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TopErrorsChart;