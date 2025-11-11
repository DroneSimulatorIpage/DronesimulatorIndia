import React, { useState } from 'react';
import { X, Save, Settings } from 'lucide-react';
import { User, Drone, Scenario } from '../../hooks/useData';
import { CustomPlanModal } from './CustomPlanModal';

interface EditUserModalProps {
  user: User;
  plans: string[];
  drones: Drone[];
  scenarios: Scenario[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: string, plan: string, addOns: User['addOns'], customPlan?: User['customPlan']) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  plans,
  drones,
  scenarios,
  isOpen,
  onClose,
  onSave
}) => {
  const [selectedPlan, setSelectedPlan] = useState(user.plan);
  const [addOns, setAddOns] = useState(user.addOns);
  const [customPlan, setCustomPlan] = useState(user.customPlan);
  const [showCustomPlanModal, setShowCustomPlanModal] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(user.id, selectedPlan, addOns, customPlan);
    onClose();
  };

  const handleAddOnChange = (addOn: keyof User['addOns']) => {
    setAddOns(prev => ({
      ...prev,
      [addOn]: !prev[addOn]
    }));
  };

  const handleCustomPlanSave = (selectedDrones: string[], selectedScenarios: string[], totalPrice: number) => {
    setCustomPlan({
      selectedDrones,
      selectedScenarios,
      totalPrice
    });
    setShowCustomPlanModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Edit User Plan</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              {user.paidAmount !== undefined && (
                <p className="text-sm font-medium text-green-600 mt-1">
                  Current Payment: ${user.paidAmount}/month
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subscription Plan
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
               {[
  { label: 'Demo', value: 'trial' },
  { label: 'Free', value: 'basic' },
  { label: 'Premium', value: 'premium' },
  { label: 'Custom', value: 'custom' },
].map(({ label, value }) => (
  <option key={value} value={value}>{label}</option>
))}
              </select>
            </div>

            {selectedPlan === 'Custom' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-green-900">Custom Plan Configuration</h4>
                  <button
                    onClick={() => setShowCustomPlanModal(true)}
                    className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configure</span>
                  </button>
                </div>
                
                {customPlan ? (
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-green-800">Selected Drones:</p>
                      <p className="text-sm text-green-700">{customPlan.selectedDrones.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Selected Scenarios:</p>
                      <p className="text-sm text-green-700">{customPlan.selectedScenarios.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Total Price: ${customPlan.totalPrice}/month</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-green-700">Click "Configure" to set up custom plan</p>
                )}
              </div>
            )}

            {selectedPlan !== 'Custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Add-ons
                </label>
                <div className="space-y-3">
                  {Object.entries(addOns).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleAddOnChange(key as keyof User['addOns'])}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {key} Module
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
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
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      <CustomPlanModal
        isOpen={showCustomPlanModal}
        onClose={() => setShowCustomPlanModal(false)}
        onSave={handleCustomPlanSave}
        drones={drones}
        scenarios={scenarios}
        initialDrones={customPlan?.selectedDrones}
        initialScenarios={customPlan?.selectedScenarios}
      />
    </>
  );
};