import React, { useState } from 'react';
import { PlusCircle, Bell, Clock, CheckCircle2 } from 'lucide-react';
import AlertsList from '../components/alerts/AlertsList';
import AlertHistory from '../components/alerts/AlertHistory';
import CreateAlertModal from '../components/alerts/CreateAlertModal';
import { useMockAlerts } from '../hooks/useMockAlerts';

const Alerts: React.FC = () => {
  const { alerts, alertHistory, createAlert, toggleAlert, deleteAlert } = useMockAlerts();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Alerts & Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure alerts based on log patterns and system conditions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <PlusCircle size={16} className="mr-2" />
          Create Alert
        </button>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex">
            <button
              className={`w-1/2 border-b-2 py-4 text-center text-sm font-medium ${
                activeTab === 'active'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('active')}
            >
              <div className="flex items-center justify-center">
                <Bell size={16} className="mr-2" />
                Active Alerts
              </div>
            </button>
            <button
              className={`w-1/2 border-b-2 py-4 text-center text-sm font-medium ${
                activeTab === 'history'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <div className="flex items-center justify-center">
                <Clock size={16} className="mr-2" />
                Alert History
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'active' ? (
            alerts.length > 0 ? (
              <AlertsList 
                alerts={alerts} 
                onToggle={toggleAlert} 
                onDelete={deleteAlert} 
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-slate-100 p-3">
                  <CheckCircle2 size={32} className="text-teal-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-slate-800">No active alerts</h3>
                <p className="mt-1 text-sm text-slate-500">
                  You haven't created any alerts yet. Get started by creating your first alert.
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  <PlusCircle size={16} className="mr-2" />
                  Create Alert
                </button>
              </div>
            )
          ) : (
            <AlertHistory history={alertHistory} />
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateAlertModal 
          onClose={() => setShowCreateModal(false)}
          onSubmit={(alertData) => {
            createAlert(alertData);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Alerts;