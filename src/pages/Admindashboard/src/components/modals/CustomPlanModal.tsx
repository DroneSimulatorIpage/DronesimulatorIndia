import React, { useState } from 'react';
import { X, Plus, Minus, Calculator } from 'lucide-react';
import { Drone, Scenario } from '../../hooks/useData';

interface CustomPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedDrones: string[], selectedScenarios: string[], totalPrice: number) => void;
  drones: Drone[];
  scenarios: Scenario[];
  initialDrones?: string[];
  initialScenarios?: string[];
}

export const CustomPlanModal: React.FC<CustomPlanModalProps> = ({
  isOpen,
  onClose,
  onSave,
  drones,
  scenarios,
  initialDrones = [],
  initialScenarios = []
}) => {
  const [selectedDrones, setSelectedDrones] = useState<string[]>(initialDrones);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(initialScenarios);

  if (!isOpen) return null;

  const toggleDrone = (droneName: string) => {
    setSelectedDrones(prev => 
      prev.includes(droneName) 
        ? prev.filter(d => d !== droneName)
        : [...prev, droneName]
    );
  };

  const toggleScenario = (scenarioName: string) => {
    setSelectedScenarios(prev => 
      prev.includes(scenarioName) 
        ? prev.filter(s => s !== scenarioName)
        : [...prev, scenarioName]
    );
  };

  const calculateTotalPrice = () => {
    const dronePrice = selectedDrones.reduce((total, droneName) => {
      const drone = drones.find(d => d.name === droneName);
      return total + (drone?.price || 0);
    }, 0);

    const scenarioPrice = selectedScenarios.reduce((total, scenarioName) => {
      const scenario = scenarios.find(s => s.name === scenarioName);
      return total + (scenario?.price || 0);
    }, 0);

    return dronePrice + scenarioPrice;
  };

  const totalPrice = calculateTotalPrice();

  const handleSave = () => {
    if (selectedDrones.length > 0 && selectedScenarios.length > 0) {
      onSave(selectedDrones, selectedScenarios, totalPrice);
      onClose();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Configure Custom Plan</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Drones Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Drones</h3>
              <div className="space-y-3">
                {drones.map((drone) => (
                  <div
                    key={drone.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedDrones.includes(drone.name)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleDrone(drone.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{drone.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-green-600">
                          ${drone.price}/month
                        </span>
                        {selectedDrones.includes(drone.name) ? (
                          <Minus className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Plus className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{drone.type}</p>
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
                ))}
              </div>
            </div>

            {/* Scenarios Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Scenarios</h3>
              <div className="space-y-3">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedScenarios.includes(scenario.name)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleScenario(scenario.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{scenario.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-green-600">
                          ${scenario.price}/month
                        </span>
                        {selectedScenarios.includes(scenario.name) ? (
                          <Minus className="w-4 h-4 text-green-600" />
                        ) : (
                          <Plus className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{scenario.category}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(scenario.difficulty)}`}>
                        {scenario.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{scenario.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Plan Summary</h3>
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">${totalPrice}/month</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Selected Drones ({selectedDrones.length})</h4>
                {selectedDrones.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedDrones.map((droneName) => {
                      const drone = drones.find(d => d.name === droneName);
                      return (
                        <li key={droneName} className="flex justify-between text-sm">
                          <span className="text-gray-700">{droneName}</span>
                          <span className="text-green-600">${drone?.price}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No drones selected</p>
                )}
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Selected Scenarios ({selectedScenarios.length})</h4>
                {selectedScenarios.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedScenarios.map((scenarioName) => {
                      const scenario = scenarios.find(s => s.name === scenarioName);
                      return (
                        <li key={scenarioName} className="flex justify-between text-sm">
                          <span className="text-gray-700">{scenarioName}</span>
                          <span className="text-green-600">${scenario?.price}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No scenarios selected</p>
                )}
              </div>
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
            disabled={selectedDrones.length === 0 || selectedScenarios.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Save Custom Plan (${totalPrice}/month)</span>
          </button>
        </div>
      </div>
    </div>
  );
};