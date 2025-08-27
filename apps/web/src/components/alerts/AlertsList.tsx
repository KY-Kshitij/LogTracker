import React from 'react';
import { AlertCircle, Bell, Edit, Trash2, ToggleRight } from 'lucide-react';
import { Alert } from '../../types/Alert';

interface AlertsListProps {
  alerts: Alert[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts, onToggle, onDelete }) => {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div
                className={`mt-0.5 rounded-full p-1.5 ${
                  alert.severity === 'critical'
                    ? 'bg-red-100 text-red-500'
                    : alert.severity === 'warning'
                    ? 'bg-amber-100 text-amber-500'
                    : 'bg-blue-100 text-blue-500'
                }`}
              >
                <AlertCircle size={16} />
              </div>
              <div>
                <h4 className="text-base font-medium text-slate-800">{alert.name}</h4>
                <p className="mt-1 text-sm text-slate-500">{alert.condition}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      alert.severity === 'critical'
                        ? 'bg-red-100 text-red-800'
                        : alert.severity === 'warning'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  {alert.channels.map((channel) => (
                    <span
                      key={channel}
                      className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800"
                    >
                      <Bell size={10} className="mr-1" />
                      {channel}
                    </span>
                  ))}
                  <span className="ml-2 text-xs text-slate-500">
                    {alert.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onToggle(alert.id)}
                className={`rounded p-1.5 text-slate-500 hover:bg-slate-100 ${
                  !alert.enabled && 'text-slate-400'
                }`}
                title={alert.enabled ? 'Disable alert' : 'Enable alert'}
              >
                <ToggleRight size={18} />
              </button>
              <button
                className="rounded p-1.5 text-slate-500 hover:bg-slate-100"
                title="Edit alert"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDelete(alert.id)}
                className="rounded p-1.5 text-red-500 hover:bg-red-50"
                title="Delete alert"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsList;