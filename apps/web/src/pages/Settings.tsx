import React, { useState, useEffect } from 'react';
import { Cog, Users, Server, Bell, Webhook, Mail, Clock } from 'lucide-react';

const tabs = [
  { id: 'general', label: 'General', icon: <Cog size={18} /> },
  { id: 'users', label: 'Users & Roles', icon: <Users size={18} /> },
  { id: 'integrations', label: 'Integrations', icon: <Server size={18} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { id: 'retention', label: 'Data Retention', icon: <Clock size={18} /> },
];

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your application settings and preferences
        </p>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="flex border-b border-slate-200">
          <nav className="flex-none">
            <ul className="flex flex-col sm:flex-row">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center border-b-2 px-4 py-4 text-sm font-medium sm:border-b-0 sm:border-l-2 sm:py-3 ${
                      activeTab === tab.id
                        ? 'border-teal-600 text-teal-600'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'users' && <UsersSettings />}
          {activeTab === 'integrations' && <IntegrationsSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'retention' && <RetentionSettings />}
        </div>
      </div>
    </div>
  );
};

const GeneralSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-800">General Settings</h3>
        <p className="mt-1 text-sm text-slate-500">Configure basic application settings</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="appName" className="block text-sm font-medium text-slate-700">
            Application Name
          </label>
          <input
            type="text"
            id="appName"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
            defaultValue="LogTracker"
          />
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-slate-700">
            Default Timezone
          </label>
          <select
            id="timezone"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
            defaultValue="UTC"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>

        <div>
          <label htmlFor="dateFormat" className="block text-sm font-medium text-slate-700">
            Date & Time Format
          </label>
          <select
            id="dateFormat"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
            defaultValue="iso"
          >
            <option value="iso">ISO 8601 (2023-04-23T14:56:00Z)</option>
            <option value="us">US (04/23/2023 2:56 PM)</option>
            <option value="eu">European (23/04/2023 14:56)</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div className="pt-4">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="autoupdate"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                defaultChecked
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="autoupdate" className="font-medium text-slate-700">
                Auto-refresh Dashboard
              </label>
              <p className="text-slate-500">
                Automatically refresh dashboard and log views every minute
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};



import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  status: string;
  initials: string;
  color: string;
}

const UsersSettings: React.FC = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer' });
  const [users, setUsers] = useState<User[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    const userData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as User[];
    setUsers(userData);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleSaveUser = async () => {
    const initials = newUser.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    const colorOptions = ['bg-indigo-500', 'bg-pink-500', 'bg-yellow-500', 'bg-green-500', 'bg-sky-500'];
    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];

    if (editingIndex !== null) {
      const userToUpdate = users[editingIndex];
      const updatedUser = { ...userToUpdate, ...newUser, initials };
      const userDocRef = doc(db, 'users', userToUpdate.id!);
      await updateDoc(userDocRef, updatedUser);
    } else {
      await addDoc(collection(db, 'users'), {
        ...newUser,
        status: 'Active',
        initials,
        color,
      });
    }

    fetchUsers();
    setNewUser({ name: '', email: '', role: 'Viewer' });
    setShowAddUser(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    const user = users[index];
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setShowAddUser(true);
  };

  const handleDelete = async (index: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      const user = users[index];
      await deleteDoc(doc(db, 'users', user.id!));
      fetchUsers();

      if (editingIndex === index) {
        setEditingIndex(null);
        setShowAddUser(false);
        setNewUser({ name: '', email: '', role: 'Viewer' });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium text-slate-800">Users & Roles</h3>
        <p className="mt-1 text-sm text-slate-500">Manage user access and permissions</p>
      </div>

      {/* Table */}
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Status</th>
              <th className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {users.map((user, idx) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${user.color} text-sm font-medium text-white`}>
                      {user.initials}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{user.email}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-slate-100 px-2 text-xs font-semibold leading-5 text-slate-800">
                    {user.role}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'} px-2 text-xs font-semibold leading-5`}>
                    {user.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-2">
                  <button onClick={() => handleEdit(idx)} className="text-teal-600 hover:text-teal-900">Edit</button>
                  <button onClick={() => handleDelete(idx)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form */}
      {showAddUser && (
        <div className="rounded-lg border border-slate-300 p-4 bg-slate-50 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option value="Admin">Admin</option>
              <option value="Viewer">Viewer</option>
              <option value="Developer">Developer</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setShowAddUser(false);
                setEditingIndex(null);
                setNewUser({ name: '', email: '', role: 'Viewer' });
              }}
              className="px-4 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveUser}
              className="px-4 py-2 text-sm text-white bg-teal-600 rounded-md hover:bg-teal-700"
            >
              {editingIndex !== null ? 'Update User' : 'Save User'}
            </button>
          </div>
        </div>
      )}

      {/* Add User Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setShowAddUser(true);
            setNewUser({ name: '', email: '', role: 'Viewer' });
            setEditingIndex(null);
          }}
          className="rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

const IntegrationsSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-800">Integrations</h3>
        <p className="mt-1 text-sm text-slate-500">Connect with third-party services</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Server size={20} className="text-slate-500" />
              <h4 className="ml-2 text-base font-medium text-slate-800">AWS CloudWatch</h4>
            </div>
            <div className="flex items-center">
              <span className="mr-2 inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                Not Connected
              </span>
              <button className="rounded-md bg-teal-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700">
                Connect
              </button>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Import logs from AWS CloudWatch to analyze alongside your other logs.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Webhook size={20} className="text-slate-500" />
              <h4 className="ml-2 text-base font-medium text-slate-800">Slack Notifications</h4>
            </div>
            <div className="flex items-center">
              <span className="mr-2 inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Connected
              </span>
              <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                Configure
              </button>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Send alerts and notifications to your Slack workspace.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Mail size={20} className="text-slate-500" />
              <h4 className="ml-2 text-base font-medium text-slate-800">Email Notifications</h4>
            </div>
            <div className="flex items-center">
              <span className="mr-2 inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Connected
              </span>
              <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                Configure
              </button>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Send email notifications for alerts and system events.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Add Integration
        </button>
      </div>
    </div>
  );
};

const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-800">Notification Settings</h3>
        <p className="mt-1 text-sm text-slate-500">Configure how and when you receive notifications</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-base font-medium text-slate-800">Email Notifications</h4>
            <div className="flex h-6 items-center">
              <input
                id="email-notifications"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                defaultChecked
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="critical-alerts" className="ml-3 text-sm text-slate-700">
                Critical Alerts
              </label>
              <input
                id="critical-alerts"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                defaultChecked
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="warning-alerts" className="ml-3 text-sm text-slate-700">
                Warning Alerts
              </label>
              <input
                id="warning-alerts"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                defaultChecked
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="info-alerts" className="ml-3 text-sm text-slate-700">
                Info Alerts
              </label>
              <input
                id="info-alerts"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="system-notifications" className="ml-3 text-sm text-slate-700">
                System Notifications
              </label>
              <input
                id="system-notifications"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                defaultChecked
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-base font-medium text-slate-800">Slack Notifications</h4>
            <div className="flex h-6 items-center">
              <input
                id="slack-notifications"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                defaultChecked
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <label htmlFor="slack-channel" className="block text-sm font-medium text-slate-700">
                Default Channel
              </label>
              <input
                type="text"
                id="slack-channel"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                defaultValue="#server-alerts"
              />
            </div>
            <div className="mt-2">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="critical-only"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="critical-only" className="font-medium text-slate-700">
                    Critical alerts only
                  </label>
                  <p className="text-slate-500">Only send critical severity alerts to Slack</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const RetentionSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-800">Data Retention</h3>
        <p className="mt-1 text-sm text-slate-500">Configure how long data is stored in the system</p>
      </div>

      <div className="rounded-lg border border-slate-200 p-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-base font-medium text-slate-800">Log Retention</h4>
            <p className="mt-1 text-xs text-slate-500">
              Configure how long logs are stored before being archived or deleted
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="info-logs" className="block text-sm font-medium text-slate-700">
                Info & Debug Logs
              </label>
              <select
                id="info-logs"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                defaultValue="30"
              >
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>

            <div>
              <label htmlFor="warning-logs" className="block text-sm font-medium text-slate-700">
                Warning Logs
              </label>
              <select
                id="warning-logs"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                defaultValue="90"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>

            <div>
              <label htmlFor="error-logs" className="block text-sm font-medium text-slate-700">
                Error & Critical Logs
              </label>
              <select
                id="error-logs"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                defaultValue="365"
              >
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
                <option value="730">2 years</option>
                <option value="forever">Forever</option>
              </select>
            </div>

            <div>
              <label htmlFor="archive-strategy" className="block text-sm font-medium text-slate-700">
                Archive Strategy
              </label>
              <select
                id="archive-strategy"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                defaultValue="compress"
              >
                <option value="delete">Delete old logs</option>
                <option value="compress">Compress and archive</option>
                <option value="s3">Archive to S3</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 p-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-base font-medium text-slate-800">Alert & Event History</h4>
            <p className="mt-1 text-xs text-slate-500">
              Configure retention periods for alert notifications and system events
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="alert-history" className="block text-sm font-medium text-slate-700">
                Alert History
              </label>
              <select
                id="alert-history"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                defaultValue="180"
              >
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>

            <div>
              <label htmlFor="system-events" className="block text-sm font-medium text-slate-700">
                System Events
              </label>
              <select
                id="system-events"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                defaultValue="90"
              >
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
