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

interface LogVolumeBySourceChartProps {
  timeRange: string;
}

const LogVolumeBySourceChart: React.FC<LogVolumeBySourceChartProps> = ({ timeRange }) => {
  // In a real app, you'd fetch data based on the timeRange
  
  const data = {
    labels: ['API Server', 'Database', 'Auth Service', 'Worker Service', 'Notification Service', 'Frontend'],
    datasets: [
      {
        label: 'Log Volume',
        data: [1850, 1200, 950, 780, 600, 450],
        backgroundColor: [
          'rgba(13, 148, 136, 0.8)',  // teal
          'rgba(59, 130, 246, 0.8)',  // blue
          'rgba(245, 158, 11, 0.8)',  // amber
          'rgba(239, 68, 68, 0.8)',   // red
          'rgba(16, 185, 129, 0.8)',  // green
          'rgba(99, 102, 241, 0.8)',  // indigo
        ],
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 45,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
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
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
        },
        ticks: {
          stepSize: 500,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default LogVolumeBySourceChart;