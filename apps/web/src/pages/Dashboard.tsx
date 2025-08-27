import React, { useEffect, useState } from "react";
import { AlertTriangle, Server, FileText, Activity } from "lucide-react";
import LogVolumeChart from "../components/charts/LogVolumeChart";
import SeverityDistributionChart from "../components/charts/SeverityDistributionChart";
import TopErrorsChart from "../components/charts/TopErrorsChart";
import SystemHealthChart from "../components/charts/SystemHealthChart";
import { useMockLogs } from "../hooks/useMockLogs";

const Dashboard: React.FC = () => {
  const { logs, todayLogs, errorCount } = useMockLogs();

  const [analysis, setAnalysis] = useState({
    totalLogsToday: 0,
    successCount: 0,
    activeServers: 0,
    activeAlerts: 0,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // ✅ Fetch analysis on mount and refresh every 30 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsRefreshing(true);
        const res = await fetch("http://localhost:4000/data");
        const data = await res.json();
        console.log('Dashboard data updated:', data);
        
        setAnalysis(data);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Error fetching analysis:", err);
        // Fallback to mock data if API is not available
        setAnalysis({
          totalLogsToday: todayLogs.length,
          successCount: todayLogs.filter(log => log.severity === 'info').length,
          activeServers: 3,
          activeAlerts: errorCount,
        });
        setLastUpdated(new Date());
      } finally {
        setIsRefreshing(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for periodic updates
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [todayLogs.length, errorCount]);

  // Manual refresh function
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch("http://localhost:4000/data");
      const data = await res.json();
      console.log('Dashboard data manually refreshed:', data);
      
      setAnalysis(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error refreshing analysis:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const metrics = [
    {
      name: "Files Uploaded Today",
      value: analysis.totalLogsToday,
      change: analysis.totalLogsToday > 0 ? `+${analysis.totalLogsToday}` : "0",
      icon: <FileText size={20} className="text-blue-500" />,
      trend: analysis.totalLogsToday > 0 ? "up" : "neutral",
    },
    {
      name: "Total Files Uploaded",
      value: analysis.successCount,
      change: analysis.successCount > 0 ? `+${analysis.successCount}` : "0",
      icon: <Server size={20} className="text-green-500" />,
      trend: analysis.successCount > 0 ? "up" : "neutral",
    },
    {
      name: "Active Server",
      value: analysis.activeServers,
      change: "1",
      icon: <Server size={20} className="text-purple-500" />,
      trend: "neutral",
    },
    {
      name: "File Types",
      value: analysis.activeAlerts,
      change: analysis.activeAlerts > 0 ? `+${analysis.activeAlerts}` : "0",
      icon: <Activity size={20} className="text-amber-500" />,
      trend: analysis.activeAlerts > 0 ? "up" : "neutral",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of your system status and metrics
            {lastUpdated && (
              <span className="ml-2 text-xs text-slate-400">
                • Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isRefreshing
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {metric.name}
                </p>
                <p className="mt-2 text-3xl font-bold">{metric.value}</p>
                <div
                  className={`mt-1 inline-flex items-center text-xs font-medium
                    ${
                      metric.trend === "up"
                        ? "text-red-600"
                        : metric.trend === "down"
                        ? "text-green-600"
                        : "text-slate-600"
                    }
                  `}
                >
                  {metric.change}
                </div>
              </div>
              <div className="rounded-full bg-slate-100 p-3">{metric.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">
            Log Volume (7 days)
          </h2>
          <div className="h-72">
            <LogVolumeChart />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">
            Severity Distribution
          </h2>
          <div className="h-72">
            <SeverityDistributionChart />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">
            Top Errors (24h)
          </h2>
          <div className="h-72">
            <TopErrorsChart />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-slate-800">
            System Health
          </h2>
          <div className="h-72">
            <SystemHealthChart />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-slate-800">
            Recent Activity
          </h2>
          <button className="text-sm text-teal-600 hover:text-teal-700">
            View all
          </button>
        </div>
        <div className="divide-y divide-slate-200">
          {logs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-3">
              <div className="flex items-start">
                <span
                  className={`mr-3 mt-0.5 h-2 w-2 flex-shrink-0 rounded-full ${
                    log.severity === "error"
                      ? "bg-red-500"
                      : log.severity === "warning"
                      ? "bg-amber-500"
                      : log.severity === "info"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">
                    {log.message}
                  </p>
                  <div className="mt-1 flex items-center">
                    <p className="text-xs text-slate-500">
                      {log.timestamp.toLocaleTimeString()} • {log.source}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
