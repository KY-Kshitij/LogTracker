import { useState, useEffect } from 'react';
import { Alert, AlertHistoryItem } from '../types/Alert';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Sample initial alerts
const initialAlerts: Alert[] = [
  {
    id: generateId(),
    name: 'Critical Error Rate',
    condition: 'More than 5 critical errors in 5 minutes',
    severity: 'critical',
    channels: ['email', 'slack'],
    enabled: true,
  },
  {
    id: generateId(),
    name: 'High API Latency',
    condition: 'API response time > 2000ms for 3 consecutive requests',
    severity: 'warning',
    channels: ['slack'],
    enabled: true,
  },
  {
    id: generateId(),
    name: 'Database Connection Issues',
    condition: 'More than 3 database connection failures in 10 minutes',
    severity: 'critical',
    channels: ['email', 'slack', 'webhook'],
    enabled: false,
  },
  {
    id: generateId(),
    name: 'High Memory Usage',
    condition: 'Memory usage > 90% for 5 minutes',
    severity: 'warning',
    channels: ['email'],
    enabled: true,
  },
];

// Generate a random date within the last 30 days
const generateDate = (): Date => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  
  now.setDate(now.getDate() - daysAgo);
  now.setHours(now.getHours() - hoursAgo);
  now.setMinutes(now.getMinutes() - minutesAgo);
  
  return now;
};

// Generate alert history based on alerts
const generateAlertHistory = (alerts: Alert[]): AlertHistoryItem[] => {
  const history: AlertHistoryItem[] = [];
  
  // For each alert, generate 0-3 history items
  alerts.forEach(alert => {
    const count = Math.floor(Math.random() * 4); // 0-3
    
    for (let i = 0; i < count; i++) {
      const triggeredAt = generateDate();
      const resolvedAt = new Date(triggeredAt.getTime() + (Math.random() * 1000 * 60 * 60)); // 0-60 minutes later
      
      history.push({
        id: generateId(),
        alertId: alert.id,
        alertName: alert.name,
        alertCondition: alert.condition,
        severity: alert.severity,
        triggeredAt,
        status: Math.random() > 0.3 ? 'resolved' : 'active',
        resolvedAt: Math.random() > 0.3 ? resolvedAt : undefined,
        metadata: {
          affectedServices: Math.random() > 0.5 ? ['API Server', 'Database'] : ['Worker Service'],
          logCount: Math.floor(Math.random() * 20) + 1,
        },
      });
    }
  });
  
  // Sort by triggeredAt, most recent first
  return history.sort((a, b) => b.triggeredAt.getTime() - a.triggeredAt.getTime());
};

export const useMockAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertHistory, setAlertHistory] = useState<AlertHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setAlerts(initialAlerts);
      setAlertHistory(generateAlertHistory(initialAlerts));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to toggle alert enabled state
  const toggleAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
      )
    );
  };

  // Function to delete an alert
  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  // Function to create a new alert
  const createAlert = (alertData: Omit<Alert, 'id'>) => {
    const newAlert: Alert = {
      id: generateId(),
      ...alertData,
    };
    
    setAlerts(prev => [newAlert, ...prev]);
  };

  return { 
    alerts, 
    alertHistory, 
    isLoading, 
    toggleAlert, 
    deleteAlert, 
    createAlert 
  };
};