import React, { useRef } from 'react';
import HeroSection from '../sections/HeroSection';
import DronesSection from '../sections/DronesSection';
import ScenariosSection from '../sections/ScenariosSection';
import PlansSection from '../sections/PlansSection';
import CustomPlanSection from '../sections/CustomPlanSection';
import FeaturesSection from '../sections/FeaturesSection';
import CTASection from '../sections/CTASection';
import Navigation from '@/components/Navigation';

const HomePage: React.FC = () => {
    const planRef = useRef<HTMLDivElement>(null);
      const scrollToPlans = () => {
      planRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <main>
      <Navigation />
      <HeroSection scrollToPlans={scrollToPlans} />
      {/* <DronesSection /> */}
      {/* <ScenariosSection /> */}
      <div ref={planRef}>
  <PlansSection />
</div>
      {/* <CustomPlanSection /> */}
      <FeaturesSection />
      <CTASection scrollToPlans={scrollToPlans} />
    </main>
  );
};

export default HomePage;