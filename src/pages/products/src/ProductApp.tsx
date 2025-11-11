import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import Footer from '@/components/Footer';
import MiniCart from './components/MiniCart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductApp = () => {
  const planRef = useRef<HTMLDivElement>(null);
    const scrollToPlans = () => {
    planRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
      <Footer />
      <MiniCart />
    </div>
  );
};

export default ProductApp;
