// ✅ Full replacement of MasterIncome component with same UI structure but using dynamic data

import React, { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Calendar, ArrowUpRight, Download, Filter } from 'lucide-react';
import { CustomDateFilter } from '../../components/common/CustomDateFilter';

export const MasterIncome: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [customDateRange, setCustomDateRange] = useState<{ start: string; end: string } | null>(null);

  const handleDateFilterChange = (value: string, customRange?: { start: string; end: string }) => {
    setMonthFilter(value);
    if (customRange) {
      setCustomDateRange(customRange);
    } else {
      setCustomDateRange(null);
    }
  };

  useEffect(() => {
  const fetchData = async () => {
    const token = sessionStorage.getItem('drone_auth_token');
    if (!token) {
      console.error('No auth token found in sessionStorage.');
      setLoading(false);
      return;
    }

    try {
      const [analyticsRes, transactionsRes] = await Promise.all([
        fetch('https://34-47-194-149.nip.io/api/stripe/analytics/', {
          headers: { Authorization: `Token ${token}` },
        }),
        fetch('https://34-47-194-149.nip.io/api/stripe/transactions/', {
          headers: { Authorization: `Token ${token}` },
        }),
      ]);

      if (!analyticsRes.ok || !transactionsRes.ok) {
        console.error('Invalid or expired token.');
        setLoading(false);
        return;
      }

      const analyticsData = await analyticsRes.json();
      const transactionData = await transactionsRes.json();
      setAnalytics(analyticsData || {});
      setTransactions(transactionData.results || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

  const filteredRecords = transactions.filter(record => {
    const matchesPlan = planFilter === 'all' || record.plan_name === planFilter;
    const matchesPayment = paymentMethodFilter === 'all' || record.payment_method === paymentMethodFilter;
    let matchesMonth = true;
    if (monthFilter !== 'all') {
      const recordDate = new Date(record.payment_date);
      const now = new Date();
      if (monthFilter === 'custom' && customDateRange) {
        const startDate = new Date(customDateRange.start);
        const endDate = new Date(customDateRange.end);
        matchesMonth = recordDate >= startDate && recordDate <= endDate;
      } else {
        const monthsDiff = (now.getFullYear() - recordDate.getFullYear()) * 12 + (now.getMonth() - recordDate.getMonth());
        switch (monthFilter) {
          case 'today':
            matchesMonth = recordDate.toDateString() === now.toDateString(); break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesMonth = recordDate >= weekAgo; break;
          case 'month':
            matchesMonth = monthsDiff === 0; break;
          case 'quarter':
            matchesMonth = monthsDiff <= 3; break;
          case 'year':
            matchesMonth = monthsDiff <= 12; break;
          case 'last7':
            const last7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesMonth = recordDate >= last7; break;
          case 'last30':
            const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesMonth = recordDate >= last30; break;
          case 'last90':
            const last90 = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            matchesMonth = recordDate >= last90; break;
        }
      }
    }
    return matchesPlan && matchesPayment && matchesMonth;
  });

  const exportToCSV = () => {
    const headers = ['Date', 'User', 'Plan', 'Amount', 'Payment Method', 'Status'];
    const csvData = filteredRecords.map(record => [
      record.payment_date,
      record.user_name,
      record.plan_display_name,
      record.amount,
      record.payment_method,
      record.payment_status_display
    ]);
    const csvContent = [headers, ...csvData].map(row => row.map(f => `"${f}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `income_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Month-on-Month Income</h1>
          <p className="text-gray-500 mt-1">Track revenue trends and subscription growth</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">${analytics?.total_revenue || 0}</p>
              <p className="text-sm text-green-600 mt-1">
                {new Date(analytics?.period_start || new Date().toISOString()).toLocaleDateString()} - {new Date(analytics?.period_end || new Date().toISOString()).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Transaction</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">${analytics?.average_transaction_value || 0}</p>
              <p className="text-sm text-blue-600 mt-1">Per user</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{analytics?.total_transactions || 0}</p>
              <p className="text-sm text-purple-600 mt-1">Success: {analytics?.successful_payments || 0}, Fail: {analytics?.failed_payments || 0}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <CustomDateFilter value={monthFilter} onChange={handleDateFilterChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Plans</option>
              {[...new Set(transactions.map(t => t.plan_name))].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Methods</option>
              {[...new Set(transactions.map(t => t.payment_method))].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setMonthFilter('all');
                setPlanFilter('all');
                setPaymentMethodFilter('all');
                setCustomDateRange(null);
              }}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <span className="text-sm text-gray-500">{filteredRecords.length} transactions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map(record => (
                <tr key={record.transaction_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.user_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800">{record.plan_display_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{record.formatted_amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{record.payment_method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(record.payment_date).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      record.payment_status === 'succeeded' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {record.payment_status_display}
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
