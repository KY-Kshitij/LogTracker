import React from 'react';
import { AlertOctagon, ArrowUpRight, Clock } from 'lucide-react';
import { AlertHistoryItem } from '../../types/Alert';

interface AlertHistoryProps {
  history: AlertHistoryItem[];
}

const AlertHistory: React.FC<AlertHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-slate-100 p-3">
          <Clock size={32} className="text-slate-500" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-slate-800">No alert history</h3>
        <p className="mt-1 text-sm text-slate-500">
          There's no alert history to display yet. Alert events will be shown here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              Alert
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              Severity
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              Triggered at
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              Status
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {history.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <div
                    className={`mr-2 rounded-full p-1 ${
                      item.severity === 'critical'
                        ? 'bg-red-100 text-red-500'
                        : item.severity === 'warning'
                        ? 'bg-amber-100 text-amber-500'
                        : 'bg-blue-100 text-blue-500'
                    }`}
                  >
                    <AlertOctagon size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{item.alertName}</div>
                    <div className="text-xs text-slate-500">{item.alertCondition}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.severity === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : item.severity === 'warning'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.severity}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                {item.triggeredAt.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button className="text-teal-600 hover:text-teal-800">
                  <ArrowUpRight size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertHistory;