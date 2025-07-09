import React, { useState } from 'react';
import { Users as UsersIcon, Search, Filter, Edit, Eye, Settings, Calendar } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { EditUserModal } from '../../components/modals/EditUserModal';
import { useAuth } from '../../hooks/useAuth';

export const AdminUsers: React.FC = () => {
  const { users, plans, drones, scenarios, updateUserPlan, updateUserAddOns, updateCustomPlan } = useData();
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesPlan = planFilter === 'all' || user.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleEditUser = (userId: string, newPlan: string, addOns: any, customPlan?: any) => {
    updateUserPlan(userId, newPlan, currentUser?.name || 'Admin User');
    updateUserAddOns(userId, addOns, currentUser?.name || 'Admin User');
    
    if (newPlan === 'Custom' && customPlan) {
      updateCustomPlan(userId, customPlan, currentUser?.name || 'Admin User');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Demo': return 'bg-gray-100 text-gray-800';
      case 'Free': return 'bg-red-100 text-red-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Institutional': return 'bg-purple-100 text-purple-800';
      case 'Enterprise': return 'bg-indigo-100 text-indigo-800';
      case 'Custom': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getPaymentStatus = (user: any) => {
    if (user.plan === 'Free') return { status: 'Free Plan', color: 'text-gray-500' };
    
    if (!user.nextPaymentDate) return { status: 'No Payment Due', color: 'text-gray-500' };
    
    const nextPayment = new Date(user.nextPaymentDate);
    const today = new Date();
    const daysUntilPayment = Math.ceil((nextPayment.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilPayment < 0) {
      return { status: 'Overdue', color: 'text-red-600' };
    } else if (daysUntilPayment <= 7) {
      return { status: `Due in ${daysUntilPayment} days`, color: 'text-yellow-600' };
    } else {
      return { status: `Due in ${daysUntilPayment} days`, color: 'text-green-600' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Overview</h1>
          <p className="text-gray-500 mt-1">Monitor and manage user accounts and subscriptions</p>
        </div>
        <div className="text-sm text-gray-600">
          Total: {users.length} users • Active: {users.filter(u => u.status === 'Active').length}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          
          <div>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Plans</option>
              {plans.map(plan => (
                <option key={plan.id} value={plan.name}>{plan.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan & Configuration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const paymentStatus = getPaymentStatus(user);
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <UsersIcon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(user.plan)}`}>
                          {user.plan}
                        </span>
                        
                        {user.plan === 'Custom' && user.customPlan ? (
                          <div className="space-y-1">
                            <div className="text-xs text-gray-600">
                              <strong>Drones:</strong> {user.customPlan.selectedDrones.slice(0, 2).join(', ')}
                              {user.customPlan.selectedDrones.length > 2 && ` +${user.customPlan.selectedDrones.length - 2} more`}
                            </div>
                            <div className="text-xs text-gray-600">
                              <strong>Scenarios:</strong> {user.customPlan.selectedScenarios.slice(0, 2).join(', ')}
                              {user.customPlan.selectedScenarios.length > 2 && ` +${user.customPlan.selectedScenarios.length - 2} more`}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(user.addOns).map(([key, value]) => 
                              value && (
                                <span key={key} className="inline-flex px-1 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                                  {key}
                                </span>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-green-600">
                          ${user.paidAmount || 0}/month
                        </div>
                        {user.paymentDate && (
                          <div className="text-xs text-gray-500">
                            Last: {formatDate(user.paymentDate)}
                          </div>
                        )}
                        {user.nextPaymentDate && (
                          <div className={`text-xs ${paymentStatus.color}`}>
                            {paymentStatus.status}
                          </div>
                        )}
                        {user.plan === 'Custom' && user.customPlan && (
                          <div className="text-xs text-gray-500">
                            Custom pricing
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => window.location.href = `/admin/users/${user.id}`}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingUser(user.id)}
                          className="text-green-600 hover:text-green-900 transition-colors p-1"
                          title="Edit Plan"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {user.plan === 'Custom' && (
                          <button
                            className="text-purple-600 hover:text-purple-900 transition-colors p-1"
                            title="Custom Plan Details"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                        )}
                        {user.nextPaymentDate && (
                          <button
                            className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                            title="Payment Schedule"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          user={users.find(u => u.id === editingUser)!}
          plans={plans.map(p => p.name)}
          drones={drones}
          scenarios={scenarios}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleEditUser}
        />
      )}
    </div>
  );
};