import React, { useState } from 'react';
import { useMockLogs } from '../hooks/useMockLogs';
import LogTable from '../components/logs/LogTable';
import LogFilters from '../components/logs/LogFilters';
import LogSearch from '../components/logs/LogSearch';
import { Log, LogSeverity, LogFiltersType } from '../types/Log';
import { Calendar, Download, Filter, MoreHorizontal, RefreshCw } from 'lucide-react';

const LogExplorer: React.FC = () => {
  const { logs, isLoading, refresh } = useMockLogs();
  const [filteredLogs, setFilteredLogs] = useState<Log[]>(logs);
  const [activeFilters, setActiveFilters] = useState<LogFiltersType>({
    severity: [],
    source: [],
    timeRange: '24h',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Apply filters and search
  React.useEffect(() => {
    let result = [...logs];
    
    // Apply severity filter
    if (activeFilters.severity.length > 0) {
      result = result.filter((log) => 
        activeFilters.severity.includes(log.severity as LogSeverity)
      );
    }
    
    // Apply source filter
    if (activeFilters.source.length > 0) {
      result = result.filter((log) => 
        activeFilters.source.includes(log.source)
      );
    }
    
    // Apply time range filter
    if (activeFilters.timeRange) {
      const now = new Date();
      let cutoff = new Date();
      
      switch (activeFilters.timeRange) {
        case '1h':
          cutoff.setHours(now.getHours() - 1);
          break;
        case '6h':
          cutoff.setHours(now.getHours() - 6);
          break;
        case '24h':
          cutoff.setDate(now.getDate() - 1);
          break;
        case '7d':
          cutoff.setDate(now.getDate() - 7);
          break;
        case '30d':
          cutoff.setDate(now.getDate() - 30);
          break;
      }
      
      result = result.filter((log) => log.timestamp >= cutoff);
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (log) => 
          log.message.toLowerCase().includes(query) || 
          log.source.toLowerCase().includes(query)
      );
    }
    
    setFilteredLogs(result);
  }, [logs, activeFilters, searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Log Explorer</h1>
        <p className="mt-1 text-sm text-slate-500">Search, filter, and analyze logs from all sources</p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <LogSearch value={searchQuery} onChange={setSearchQuery} />
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              onClick={() => refresh()}
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </button>
            
            <button className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              <Calendar size={16} className="mr-2" />
              Custom Range
            </button>
            
            <button className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              <Download size={16} className="mr-2" />
              Export
            </button>
            
            <button className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <Filter size={16} className="mr-2 text-slate-500" />
          <span className="mr-3 text-sm font-medium text-slate-700">Filters:</span>
          <LogFilters 
            activeFilters={activeFilters} 
            onChange={setActiveFilters} 
            logs={logs}
          />
        </div>

        <LogTable logs={filteredLogs} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default LogExplorer;