import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Award, Target, Filter, Download, Calendar, Eye, Package } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { CustomDateFilter } from '../../components/common/CustomDateFilter';

export const AdminAnalytics: React.FC = () => {
  const { users, plans, drones, scenarios, incomeRecords } = useData();
  const [dateFilter, setDateFilter] = useState('month');
  const [viewType, setViewType] = useState<'overview' | 'plans' | 'products'>('overview');
  const [customDateRange, setCustomDateRange] = useState<{ start: string; end: string } | null>(null);

  const handleDateFilterChange = (value: string, customRange?: { start: string; end: string }) => {
    setDateFilter(value);
    if (customRange) {
      setCustomDateRange(customRange);
    } else {
      setCustomDateRange(null);
    }
  };

  // Calculate plan popularity
  const planAnalytics = plans.map(plan => {
    const planUsers = users.filter(u => u.plan === plan.name);
    const revenue = planUsers.reduce((sum, user) => sum + (user.paidAmount || 0), 0);
    const growthRate = Math.random() * 15 + 3; // Mock growth rate
    
    return {
      ...plan,
      userCount: planUsers.length,
      revenue,
      growthRate: growthRate.toFixed(1),
      conversionRate: ((planUsers.length / users.length) * 100).toFixed(1)
    };
  }).sort((a, b) => b.userCount - a.userCount);

  // Calculate drone popularity
  const droneAnalytics = drones.map(drone => {
    const usageCount = users.filter(user => 
      user.customPlan?.selectedDrones.includes(drone.name)
    ).length;
    const revenue = usageCount * drone.price;
    
    return {
      ...drone,
      usageCount,
      revenue,
      popularityScore: (usageCount * 10 + revenue * 0.1).toFixed(0)
    };
  }).sort((a, b) => b.usageCount - a.usageCount);

  // Calculate scenario popularity
  const scenarioAnalytics = scenarios.map(scenario => {
    const usageCount = users.filter(user => 
      user.customPlan?.selectedScenarios.includes(scenario.name)
    ).length;
    const revenue = usageCount * scenario.price;
    
    return {
      ...scenario,
      usageCount,
      revenue,
      popularityScore: (usageCount * 10 + revenue * 0.1).toFixed(0),
      completionRate: (Math.random() * 25 + 75).toFixed(1) // Mock completion rate
    };
  }).sort((a, b) => b.usageCount - a.usageCount);

  const totalRevenue = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const customPlanUsers = users.filter(u => u.plan === 'Custom').length;

  const exportAnalytics = () => {
    const csvContent = [
      ['Type', 'Name', 'Users', 'Revenue', 'Popularity Score'],
      ...planAnalytics.map(p => ['Plan', p.name, p.userCount, `$${p.revenue}`, p.conversionRate]),
      ...droneAnalytics.map(d => ['Drone', d.name, d.usageCount, `$${d.revenue}`, d.popularityScore]),
      ...scenarioAnalytics.map(s => ['Scenario', s.name, s.usageCount, `$${s.revenue}`, s.popularityScore])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin_analytics_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-1">Performance insights for plans, drones, and scenarios</p>
        </div>
        <div className="flex items-center space-x-3">
          <CustomDateFilter
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="w-48"
          />
          <button
            onClick={exportAnalytics}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {customDateRange && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <Calendar className="w-4 h-4 inline mr-1" />
            Analyzing data from {new Date(customDateRange.start).toLocaleDateString()} to {new Date(customDateRange.end).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* View Type Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setViewType('overview')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              viewType === 'overview'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewType('plans')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              viewType === 'plans'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Plans Analysis
          </button>
          <button
            onClick={() => setViewType('products')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              viewType === 'products'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Products Analysis
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{activeUsers}</p>
              <p className="text-sm text-blue-600 mt-1">+12% this month</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Plan</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{planAnalytics[0]?.name}</p>
              <p className="text-sm text-green-600 mt-1">{planAnalytics[0]?.userCount} users</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Custom Plans</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{customPlanUsers}</p>
              <p className="text-sm text-purple-600 mt-1">Personalized</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Drone</p>
              <p className="text-lg font-bold text-gray-900 mt-2">{droneAnalytics[0]?.name}</p>
              <p className="text-sm text-yellow-600 mt-1">{droneAnalytics[0]?.usageCount} users</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content based on view type */}
      {viewType === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Plans */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Most Popular Plans</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {planAnalytics.slice(0, 5).map((plan, index) => (
                  <div key={plan.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded font-medium">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{plan.name}</p>
                        <p className="text-xs text-gray-500">${plan.price}/month</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{plan.userCount} users</p>
                      <p className="text-xs text-green-600">+{plan.growthRate}% growth</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="text-sm font-medium text-gray-700 mb-3">Drones</div>
                {droneAnalytics.slice(0, 3).map((drone, index) => (
                  <div key={drone.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{drone.name}</p>
                        <p className="text-xs text-gray-500">{drone.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{drone.usageCount} users</p>
                    </div>
                  </div>
                ))}
                
                <div className="text-sm font-medium text-gray-700 mb-3 mt-6">Scenarios</div>
                {scenarioAnalytics.slice(0, 3).map((scenario, index) => (
                  <div key={scenario.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{scenario.name}</p>
                        <p className="text-xs text-gray-500">{scenario.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{scenario.usageCount} users</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewType === 'plans' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Detailed Plan Analytics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {planAnalytics.map((plan, index) => (
                  <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-indigo-600">#{index + 1}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                          <div className="text-sm text-gray-500">${plan.price}/month</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{plan.userCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600">${plan.revenue.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        +{plan.growthRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${plan.conversionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{plan.conversionRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        plan.visibility === 'public' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {plan.visibility}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewType === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drone Analytics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Drone Performance</h3>
              <p className="text-sm text-gray-500 mt-1">Usage in custom plans</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {droneAnalytics.map((drone, index) => (
                  <div key={drone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{drone.name}</p>
                        <p className="text-xs text-gray-500">{drone.type} • ${drone.price}/month</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{drone.usageCount} users</p>
                      <p className="text-xs text-green-600">${drone.revenue} revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scenario Analytics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Scenario Performance</h3>
              <p className="text-sm text-gray-500 mt-1">Usage and completion rates</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {scenarioAnalytics.map((scenario, index) => (
                  <div key={scenario.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{scenario.name}</p>
                        <p className="text-xs text-gray-500">{scenario.category} • {scenario.difficulty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{scenario.usageCount} users</p>
                      <p className="text-xs text-blue-600">{scenario.completionRate}% completion</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};