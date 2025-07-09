import React, { useState } from 'react';
import { Users, Activity, Download, Clock, TrendingUp, CreditCard } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { CustomDateFilter } from '../../components/common/CustomDateFilter';

export const AdminDashboard: React.FC = () => {
  const { users, plans, annotations, incomeRecords } = useData();
  const [dateFilter, setDateFilter] = useState('month');
  const [planFilter, setPlanFilter] = useState('all');
  const [customDateRange, setCustomDateRange] = useState<{ start: string; end: string } | null>(null);

  const handleDateFilterChange = (value: string, customRange?: { start: string; end: string }) => {
    setDateFilter(value);
    if (customRange) {
      setCustomDateRange(customRange);
    } else {
      setCustomDateRange(null);
    }
  };

  // Calculate KPIs
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const paidSubscriptions = users.filter(u => u.plan !== 'Free' && u.status === 'Active').length;
  const freeUsers = users.filter(u => u.plan === 'Free' || u.status !== 'Active').length;
  const monthlyDownloads = 3456; // Mock data
  const planChanges = annotations.filter(a => a.changeType === 'plan-change').length;

  // Mock monthly growth data
  const monthlyGrowthData = [
    { month: 'Jul', users: 850 },
    { month: 'Aug', users: 920 },
    { month: 'Sep', users: 1050 },
    { month: 'Oct', users: 1180 },
    { month: 'Nov', users: 1290 },
    { month: 'Dec', users: 1420 }
  ];

  // Plan distribution
  const planDistribution = plans.map(plan => ({
    name: plan.name,
    count: users.filter(u => u.plan === plan.name).length,
    percentage: ((users.filter(u => u.plan === plan.name).length / totalUsers) * 100).toFixed(1)
  }));

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers.toString(),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
      subtitle: `${activeUsers} active`
    },
    {
      title: 'Paid Subscriptions',
      value: paidSubscriptions.toString(),
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: CreditCard,
      subtitle: `${freeUsers} free users`
    },
    {
      title: 'Downloads This Month',
      value: monthlyDownloads.toLocaleString(),
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: Download,
      subtitle: customDateRange ? `${customDateRange.start} to ${customDateRange.end}` : 'Simulator downloads'
    },
    {
      title: 'Plan Changes',
      value: planChanges.toString(),
      change: '+5.1%',
      changeType: 'positive' as const,
      icon: Activity,
      subtitle: 'Admin edits'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Monitor user activity and manage platform operations</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <CustomDateFilter
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="w-48"
          />
          
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Plans</option>
            {plans.map(plan => (
              <option key={plan.id} value={plan.name}>{plan.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <stat.icon className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly User Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly User Growth</h3>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% growth</span>
            </div>
          </div>
          
          <div className="h-64">
            <div className="flex items-end justify-between h-48 space-x-2">
              {monthlyGrowthData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-300 hover:from-indigo-700 hover:to-indigo-500"
                    style={{ height: `${(data.users / 1500) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0</span>
              <span>1.5K users</span>
            </div>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Type Distribution</h3>
          
          <div className="space-y-4">
            {planDistribution.map((plan, index) => (
              <div key={plan.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    index === 0 ? 'bg-gray-500' :
                    index === 1 ? 'bg-indigo-500' :
                    'bg-purple-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{plan.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{plan.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({plan.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>

          {/* Visual representation */}
          <div className="mt-6">
            <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
              {planDistribution.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`${
                    index === 0 ? 'bg-gray-500' :
                    index === 1 ? 'bg-indigo-500' :
                    'bg-purple-500'
                  }`}
                  style={{ width: `${plan.percentage}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {annotations.slice(0, 6).map((annotation) => (
            <div key={annotation.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                annotation.changeType === 'plan-change' ? 'bg-blue-500' :
                annotation.changeType === 'addon-change' ? 'bg-green-500' :
                annotation.changeType === 'status-change' ? 'bg-yellow-500' :
                'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{annotation.changeSummary}</p>
                <p className="text-xs text-gray-500">
                  {annotation.userName} • {annotation.adminName} • {new Date(annotation.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};