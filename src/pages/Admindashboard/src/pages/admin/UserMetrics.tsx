import React, { useState } from 'react';
import { BarChart3, Globe, TrendingUp, Users, Filter, Download, Eye, MapPin } from 'lucide-react';
import { useData } from '../../hooks/useData';

export const AdminUserMetrics: React.FC = () => {
  const { users } = useData();
  const [dateFilter, setDateFilter] = useState('month');
  const [interestFilter, setInterestFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  // Mock user interests data
  const userInterests = [
    { interest: 'Aerial Photography', users: 342, percentage: 28.5, growth: '+12%' },
    { interest: 'Racing & Sports', users: 298, percentage: 24.8, growth: '+8%' },
    { interest: 'Commercial Inspection', users: 245, percentage: 20.4, growth: '+15%' },
    { interest: 'Search & Rescue', users: 156, percentage: 13.0, growth: '+22%' },
    { interest: 'Agriculture', users: 89, percentage: 7.4, growth: '+18%' },
    { interest: 'Mapping & Surveying', users: 67, percentage: 5.6, growth: '+9%' },
    { interest: 'Entertainment', users: 23, percentage: 1.9, growth: '+5%' }
  ];

  // Mock country-based downloads data
  const countryDownloads = [
    { country: 'United States', downloads: 4567, users: 342, flag: '🇺🇸', growth: '+12%' },
    { country: 'United Kingdom', downloads: 2890, users: 245, flag: '🇬🇧', growth: '+8%' },
    { country: 'Germany', downloads: 2456, users: 198, flag: '🇩🇪', growth: '+15%' },
    { country: 'Canada', downloads: 1987, users: 156, flag: '🇨🇦', growth: '+10%' },
    { country: 'Australia', downloads: 1654, users: 134, flag: '🇦🇺', growth: '+18%' },
    { country: 'France', downloads: 1432, users: 112, flag: '🇫🇷', growth: '+7%' },
    { country: 'Japan', downloads: 1298, users: 98, flag: '🇯🇵', growth: '+22%' },
    { country: 'Netherlands', downloads: 987, users: 87, flag: '🇳🇱', growth: '+14%' },
    { country: 'Sweden', downloads: 756, users: 67, flag: '🇸🇪', growth: '+9%' },
    { country: 'Brazil', downloads: 654, users: 54, flag: '🇧🇷', growth: '+25%' }
  ];

  // Mock popular scenarios by interest
  const scenariosByInterest = {
    'Aerial Photography': [
      { scenario: 'Golden Hour Landscapes', downloads: 1234 },
      { scenario: 'Urban Architecture', downloads: 987 },
      { scenario: 'Nature Wildlife', downloads: 756 }
    ],
    'Racing & Sports': [
      { scenario: 'FPV Racing Circuits', downloads: 1456 },
      { scenario: 'Freestyle Maneuvers', downloads: 1123 },
      { scenario: 'Speed Challenges', downloads: 892 }
    ],
    'Commercial Inspection': [
      { scenario: 'Infrastructure Assessment', downloads: 1678 },
      { scenario: 'Solar Panel Inspection', downloads: 1234 },
      { scenario: 'Wind Turbine Check', downloads: 987 }
    ]
  };

  const exportMetrics = () => {
    const headers = ['Metric Type', 'Name', 'Value', 'Users', 'Growth'];
    const interestData = userInterests.map(interest => [
      'Interest',
      interest.interest,
      interest.users,
      `${interest.percentage}%`,
      interest.growth
    ]);
    const countryData = countryDownloads.map(country => [
      'Country',
      country.country,
      country.downloads,
      country.users,
      country.growth
    ]);

    const csvContent = [headers, ...interestData, ...countryData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user_metrics_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getInterestColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-pink-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Metrics & Analytics</h1>
          <p className="text-gray-500 mt-1">Analyze user interests and geographic distribution</p>
        </div>
        <button
          onClick={exportMetrics}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Metrics</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interest Category</label>
            <select
              value={interestFilter}
              onChange={(e) => setInterestFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Interests</option>
              {userInterests.map(interest => (
                <option key={interest.interest} value={interest.interest}>{interest.interest}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country/Region</label>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Countries</option>
              {countryDownloads.map(country => (
                <option key={country.country} value={country.country}>
                  {country.flag} {country.country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setDateFilter('month');
                setInterestFilter('all');
                setCountryFilter('all');
              }}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Interests</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{userInterests.length}</p>
              <p className="text-sm text-green-600 mt-1">Categories tracked</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Countries</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{countryDownloads.length}</p>
              <p className="text-sm text-green-600 mt-1">Active regions</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {countryDownloads.reduce((sum, country) => sum + country.downloads, 0).toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1">+14% this month</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {countryDownloads.reduce((sum, country) => sum + country.users, 0).toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1">Across all regions</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* User Interests Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">User Interests Distribution</h2>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>Growing categories</span>
            </div>
          </div>

          <div className="space-y-4">
            {userInterests.map((interest, index) => (
              <div key={interest.interest} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getInterestColor(index)}`}></div>
                    <span className="text-sm font-medium text-gray-900">{interest.interest}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{interest.users}</span>
                    <span className="text-xs text-green-600 ml-2">{interest.growth}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getInterestColor(index)}`}
                    style={{ width: `${interest.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">{interest.percentage}% of total users</div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Scenarios by Interest */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Popular Scenarios by Interest</h2>
          
          <div className="space-y-6">
            {Object.entries(scenariosByInterest).slice(0, 3).map(([interest, scenarios]) => (
              <div key={interest} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h3 className="text-sm font-medium text-gray-900 mb-3">{interest}</h3>
                <div className="space-y-2">
                  {scenarios.map((scenario, index) => (
                    <div key={scenario.scenario} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                        <span className="text-sm text-gray-700">{scenario.scenario}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {scenario.downloads.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Country-Based Downloads */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Country-Based Downloads</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>Geographic distribution</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Downloads/User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Share
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {countryDownloads.map((country, index) => {
                const totalDownloads = countryDownloads.reduce((sum, c) => sum + c.downloads, 0);
                const marketShare = ((country.downloads / totalDownloads) * 100).toFixed(1);
                const avgDownloads = (country.downloads / country.users).toFixed(1);
                
                return (
                  <tr key={country.country} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{country.flag}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{country.country}</div>
                          <div className="text-sm text-gray-500">Rank #{index + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {country.downloads.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{country.users.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{avgDownloads}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {country.growth}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${marketShare}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{marketShare}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Region</h3>
          <div className="text-center">
            <div className="text-4xl mb-2">🇺🇸</div>
            <div className="text-xl font-bold text-gray-900">United States</div>
            <div className="text-sm text-gray-500 mt-1">4,567 downloads</div>
            <div className="text-sm text-green-600 mt-1">+12% growth</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fastest Growing</h3>
          <div className="text-center">
            <div className="text-4xl mb-2">🇧🇷</div>
            <div className="text-xl font-bold text-gray-900">Brazil</div>
            <div className="text-sm text-gray-500 mt-1">654 downloads</div>
            <div className="text-sm text-green-600 mt-1">+25% growth</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Highest Engagement</h3>
          <div className="text-center">
            <div className="text-4xl mb-2">🇯🇵</div>
            <div className="text-xl font-bold text-gray-900">Japan</div>
            <div className="text-sm text-gray-500 mt-1">13.2 avg downloads/user</div>
            <div className="text-sm text-green-600 mt-1">+22% growth</div>
          </div>
        </div>
      </div>
    </div>
  );
};