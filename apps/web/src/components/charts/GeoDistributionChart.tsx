import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GeoDistributionChart: React.FC = () => {
  const data = {
    labels: ['North America', 'Europe', 'Asia', 'South America', 'Australia', 'Africa'],
    datasets: [
      {
        data: [45, 25, 18, 6, 4, 2],
        backgroundColor: [
          'rgba(13, 148, 136, 0.8)',  // teal
          'rgba(59, 130, 246, 0.8)',  // blue
          'rgba(245, 158, 11, 0.8)',  // amber
          'rgba(239, 68, 68, 0.8)',   // red
          'rgba(16, 185, 129, 0.8)',  // green
          'rgba(99, 102, 241, 0.8)',  // indigo
        ],
        borderColor: [
          'rgba(13, 148, 136, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(99, 102, 241, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
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
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw as number;
            const percentage = value + '%';
            return `${label}: ${percentage}`;
          }
        }
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default GeoDistributionChart;