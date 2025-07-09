import React from 'react';
import DroneCard from '../components/DroneCard';
import drones from '../data/drones';

const DronesSection: React.FC = () => {
  return (
    <section id="drones" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our <span className="text-orange-500">Drone Fleet</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our extensive collection of meticulously simulated drones, each designed to provide authentic flight experiences across various applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {drones.map((drone) => (
            <DroneCard key={drone.id} drone={drone} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-2">Want to add all drones to your custom plan?</p>
          <p className="text-lg font-semibold text-orange-500">Get all drones for just $1,999</p>
        </div>
      </div>
    </section>
  );
};

export default DronesSection;