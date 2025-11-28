import React from 'react';
import PlanCard from '../components/PlanCard';
import plans from '../data/plans';

const PlansSection: React.FC = () => {
  return (
    <section id="plans" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-orange-500">Plan</span>
          </h2>
          <b><p className="text-l font-bold  max-w-2xl mx-auto">
            Select the perfect plan for your drone simulation needs, whether you're an student, individual learner or an institution training multiple pilots.
          </p></b>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {plans.map((plan) => (
              <div key={plan.id} className="relative group">
                {plan.mostPopular && (
                  <div className="absolute -top-7 left-0 right-0 flex justify-center z-10">
                    <div className="bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-105">
                      Most Popular
                    </div>
                  </div>
                )}
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
        
        {/* <div className="mt-16 text-center">
          <p className="text-xl font-semibold mb-4">Need a custom solution?</p>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Create your own plan by selecting specific drones, scenarios, and features that match your exact requirements.
          </p>
          <a 
            href="#custom-plan" 
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Build Your Custom Plan
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default PlansSection;