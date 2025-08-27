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

interface ResourceUsageChartProps {
  timeRange: string;
}

const ResourceUsageChart: React.FC<ResourceUsageChartProps> = ({ timeRange }) => {
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
        label: 'API Server',
        data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 40) + 60),
        borderColor: 'rgba(13, 148, 136, 1)', // teal
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
        tension: 0.4,
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Database',
        data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 40) + 50),
        borderColor: 'rgba(59, 130, 246, 1)', // blue
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Worker Service',
        data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 40) + 40),
        borderColor: 'rgba(245, 158, 11, 1)', // amber
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: false,
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
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            return `${label}: ${value}% CPU`;
          }
        }
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

export default ResourceUsageChart;