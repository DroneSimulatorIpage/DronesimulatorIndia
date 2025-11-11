import React, { useState } from 'react';
import { Package, Edit, Plus, TrendingUp, Users, DollarSign, Settings, Eye, Filter, Trash2 } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { AddDroneModal } from '../../components/modals/AddDroneModal';
import { AddScenarioModal } from '../../components/modals/AddScenarioModal';

export const AdminProducts: React.FC = () => {
  const { drones, scenarios, updateDronePrice, updateScenarioPrice, addDrone, addScenario } = useData();
  const [activeTab, setActiveTab] = useState<'drones' | 'scenarios'>('drones');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddDroneModal, setShowAddDroneModal] = useState(false);
  const [showAddScenarioModal, setShowAddScenarioModal] = useState(false);

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

  const handleAddDrone = (droneData: any) => {
    addDrone(droneData);
    setShowAddDroneModal(false);
  };

  const handleAddScenario = (scenarioData: any) => {
    addScenario(scenarioData);
    setShowAddScenarioModal(false);
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

  // Filter scenarios by category
  const filteredScenarios = categoryFilter === 'all' 
    ? scenarios 
    : scenarios.filter(scenario => scenario.category === categoryFilter);

  const uniqueCategories = [...new Set(scenarios.map(s => s.category))];

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
          <p className="text-gray-500 mt-1">Manage drone and scenario pricing, add new products, and track usage</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => activeTab === 'drones' ? setShowAddDroneModal(true) : setShowAddScenarioModal(true)}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add {activeTab === 'drones' ? 'Drone' : 'Scenario'}</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Drones</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{drones.length}</p>
              <p className="text-sm text-blue-600 mt-1">Models</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Scenarios</p>
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
          <div className="flex items-center justify-between px-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('drones')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'drones'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Drones ({drones.length})
              </button>
              <button
                onClick={() => setActiveTab('scenarios')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'scenarios'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Scenarios ({scenarios.length})
              </button>
            </nav>

            {activeTab === 'scenarios' && (
              <div className="flex items-center space-x-3 py-4">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'drones' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Drone Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Features
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {drones.map((drone) => (
                    <tr key={drone.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{drone.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(drone.type)}`}>
                          {drone.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {drone.features.slice(0, 2).map((feature, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                          {drone.features.length > 2 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              +{drone.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                          <span className="text-sm font-semibold text-green-600">${drone.price}/month</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{12 - parseInt(drone.id)} users</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => startEdit(drone.id, drone.price)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors p-1"
                            title="Edit Price"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 transition-colors p-1"
                            title="Delete Drone"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scenario Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredScenarios.map((scenario) => (
                    <tr key={scenario.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Settings className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{scenario.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(scenario.category)}`}>
                          {scenario.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(scenario.difficulty)}`}>
                          {scenario.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {scenario.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === scenario.id ? (
                          <div className="flex items-center space-x-2">
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
                          <span className="text-sm font-semibold text-green-600">${scenario.price}/month</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{10 - parseInt(scenario.id)} users</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => startEdit(scenario.id, scenario.price)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors p-1"
                            title="Edit Price"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 transition-colors p-1"
                            title="Delete Scenario"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Usage Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Drones</h3>
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
                  <p className="text-sm font-semibold text-gray-900">{12 - index * 2} users</p>
                  <p className="text-xs text-green-600">${drone.price}/month</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Scenarios</h3>
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
                  <p className="text-sm font-semibold text-gray-900">{10 - index * 1} users</p>
                  <p className="text-xs text-green-600">${scenario.price}/month</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Product Modals */}
      <AddDroneModal
        isOpen={showAddDroneModal}
        onClose={() => setShowAddDroneModal(false)}
        onSave={handleAddDrone}
      />

      <AddScenarioModal
        isOpen={showAddScenarioModal}
        onClose={() => setShowAddScenarioModal(false)}
        onSave={handleAddScenario}
      />
    </div>
  );
};