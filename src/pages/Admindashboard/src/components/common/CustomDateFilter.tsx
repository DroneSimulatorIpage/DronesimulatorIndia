import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';

interface CustomDateFilterProps {
  value: string;
  onChange: (value: string, customRange?: { start: string; end: string }) => void;
  className?: string;
}

export const CustomDateFilter: React.FC<CustomDateFilterProps> = ({
  value,
  onChange,
  className = ""
}) => {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onChange('custom', { start: customStart, end: customEnd });
      setShowCustomModal(false);
    }
  };

  const formatCustomLabel = () => {
    if (value === 'custom' && customStart && customEnd) {
      const start = new Date(customStart).toLocaleDateString();
      const end = new Date(customEnd).toLocaleDateString();
      return `${start} - ${end}`;
    }
    return 'Custom Range';
  };

  return (
    <>
      <select
        value={value === 'custom' ? 'custom' : value}
        onChange={(e) => {
          if (e.target.value === 'custom') {
            setShowCustomModal(true);
          } else {
            onChange(e.target.value);
          }
        }}
        className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      >
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="quarter">This Quarter</option>
        <option value="year">This Year</option>
        <option value="last7">Last 7 Days</option>
        <option value="last30">Last 30 Days</option>
        <option value="last90">Last 90 Days</option>
        <option value="custom">{value === 'custom' ? formatCustomLabel() : 'Custom Range'}</option>
        <option value="all">All Time</option>
      </select>

      {/* Custom Date Range Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Select Custom Date Range</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  min={customStart}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomApply}
                disabled={!customStart || !customEnd}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calendar className="w-4 h-4" />
                <span>Apply Range</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};