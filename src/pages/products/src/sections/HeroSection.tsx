import React from 'react';
import Button from '../components/Button';

interface HeroSectionProps {
  scrollToPlans: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToPlans }) => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <img
          src="https://images.pexels.com/photos/442589/pexels-photo-442589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Drone simulator background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="text-orange-500">Train. Simulate. Fly.</span>
            <br />Anywhere. Anytime.
          </h1>

          <h2 className="text-xl md:text-2xl mb-8 text-gray-200">
            World's most versatile drone simulator – Real drones. Real scenarios. Real learning.
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
           
            <Button variant="outline" size="lg" onClick={scrollToPlans}>
              Explore All Plans
            </Button>
          </div>

          {/* Ratings */}
          <div className="mt-12 flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                >
                  <img
                    src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center text-yellow-400 mb-1">
                ★★★★★ <span className="ml-1">4.9/5</span>
              </div>
              <p className="text-sm text-gray-300">Based on 200+ reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
          <path d="M0,64L60,80C120,96,240,128,360,128C480,128,600,96,720,80C840,64,960,64,1080,69.3C1200,75,1320,85,1380,90.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
