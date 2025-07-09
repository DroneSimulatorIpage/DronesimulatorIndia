import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import Select from 'react-select';
import { Plan } from '../../hooks/useData';

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: Omit<Plan, 'id' | 'activeUsers'> & { drones: string[]; scenarios: string[] }) => void;
}

const droneOptions = [
  { value: 'DJI Mavic', label: 'DJI Mavic' },
  { value: 'Phantom 4', label: 'Phantom 4' },
  { value: 'Agriculture Drone', label: 'Agriculture Drone' },
  { value: 'Racing Drone', label: 'Racing Drone' }
];

const scenarioOptions = [
  { value: 'Wind Simulation', label: 'Wind Simulation' },
  { value: 'GPS Loss', label: 'GPS Loss' },
  { value: 'Return To Home', label: 'Return To Home' },
  { value: 'Battery Failure', label: 'Battery Failure' }
];

export const AddPlanModal: React.FC<AddPlanModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    features: [''],
    visibility: 'public' as 'public' | 'hidden',
    userType: 'Student' as 'Student' | 'Pro' | 'Institution',
    color: 'blue',
    drones: [] as string[],
    scenarios: [] as string[]
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (formData.name && formData.price > 0) {
      onSave({
        ...formData,
        features: formData.features.filter(f => f.trim() !== '')
      });
      onClose();
      setFormData({
        name: '',
        price: 0,
        features: [''],
        visibility: 'public',
        userType: 'Student',
        color: 'blue',
        drones: [],
        scenarios: []
      });
    }
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f))
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Plan</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Premium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="29"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value as 'public' | 'hidden' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="public">Public</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
              <select
                value={formData.userType}
                onChange={(e) => setFormData(prev => ({ ...prev, userType: e.target.value as 'Student' | 'Pro' | 'Institution' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Student">Student</option>
                <option value="Pro">Pro</option>
                <option value="Institution">Institution</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Drones Included</label>
              <Select
                isMulti
                options={droneOptions}
                value={droneOptions.filter(opt => formData.drones.includes(opt.value))}
                onChange={(selected) =>
                  setFormData(prev => ({
                    ...prev,
                    drones: selected.map(opt => opt.value)
                  }))
                }
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scenarios Included</label>
              <Select
                isMulti
                options={scenarioOptions}
                value={scenarioOptions.filter(opt => formData.scenarios.includes(opt.value))}
                onChange={(selected) =>
                  setFormData(prev => ({
                    ...prev,
                    scenarios: selected.map(opt => opt.value)
                  }))
                }
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Feature description"
                  />
                  {formData.features.length > 1 && (
                    <button
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addFeature}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Feature</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};