import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SeverityDistributionChart: React.FC = () => {
  const data = {
    labels: ['Critical', 'Error', 'Warning', 'Info', 'Debug'],
    datasets: [
      {
        data: [120, 450, 780, 2300, 950],
        backgroundColor: [
          'rgba(239, 68, 68, 1)',   // Critical - red
          'rgba(248, 113, 113, 1)', // Error - lighter red
          'rgba(245, 158, 11, 1)',  // Warning - amber
          'rgba(59, 130, 246, 1)',  // Info - blue
          'rgba(156, 163, 175, 1)', // Debug - gray
        ],
        borderColor: [
          'rgba(239, 68, 68, 0.5)',
          'rgba(248, 113, 113, 0.5)',
          'rgba(245, 158, 11, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(156, 163, 175, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 15,
        },
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
    cutout: '70%',
  };

  return <Doughnut data={data} options={options} />;
};

export default SeverityDistributionChart;