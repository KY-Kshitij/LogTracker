import { useState, useEffect } from 'react';
import { Log } from '../types/Log';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Generate a random date within the last 7 days
const generateDate = (): Date => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 7);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  
  now.setDate(now.getDate() - daysAgo);
  now.setHours(now.getHours() - hoursAgo);
  now.setMinutes(now.getMinutes() - minutesAgo);
  
  return now;
};

// Sample log sources
const sources = [
  'API Server',
  'Database',
  'Auth Service',
  'Worker Service',
  'Frontend',
  'Notification Service',
  'Caching Service',
  'Load Balancer',
];

// Sample log messages by severity
const logMessages = {
  critical: [
    'System crash detected in production environment',
    'Database connection pool exhausted',
    'Memory leak detected in worker process',
    'Service is unresponsive and failing health checks',
    'Critical security vulnerability exploited',
  ],
  error: [
    'Failed to process user payment',
    'Database query timeout after 30s',
    'Authentication service returned 500 error',
    'Redis connection refused',
    'Failed to send notification to user',
    'API rate limit exceeded for client',
    'File upload failed due to permission issues',
  ],
  warning: [
    'High CPU usage detected (85%)',
    'Database query taking longer than expected',
    'API endpoint response time degraded',
    'Low disk space warning (15% remaining)',
    'Cache hit ratio dropping below threshold',
    'Multiple failed login attempts detected',
    'Approaching API rate limit',
  ],
  info: [
    'User signed up successfully',
    'Payment processed successfully',
    'Background job completed',
    'Email notification sent to user',
    'Data export task completed',
    'Cache refreshed successfully',
    'User profile updated',
    'New API key generated for client',
  ],
  debug: [
    'Starting background worker process',
    'Processing batch of 100 items',
    'Cache miss for key: user_profile_12345',
    'API request received from client',
    'Database connection established',
    'Rendering component with props',
    'Parsing input parameters',
  ],
};

// Generate a random log entry
const generateLog = (): Log => {
  const severity = ['debug', 'info', 'info', 'info', 'warning', 'warning', 'error', 'critical'][
    Math.floor(Math.random() * 8)
  ];
  const source = sources[Math.floor(Math.random() * sources.length)];
  const messages = logMessages[severity as keyof typeof logMessages];
  const message = messages[Math.floor(Math.random() * messages.length)];
  
  return {
    id: generateId(),
    timestamp: generateDate(),
    message,
    severity,
    source,
    metadata: {
      requestId: generateId(),
      userId: Math.floor(Math.random() * 1000) + 1,
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    },
  };
};

// Generate a specified number of random log entries
const generateLogs = (count: number): Log[] => {
  return Array.from({ length: count }, () => generateLog()).sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );
};

export const useMockLogs = (initialCount = 100) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setLogs(generateLogs(initialCount));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [initialCount]);

  // Filter logs from today
  const todayLogs = logs.filter(log => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return log.timestamp >= today;
  });

  // Count error and critical logs
  const errorCount = logs.filter(log => 
    log.severity === 'error' || log.severity === 'critical'
  ).length;

  // Function to refresh logs
  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLogs(generateLogs(initialCount));
      setIsLoading(false);
    }, 500);
  };

  return { logs, isLoading, refresh, todayLogs, errorCount };
};