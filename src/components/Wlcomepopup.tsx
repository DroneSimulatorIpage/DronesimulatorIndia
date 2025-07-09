import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('welcomePopupShown');
    if (!shown) {
      setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('welcomePopupShown', 'true');
      }, 1000);
    }
  }, []);

  const handleClose = () => setIsVisible(false);
  const navigate = useNavigate();
const handleGetStarted = () => {
  navigate('/download');
  handleClose();
};


  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[380px] sm:max-w-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden flex mx-4"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 bg-white hover:bg-gray-100 rounded-full p-1.5 shadow transition-colors"
        >
          <X className="h-3.5 w-3.5 text-gray-700" />
        </button>

        {/* Left Image Section - Optimized for mobile */}
        <div className="w-[38%] bg-gradient-to-br from-orange-500 to-orange-600 flex flex-col items-center justify-center relative rounded-l-2xl">
  {/* Student/Drone Pilot Image */}
  <div className="relative flex items-center justify-center h-auto w-full">
    <img
      src="/images/Student.png"
      alt="Drone Pilot Student"
      className="object-contain h-[220px] w-auto mx-auto"
      onError={(e) => {
        e.currentTarget.src =
          "https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=400";
      }}
    />
  </div>

  {/* Decorative Elements */}
  <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
  <div className="absolute bottom-4 right-3 w-2 h-2 bg-white/20 rounded-full"></div>
</div>

        {/* Right Text Section */}
        <div className="w-[62%] p-3 space-y-2.5 text-left flex flex-col justify-center">
          <h2 className="text-xs sm:text-base font-bold text-orange-600 leading-tight">
            Win DGCA Certificate<br />Worth ₹45,000!
          </h2>
          <p className="text-[10px] sm:text-sm text-gray-700 leading-snug">
            Fly <strong>2h 30m</strong> using our simulator & get eligible for a <strong>DGCA Certificate</strong>.
          </p>
          <div className="bg-orange-50 border border-orange-300 rounded-lg p-2.5 text-[10px] sm:text-xs text-gray-700 space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0"></div>
              <span>Realistic flying experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0"></div>
              <span>Fly-to-Win competition access</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0"></div>
              <span>Official DGCA recognition</span>
            </div>
          </div>
          <button
            onClick={handleGetStarted}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-lg text-xs sm:text-sm font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Get Started Now
          </button>
          <div className="text-[8px] sm:text-[10px] text-gray-400 text-right">
  <button
    onClick={() => navigate('/flytowin')}
    className="hover:underline hover:text-gray-600 transition-colors"
  >
    Terms & Conditions apply
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;