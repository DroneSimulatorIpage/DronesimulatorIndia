import React, { useState } from 'react';
import { FileText, Calendar, User, Plus, Filter, Download } from 'lucide-react';
import { useData } from '../../hooks/useData';

export const AdminAnnotations: React.FC = () => {
  const { annotations } = useData();
  const [dateFilter, setDateFilter] = useState('all');
  const [adminFilter, setAdminFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredAnnotations = annotations.filter(annotation => {
    const matchesAdmin = adminFilter === 'all' || annotation.adminName === adminFilter;
    const matchesType = typeFilter === 'all' || annotation.changeType === typeFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const annotationDate = new Date(annotation.timestamp);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - annotationDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
      }
    }
    
    return matchesAdmin && matchesType && matchesDate;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'plan-change': return 'bg-blue-100 text-blue-800';
      case 'status-change': return 'bg-yellow-100 text-yellow-800';
      case 'addon-change': return 'bg-green-100 text-green-800';
      case 'user-created': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'plan-change': return '💳';
      case 'status-change': return '🔄';
      case 'addon-change': return '🔧';
      case 'user-created': return '👤';
      default: return '📝';
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'User', 'Admin', 'Change Type', 'Summary', 'Old Value', 'New Value'];
    const csvData = filteredAnnotations.map(annotation => [
      new Date(annotation.timestamp).toLocaleString(),
      annotation.userName,
      annotation.adminName,
      annotation.changeType,
      annotation.changeSummary,
      annotation.oldValue || '',
      annotation.newValue || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plan_annotations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const uniqueAdmins = [...new Set(annotations.map(a => a.adminName))];
  const changeTypes = ['plan-change', 'status-change', 'addon-change', 'user-created'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plan Edit Annotations</h1>
          <p className="text-gray-500 mt-1">Track plan modifications and access changes made by admins</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Note</span>
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Admin</label>
            <select
              value={adminFilter}
              onChange={(e) => setAdminFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Admins</option>
              {uniqueAdmins.map(admin => (
                <option key={admin} value={admin}>{admin}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Change Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {changeTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setDateFilter('all');
                setAdminFilter('all');
                setTypeFilter('all');
              }}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Changes</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{filteredAnnotations.length}</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        {changeTypes.slice(0, 3).map(type => {
          const count = filteredAnnotations.filter(a => a.changeType === type).length;
          return (
            <div key={type} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{count}</p>
                </div>
                <div className="text-2xl">{getTypeIcon(type)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Annotations List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Plan Changes</h2>
            <span className="text-sm text-gray-500">{filteredAnnotations.length} entries</span>
          </div>
        </div>

        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {filteredAnnotations.map((annotation) => (
            <div key={annotation.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{annotation.changeSummary}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(annotation.changeType)}`}>
                      {annotation.changeType.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">User: </span>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 underline">
                        {annotation.userName}
                      </button>
                    </div>
                    {annotation.oldValue && annotation.newValue && (
                      <div>
                        <span className="text-sm font-medium text-gray-700">Change: </span>
                        <span className="text-sm text-red-600">{annotation.oldValue}</span>
                        <span className="text-sm text-gray-400"> → </span>
                        <span className="text-sm text-green-600">{annotation.newValue}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{annotation.adminName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(annotation.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredAnnotations.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No annotations found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};