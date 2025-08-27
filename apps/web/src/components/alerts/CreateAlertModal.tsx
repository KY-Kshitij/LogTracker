import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Alert } from '../../types/Alert';

interface CreateAlertModalProps {
  onClose: () => void;
  onSubmit: (alertData: Omit<Alert, 'id'>) => void;
}

interface FormValues {
  name: string;
  condition: string;
  severity: 'info' | 'warning' | 'critical';
  channels: string[];
  threshold: number;
  timeWindow: number;
  timeUnit: 'minutes' | 'hours';
}

const CreateAlertModal: React.FC<CreateAlertModalProps> = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      severity: 'warning',
      channels: ['email'],
      threshold: 5,
      timeWindow: 5,
      timeUnit: 'minutes',
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    const formattedCondition = `More than ${data.threshold} ${data.severity} logs in ${data.timeWindow} ${data.timeUnit}`;
    
    onSubmit({
      name: data.name,
      condition: formattedCondition,
      severity: data.severity,
      channels: data.channels,
      enabled: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900 bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-medium text-slate-800">Create New Alert</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Alert Name
              </label>
              <input
                type="text"
                id="name"
                className={`mt-1 block w-full rounded-md border ${
                  errors.name ? 'border-red-500' : 'border-slate-300'
                } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
                placeholder="e.g., High Error Rate Alert"
                {...register('name', { required: 'Alert name is required' })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="severity" className="block text-sm font-medium text-slate-700">
                Severity Level
              </label>
              <select
                id="severity"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                {...register('severity')}
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threshold" className="block text-sm font-medium text-slate-700">
                  Threshold
                </label>
                <input
                  type="number"
                  id="threshold"
                  min="1"
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  {...register('threshold', { min: 1 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Time Window</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    min="1"
                    className="block w-full flex-1 rounded-l-md border border-slate-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    {...register('timeWindow', { min: 1 })}
                  />
                  <select
                    className="inline-flex items-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
                    {...register('timeUnit')}
                  >
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-700">Notification Channels</span>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="email"
                    type="checkbox"
                    value="email"
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    {...register('channels')}
                  />
                  <label htmlFor="email" className="ml-2 block text-sm text-slate-700">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="slack"
                    type="checkbox"
                    value="slack"
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    {...register('channels')}
                  />
                  <label htmlFor="slack" className="ml-2 block text-sm text-slate-700">
                    Slack
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="webhook"
                    type="checkbox"
                    value="webhook"
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    {...register('channels')}
                  />
                  <label htmlFor="webhook" className="ml-2 block text-sm text-slate-700">
                    Webhook
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Create Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAlertModal;