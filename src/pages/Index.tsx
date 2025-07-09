import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TutorialsPreview from "@/components/TutorialsPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import FlyToWinBanner from "@/components/Flytowinbanner";
import WelcomePopup from "@/components/Wlcomepopup"; // Assuming this component is required

const Index = () => {
  return (
    <>
      <WelcomePopup />
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeroSection />
        <FlyToWinBanner />
        <FeaturesSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
