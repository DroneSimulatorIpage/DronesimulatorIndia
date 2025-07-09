import React from 'react';
import { CartProvider } from './context/CartContext';
import Footer from '@/components/Footer';
import MiniCart from './components/MiniCart';
import HeroSection from './sections/HeroSection';
import DronesSection from './sections/DronesSection';
import ScenariosSection from './sections/ScenariosSection';
import PlansSection from './sections/PlansSection';
import CustomPlanSection from './sections/CustomPlanSection';
import FeaturesSection from './sections/FeaturesSection';
import CTASection from './sections/CTASection';
import Navigation from '@/components/Navigation';

function Product() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <main>
          <Navigation />
          <HeroSection />
          <DronesSection />
          <ScenariosSection />
          <PlansSection />
          <CustomPlanSection />
          <FeaturesSection />
          <CTASection />
        </main>
        <Footer />
        <MiniCart />
      </div>
    </CartProvider>
  );
}

export default Product;