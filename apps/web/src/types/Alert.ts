export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'active' | 'resolved';
export type NotificationChannel = 'email' | 'slack' | 'webhook';

export interface Alert {
  id: string;
  name: string;
  condition: string;
  severity: AlertSeverity;
  channels: NotificationChannel[];
  enabled: boolean;
}

export interface AlertHistoryItem {
  id: string;
  alertId: string;
  alertName: string;
  alertCondition: string;
  severity: AlertSeverity;
  triggeredAt: Date;
  status: AlertStatus;
  resolvedAt?: Date;
  metadata?: Record<string, any>;
}