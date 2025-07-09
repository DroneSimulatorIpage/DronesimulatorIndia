import React from 'react';
import ScenarioCard from '../components/ScenarioCard';
import scenarios from '../data/scenarios';

const ScenariosSection: React.FC = () => {
  return (
    <section id="scenarios" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Training <span className="text-orange-500">Scenarios</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Practice in realistic environments specifically designed for various industries and applications, from agriculture to urban operations.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScenariosSection;