import React, { useState } from 'react';
import { Download, Calendar, FileText, TrendingUp, Filter, User } from 'lucide-react';

export const AdminDownloads: React.FC = () => {
  const [dateFilter, setDateFilter] = useState('month');
  const [scenarioFilter, setScenarioFilter] = useState('all');

  const downloadStats = [
    { period: 'Today', count: 145, change: '+12%' },
    { period: 'This Week', count: 892, change: '+8%' },
    { period: 'This Month', count: 3247, change: '+15%' },
    { period: 'All Time', count: 28934, change: '+124%' }
  ];

  const recentDownloads = [
    { 
      id: 1, 
      user: 'john.doe@example.com', 
      file: 'Advanced Scenario Pack', 
      scenario: 'Urban Navigation',
      drone: 'DJI Mavic Pro',
      size: '2.4 MB', 
      time: '5 minutes ago',
      type: 'Scenario'
    },
    { 
      id: 2, 
      user: 'jane.smith@example.com', 
      file: 'Tutorial Videos', 
      scenario: 'Basic Flight Training',
      drone: 'Phantom 4',
      size: '45.8 MB', 
      time: '12 minutes ago',
      type: 'Tutorial'
    },
    { 
      id: 3, 
      user: 'mike.johnson@example.com', 
      file: 'Weather Simulation Data', 
      scenario: 'Storm Navigation',
      drone: 'Inspire 2',
      size: '8.7 MB', 
      time: '1 hour ago',
      type: 'Data'
    },
    { 
      id: 4, 
      user: 'sarah.wilson@example.com', 
      file: 'Flight Path Analysis', 
      scenario: 'Precision Landing',
      drone: 'Mini 2',
      size: '1.2 MB', 
      time: '2 hours ago',
      type: 'Analysis'
    },
    { 
      id: 5, 
      user: 'alex.brown@example.com', 
      file: 'Obstacle Course Pack', 
      scenario: 'Advanced Maneuvers',
      drone: 'Air 2S',
      size: '15.3 MB', 
      time: '3 hours ago',
      type: 'Scenario'
    }
  ];

  const exportToCSV = () => {
    const headers = ['User', 'File', 'Scenario', 'Drone', 'Size', 'Download Time', 'Type'];
    const csvData = recentDownloads.map(download => [
      download.user,
      download.file,
      download.scenario,
      download.drone,
      download.size,
      download.time,
      download.type
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `downloads_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Scenario': return 'bg-blue-100 text-blue-800';
      case 'Tutorial': return 'bg-green-100 text-green-800';
      case 'Data': return 'bg-purple-100 text-purple-800';
      case 'Analysis': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Downloads & Usage Report</h1>
          <p className="text-gray-500 mt-1">Monitor simulator downloads and usage patterns</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {downloadStats.map((stat) => (
          <div key={stat.period} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.period}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.count.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <Download className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Scenario Type</label>
            <select
              value={scenarioFilter}
              onChange={(e) => setScenarioFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Scenarios</option>
              <option value="basic">Basic Training</option>
              <option value="advanced">Advanced Maneuvers</option>
              <option value="weather">Weather Simulation</option>
              <option value="urban">Urban Navigation</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Charts and Recent Downloads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Download Trends</h3>
            <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Last 30 days</span>
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Download trend visualization</p>
              <p className="text-sm text-gray-400 mt-1">15% increase this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Content</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-900">Urban Navigation</p>
                <p className="text-xs text-blue-700">Advanced scenario pack</p>
              </div>
              <span className="text-sm font-bold text-blue-900">1,247 downloads</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-900">Basic Flight Training</p>
                <p className="text-xs text-green-700">Tutorial series</p>
              </div>
              <span className="text-sm font-bold text-green-900">892 downloads</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-purple-900">Weather Simulation</p>
                <p className="text-xs text-purple-700">Environmental data</p>
              </div>
              <span className="text-sm font-bold text-purple-900">634 downloads</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Downloads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Downloads</h2>
            <span className="text-sm text-gray-500">{recentDownloads.length} recent downloads</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scenario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drone Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloaded
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDownloads.map((download) => (
                <tr key={download.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{download.user}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{download.file}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{download.scenario}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{download.drone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{download.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{download.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(download.type)}`}>
                      {download.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};