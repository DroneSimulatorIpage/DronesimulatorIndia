import React, { useState } from 'react';
import { Package, Edit, Plus, TrendingUp, Users, DollarSign, Settings, Eye, EyeOff } from 'lucide-react';
import { useData } from '../../hooks/useData';

export const MasterProducts: React.FC = () => {
  const { drones, scenarios, updateDronePrice, updateScenarioPrice, addDrone, addScenario } = useData();
  const [activeTab, setActiveTab] = useState<'drones' | 'scenarios'>('drones');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  const handlePriceUpdate = (id: string, newPrice: number) => {
    if (activeTab === 'drones') {
      updateDronePrice(id, newPrice);
    } else {
      updateScenarioPrice(id, newPrice);
    }
    setEditingItem(null);
  };

  const startEdit = (id: string, currentPrice: number) => {
    setEditingItem(id);
    setEditPrice(currentPrice);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Photography': 'bg-blue-100 text-blue-800',
      'Professional': 'bg-purple-100 text-purple-800',
      'Cinematic': 'bg-indigo-100 text-indigo-800',
      'Compact': 'bg-green-100 text-green-800',
      'Advanced': 'bg-red-100 text-red-800',
      'Racing': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Navigation': 'bg-blue-100 text-blue-800',
      'Photography': 'bg-green-100 text-green-800',
      'Emergency': 'bg-red-100 text-red-800',
      'Agriculture': 'bg-yellow-100 text-yellow-800',
      'Commercial': 'bg-purple-100 text-purple-800',
      'Racing': 'bg-orange-100 text-orange-800',
      'Training': 'bg-indigo-100 text-indigo-800',
      'Advanced': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Calculate statistics
  const totalDroneRevenue = drones.reduce((sum, drone) => sum + drone.price, 0);
  const totalScenarioRevenue = scenarios.reduce((sum, scenario) => sum + scenario.price, 0);
  const avgDronePrice = totalDroneRevenue / drones.length;
  const avgScenarioPrice = totalScenarioRevenue / scenarios.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-500 mt-1">Manage drone and scenario pricing, features, and availability</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Drones</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{drones.length}</p>
              <p className="text-sm text-blue-600 mt-1">Available models</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Scenarios</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{scenarios.length}</p>
              <p className="text-sm text-green-600 mt-1">Training modules</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Drone Price</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">${avgDronePrice.toFixed(0)}</p>
              <p className="text-sm text-purple-600 mt-1">Per month</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Scenario Price</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">${avgScenarioPrice.toFixed(0)}</p>
              <p className="text-sm text-yellow-600 mt-1">Per month</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('drones')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'drones'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Drones ({drones.length})
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'scenarios'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Scenarios ({scenarios.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'drones' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drones.map((drone) => (
                <div key={drone.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{drone.name}</h3>
                    <button
                      onClick={() => startEdit(drone.id, drone.price)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(drone.type)}`}>
                        {drone.type}
                      </span>
                      <div className="text-right">
                        {editingItem === drone.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(Number(e.target.value))}
                              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                            />
                            <button
                              onClick={() => handlePriceUpdate(drone.id, editPrice)}
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-green-600">${drone.price}/month</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {drone.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Usage in Custom Plans</span>
                        <span className="font-medium text-gray-900">12 users</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{scenario.name}</h3>
                    <button
                      onClick={() => startEdit(scenario.id, scenario.price)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(scenario.category)}`}>
                          {scenario.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(scenario.difficulty)}`}>
                          {scenario.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      {editingItem === scenario.id ? (
                        <div className="flex items-center justify-end space-x-2">
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                          <button
                            onClick={() => handlePriceUpdate(scenario.id, editPrice)}
                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-green-600">${scenario.price}/month</span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600">{scenario.description}</p>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Usage in Custom Plans</span>
                        <span className="font-medium text-gray-900">8 users</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Drones</h3>
          <div className="space-y-4">
            {drones.slice(0, 5).map((drone, index) => (
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
                  <p className="text-sm font-semibold text-green-600">${drone.price}/month</p>
                  <p className="text-xs text-gray-500">{12 - index * 2} users</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Scenarios</h3>
          <div className="space-y-4">
            {scenarios.slice(0, 5).map((scenario, index) => (
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
                  <p className="text-sm font-semibold text-green-600">${scenario.price}/month</p>
                  <p className="text-xs text-gray-500">{10 - index * 1} users</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};