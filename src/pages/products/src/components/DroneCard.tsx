import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Drone } from '../types';
import Badge from './Badge';
import { useCart } from '../context/CartContext';

interface DroneCardProps {
  drone: Drone;
}

const DroneCard: React.FC<DroneCardProps> = ({ drone }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: drone.id.toString(),
      name: drone.name,
      price: drone.price,
      type: 'drone',
    });
  };

  return (
    <div className="w-[320px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-xl overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48">
        <img 
          src={drone.image} 
          alt={drone.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{drone.name}</h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={`${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400/50 fill-yellow-400/50'}`} 
                />
              ))}
            </div>
          </div>
          {drone.includedIn.includes('free') ? (
            <Badge variant="success">Free</Badge>
          ) : drone.includedIn.includes('pro') ? (
            <Badge variant="primary">Pro</Badge>
          ) : (
            <span className="text-xl font-bold text-white">${drone.price}</span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <p className="text-gray-300 text-sm mb-6">{drone.description}</p>
        
        <div className="flex items-stretch gap-2">
          <button 
            onClick={handleAddToCart}
            className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={drone.includedIn.includes('free')}
          >
            <ShoppingCart size={20} className="text-white" />
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={drone.includedIn.includes('free')}
          >
            {drone.includedIn.includes('free') ? 'Included in Free Plan' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DroneCard