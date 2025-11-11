import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const IconComponent = (LucideIcons as any)[
    feature.icon.charAt(0).toUpperCase() + feature.icon.slice(1)
  ] || LucideIcons.Activity;

  return (
    <div className="w-[320px] bg-white rounded-[2rem] shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative h-32 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
        <IconComponent size={48} className="text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
          <IconComponent size={24} className="text-orange-500" />
        </div>
      </div>
      
      <div className="px-6 pt-10 pb-6 text-center">
        <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.name}</h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    </div>
  );
};

export default FeatureCard