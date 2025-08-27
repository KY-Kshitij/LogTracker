import React, { useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import LogVolumeBySourceChart from '../components/charts/LogVolumeBySourceChart';
import ErrorTrendsChart from '../components/charts/ErrorTrendsChart';
import GeoDistributionChart from '../components/charts/GeoDistributionChart';
import ResourceUsageChart from '../components/charts/ResourceUsageChart';
import { useMockLogs } from '../hooks/useMockLogs';

const timeRanges = [
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Custom Range', value: 'custom' },
];

const Analytics: React.FC = () => {
  const { logs } = useMockLogs();
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Analytics & Reports</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gain insights into your log data and system performance
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="inline-flex rounded-md shadow-sm">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                type="button"
                className={`relative inline-flex items-center border px-3 py-2 text-sm font-medium ${
                  timeRange === range.value
                    ? 'z-10 bg-teal-50 border-teal-500 text-teal-600'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                } ${
                  range.value === timeRanges[0].value
                    ? 'rounded-l-md'
                    : range.value === timeRanges[timeRanges.length - 1].value
                    ? 'rounded-r-md'
                    : ''
                }`}
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </button>
            ))}
          </div>

          <button className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Calendar size={16} className="mr-2" />
            Select dates
          </button>

          <button className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Download size={16} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">Log Volume by Source</h2>
          <div className="h-80">
            <LogVolumeBySourceChart timeRange={timeRange} />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">Error Trends</h2>
          <div className="h-80">
            <ErrorTrendsChart timeRange={timeRange} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">Geographical Distribution</h2>
          <div className="h-80">
            <GeoDistributionChart />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">Resource Usage</h2>
          <div className="h-80">
            <ResourceUsageChart timeRange={timeRange} />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-medium text-slate-800">Top Log Patterns</h2>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">
                  Pattern
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  Occurrences
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  First Seen
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  Last Seen
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  Primary Source
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="font-medium text-slate-900">Connection timed out</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">1,245</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">3 days ago</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">2 hours ago</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">API Server</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="font-medium text-slate-900">Database query failed</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">876</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">5 days ago</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">1 day ago</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">Database</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="font-medium text-slate-900">Authentication failed</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">652</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">7 days ago</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">3 hours ago</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">Auth Service</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="font-medium text-slate-900">Memory limit exceeded</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">321</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">4 days ago</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">12 hours ago</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">Worker Service</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="font-medium text-slate-900">Request throttled</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">298</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">2 days ago</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">5 hours ago</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">API Gateway</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;