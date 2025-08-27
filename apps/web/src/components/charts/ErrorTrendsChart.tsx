import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface ErrorTrendsChartProps {
  timeRange: string;
}

const ErrorTrendsChart: React.FC<ErrorTrendsChartProps> = ({ timeRange }) => {
  let labels;
  
  // Adjust labels based on timeRange
  if (timeRange === '24h') {
    labels = Array.from({ length: 12 }, (_, i) => `${i*2}:00`);
  } else if (timeRange === '7d') {
    labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  } else {
    // 30d
    labels = Array.from({ length: 10 }, (_, i) => `Day ${i*3+1}`);
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Critical Errors',
        data: timeRange === '24h' 
          ? [5, 8, 12, 7, 9, 11, 15, 18, 14, 12, 8, 6]
          : timeRange === '7d'
          ? [15, 22, 18, 25, 30, 27, 20]
          : [50, 65, 75, 90, 85, 70, 60, 55, 65, 80],
        borderColor: 'rgba(239, 68, 68, 1)', // red
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Warnings',
        data: timeRange === '24h'
          ? [15, 18, 22, 17, 19, 21, 25, 28, 24, 22, 18, 16]
          : timeRange === '7d'
          ? [45, 62, 58, 65, 70, 67, 50]
          : [150, 165, 175, 190, 185, 170, 160, 155, 165, 180],
        borderColor: 'rgba(245, 158, 11, 1)', // amber
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
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
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return <Line data={data} options={options} />;
};

export default ErrorTrendsChart;