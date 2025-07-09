import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import drones from '../data/drones';
import scenarios from '../data/scenarios';

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
}

const addons: Addon[] = [
  {
    id: 'drawing-mode',
    name: 'Drawing Mode',
    description: 'Create and follow custom flight paths with visual route planning',
    price: 499,
  },
  {
    id: 'automation-mode',
    name: 'Automation Mode',
    description: 'Program automated flight sequences and routines',
    price: 599,
  },
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    description: 'Track performance metrics and progress over time',
    price: 799,
  },
  {
    id: 'certificate',
    name: 'Digital Certificate',
    description: 'Receive official certification upon completion',
    price: 299,
  },
];

const CustomPlanSection: React.FC = () => {
  const { addItem } = useCart();
  const [selectedTab, setSelectedTab] = useState<'drones' | 'scenarios' | 'addons'>('drones');

  const handleAllDrones = () => {
    addItem({
      id: 'all-drones',
      name: 'All Drones Bundle',
      price: 1999,
      type: 'drone',
      stripe_price_id: 'price_1RcJttCKYG7gRDVPBkHPkocp'
    });
  };

  const handleAllScenarios = () => {
    addItem({
      id: 'all-scenarios',
      name: 'All Scenarios Bundle',
      price: 1999,
      type: 'scenario',
      stripe_price_id: 'price_1RcJttCKYG7gRDVPBkHPkocp'


    });
  };

  const handleAddAddon = (addon: Addon) => {
    addItem({
      id: addon.id,
      name: addon.name,
      price: addon.price,
      type: 'addon',
      stripe_price_id: 'price_1RcJttCKYG7gRDVPBkHPkocp'
    });
  };

  return (
    <section id="custom-plan" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build Your <span className="text-orange-500">Custom Plan</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create a personalized experience by selecting only the drones, scenarios, and features you need.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-5xl mx-auto">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                selectedTab === 'drones' 
                  ? 'text-orange-500 border-b-2 border-orange-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('drones')}
            >
              Select Drones
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                selectedTab === 'scenarios' 
                  ? 'text-orange-500 border-b-2 border-orange-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('scenarios')}
            >
              Select Scenarios
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                selectedTab === 'addons' 
                  ? 'text-orange-500 border-b-2 border-orange-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('addons')}
            >
              Add Features
            </button>
          </div>
          
          <div className="p-6">
            {selectedTab === 'drones' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Available Drones</h3>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={handleAllDrones}
                  >
                    Add All Drones ($1,999)
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drones
                    .filter(drone => !drone.includedIn.includes('free'))
                    .map(drone => (
                      <Card key={drone.id} className="flex p-4">
                        <img 
                          src={drone.image} 
                          alt={drone.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4" 
                        />
                        <div className="flex-grow">
                          <h4 className="font-medium">{drone.name}</h4>
                          <p className="text-sm text-gray-500 mb-2">{drone.description.slice(0, 60)}...</p>
                          <div className="flex justify-between items-center">
                            <span className="text-orange-500 font-semibold">${drone.price}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => addItem({
                                id: drone.id.toString(),
                                name: drone.name,
                                price: drone.price,
                                type: 'drone',
                                stripe_price_id: drone.stripe_price_id, // ✅ Needed for Stripe checkout

                              })}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}
            
            {selectedTab === 'scenarios' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Available Scenarios</h3>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={handleAllScenarios}
                  >
                    Add All Scenarios ($1,999)
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scenarios.map(scenario => (
                    <Card key={scenario.id} className="flex p-4">
                      <img 
                        src={scenario.image} 
                        alt={scenario.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4" 
                      />
                      <div className="flex-grow">
                        <h4 className="font-medium">{scenario.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{scenario.description.slice(0, 60)}...</p>
                        <div className="flex justify-between items-center">
                          <span className="text-orange-500 font-semibold">${scenario.price}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addItem({
                              id: scenario.id.toString(),
                              name: scenario.name,
                              price: scenario.price,
                              type: 'scenario',
                            stripe_price_id: scenario.stripe_price_id, // ✅ Needed for Stripe checkout

                            })}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {selectedTab === 'addons' && (
              <div>
                <h3 className="text-lg font-bold mb-6">Additional Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addons.map(addon => (
                    <Card key={addon.id} className="p-4">
                      <h4 className="font-medium mb-2">{addon.name}</h4>
                      <p className="text-sm text-gray-500 mb-4">{addon.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-orange-500 font-semibold">${addon.price}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddAddon(addon)}
                        >
                          Add
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPlanSection;