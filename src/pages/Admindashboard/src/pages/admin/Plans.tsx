import React, { useState } from 'react';
import { CreditCard, Edit, ToggleLeft, ToggleRight, Users, Eye, EyeOff } from 'lucide-react';
import { useData } from '../../hooks/useData';

export const AdminPlans: React.FC = () => {
  const { plans, updatePlan } = useData();
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const handleEditStart = (plan: any) => {
    setEditingPlan(plan.id);
    setEditData(plan);
  };

  const handleSave = () => {
    if (editingPlan) {
      updatePlan(editingPlan, editData);
      setEditingPlan(null);
      setEditData({});
    }
  };

  const toggleVisibility = (planId: string, currentVisibility: string) => {
    updatePlan(planId, { 
      visibility: currentVisibility === 'public' ? 'hidden' : 'public' 
    });
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'gray': return 'bg-gray-100 text-gray-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'Student': return 'bg-green-100 text-green-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Institution': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Plans & Access Control</h1>
        <p className="text-gray-500 mt-1">Manage plan availability and pricing (Admin access only)</p>
      </div>

      {/* Plans Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${getColorClasses(plan.color)}`}>
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleVisibility(plan.id, plan.visibility)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title={plan.visibility === 'public' ? 'Hide plan' : 'Show plan'}
                >
                  {plan.visibility === 'public' ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <button 
                  onClick={() => handleEditStart(plan)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUserTypeColor(plan.userType)}`}>
                  {plan.userType}
                </span>
              </div>
              <div className="flex items-baseline space-x-1">
                {editingPlan === plan.id ? (
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) => setEditData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="text-3xl font-bold text-gray-900 w-20 border border-gray-300 rounded px-1"
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                )}
                <span className="text-gray-500">/month</span>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Active Users</span>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{plan.activeUsers}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Visibility</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  plan.visibility === 'public' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {plan.visibility}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Monthly Revenue</span>
                <span className="font-medium text-gray-900">
                  ${(plan.price * plan.activeUsers).toLocaleString()}
                </span>
              </div>

              {editingPlan === plan.id && (
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPlan(null)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Plans Summary Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Plans Summary</h2>
          <p className="text-sm text-gray-500 mt-1">Admin can edit pricing and visibility only</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(plan.color)}`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                        <div className="text-sm text-gray-500">{plan.userType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${plan.price}/month</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{plan.activeUsers}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${(plan.price * plan.activeUsers).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      plan.visibility === 'public' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {plan.visibility}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEditStart(plan)}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleVisibility(plan.id, plan.visibility)}
                      className="text-green-600 hover:text-green-900 transition-colors"
                    >
                      {plan.visibility === 'public' ? 'Hide' : 'Show'}
                    </button>
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