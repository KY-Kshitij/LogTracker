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

const SystemHealthChart: React.FC = () => {
  const labels = Array.from({ length: 24 }, (_, i) => i % 3 === 0 ? `${i}:00` : '');

  const data = {
    labels,
    datasets: [
      {
        label: 'CPU Usage',
        data: [
          65, 60, 58, 55, 58, 62, 68, 75, 80, 85, 82, 78,
          74, 70, 68, 65, 62, 60, 62, 68, 72, 75, 70, 66
        ],
        borderColor: 'rgba(16, 185, 129, 1)', // green
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Memory Usage',
        data: [
          40, 42, 45, 47, 50, 52, 55, 58, 60, 62, 65, 68,
          70, 72, 75, 78, 80, 82, 85, 88, 86, 84, 82, 80
        ],
        borderColor: 'rgba(245, 158, 11, 1)', // amber
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Disk I/O',
        data: [
          20, 22, 25, 30, 35, 38, 42, 45, 50, 55, 60, 58,
          55, 50, 45, 40, 38, 35, 30, 28, 25, 22, 20, 18
        ],
        borderColor: 'rgba(59, 130, 246, 1)', // blue
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
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
        max: 100,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
        },
        ticks: {
          callback: (value) => `${value}%`,
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

export default SystemHealthChart;