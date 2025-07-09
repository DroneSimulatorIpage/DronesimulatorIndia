import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

interface CTASectionProps {
  scrollToPlans: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ scrollToPlans }) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Join 500+ drone learners who <span className="text-orange-500">simulate smarter</span> with IPage Drone Simulator
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Start your drone piloting journey today with our comprehensive simulation platform. 
          Learn, practice, and master drone flight in a risk-free environment.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" onClick={scrollToPlans}>
            Start Free 15-Day Trial
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/salesform')}>
            Book Demo for Your Institution
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div>
            <div className="text-3xl font-bold text-orange-500">500+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500">50+</div>
            <div className="text-gray-400">Institutions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500">6</div>
            <div className="text-gray-400">Drone Models</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500">7</div>
            <div className="text-gray-400">Training Scenarios</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
