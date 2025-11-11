import React from 'react';
import { ShoppingCart, Star, Info } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Scenario } from '../types';
import Badge from './Badge';
import { useCart } from '../context/CartContext';

interface ScenarioCardProps {
  scenario: Scenario;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
  const { addItem } = useCart();
  
  const IconComponent = (LucideIcons as any)[
    scenario.icon.charAt(0).toUpperCase() + scenario.icon.slice(1)
  ] || LucideIcons.Activity;

  const handleAddToCart = () => {
    addItem({
      id: scenario.id.toString(),
      name: scenario.name,
      price: scenario.price,
      type: 'scenario',
    });
  };

  return (
    <div className="w-[320px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-xl overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48">
        <img 
          src={scenario.image}
          alt={scenario.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{scenario.name}</h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={`${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400/50 fill-yellow-400/50'}`} 
                />
              ))}
              <span className="ml-2 text-white/80 text-xs">1k Reviews</span>
            </div>
          </div>
          {scenario.includedIn.includes('free') ? (
            <Badge variant="success">Free</Badge>
          ) : scenario.includedIn.includes('pro') ? (
            <Badge variant="primary">Pro</Badge>
          ) : (
            <span className="text-xl font-bold text-white">${scenario.price}</span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <IconComponent size={24} className="text-orange-500" />
          </div>
          <p className="text-gray-300 text-sm flex-1">{scenario.description}</p>
        </div>
        
        <div className="flex items-stretch gap-2">
          <button 
            onClick={handleAddToCart}
            className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors"
          >
            <ShoppingCart size={20} className="text-white" />
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;