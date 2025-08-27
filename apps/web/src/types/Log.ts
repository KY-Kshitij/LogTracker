export type LogSeverity = 'critical' | 'error' | 'warning' | 'info' | 'debug';

export interface Log {
  id: string;
  timestamp: Date;
  message: string;
  severity: string;
  source: string;
  metadata?: Record<string, any>;
}

export interface LogFiltersType {
  severity: LogSeverity[];
  source: string[];
  timeRange: string;
}