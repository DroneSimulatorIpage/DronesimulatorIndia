import React from 'react';
import FeatureCard from '../components/FeatureCard';
import features from '../data/features';

const FeaturesSection: React.FC = () => {
  return (
   <section id="features" className="py-16 bg-white text-center">
  <div className="container mx-auto px-4">
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Key <span className="text-orange-500">Features</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Discover what makes IPage Drone Simulator the leading choice for drone pilots across world.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  </div>
</section>

  );
};

export default FeaturesSection;