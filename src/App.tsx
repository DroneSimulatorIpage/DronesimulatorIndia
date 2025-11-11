import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Tutorials from "./pages/Tutorials";
import Download from "./pages/Download";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductApp from "./pages/products/src/ProductApp";
import { CartProvider } from "./pages/products/src/context/CartContext";
import AdminDash from "./pages/Admindashboard/src/AdminDash";
import AppAuth from "./pages/Login/src/App";
import UniversalContactForm from "./pages/UniversalContactForm";
import PrivacyPolicy from "./pages/Admindashboard/src/pages/PrivacyPolicy";
import TermsAndConditions from "./pages/Admindashboard/src/pages/termsandcondi";
import CookiePolicy from "./pages/Admindashboard/src/pages/cookiepolicy";
import RefundPolicy from "./pages/Admindashboard/src/pages/refundpolicy";
import GeneralPolicy from "./pages/Admindashboard/src/pages/generalpolicy";
import HelpPage from "./pages/Admindashboard/src/pages/help"; // Always mounted
import ScrollToTop from "./components/scrolltop";
import FlyToSkyPage from "./pages/FlyToSkyPage";
const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/download" element={<Download />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/product/*" element={<ProductApp />} />
            <Route path="/Dash/*" element={<AdminDash />} />
            <Route path="/auth/*" element={<AppAuth />} />
            <Route path="/salesform" element={<UniversalContactForm />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/cookie" element={<CookiePolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/general" element={<GeneralPolicy />} />
            
<Route path="/flytowin" element={<FlyToSkyPage />} />
            <Route path="*" element={<NotFound />} />
              <Route path="/contact" element={<><Index /><HelpPage /></>} />
          </Routes>
          <HelpPage /> {/* ✅ Always mounted drawer */}
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;