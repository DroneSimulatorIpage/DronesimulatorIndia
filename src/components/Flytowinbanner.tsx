import React from 'react';
import { Trophy, Gift, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FlyToWinBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/download');
  };

  // return (
  //   // <section className="py-4">
  //   //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //   //     <div 
  //   //       onClick={handleClick}
  //   //       className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 rounded-3xl cursor-pointer transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 min-w-[320px]"
  //   //     >
  //   //       {/* Animated Background Elements */}
  //   //       <div className="absolute inset-0 opacity-20">
  //   //         <div className="absolute top-0 left-0 w-28 h-28 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
  //   //         <div className="absolute bottom-0 right-0 w-20 h-20 bg-orange-300 rounded-full translate-x-12 translate-y-12 animate-bounce"></div>
  //   //         <div className="absolute top-1/3 left-1/4 w-14 h-14 bg-orange-200 rounded-full animate-ping"></div>
  //   //       </div>

  //   //       <div className="relative z-10 px-6 py-6 text-center">
  //   //         {/* Header with Icons */}
  //   //         <div className="flex justify-center items-center space-x-4 mb-4">
  //   //           <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 animate-spin-slow">
  //   //             <Trophy className="h-5 w-5 text-yellow-300" />
  //   //           </div>
  //   //           <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 animate-bounce">
  //   //             <Gift className="h-5 w-5 text-orange-200" />
  //   //           </div>
  //   //           <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 animate-pulse">
  //   //             <Zap className="h-5 w-5 text-yellow-300" />
  //   //           </div>
  //   //         </div>

  //   //         {/* Main Content */}
  //   //         <div className="space-y-4">
  //   //           <div className="space-y-2">
  //   //             <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
  //   //               🎯 FLY TO WIN
  //   //             </h2>
  //   //             <div className="text-lg md:text-xl font-bold text-yellow-300 animate-pulse">
  //   //               MEGA CAMPAIGN
  //   //             </div>
  //   //           </div>

  //   //           <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
  //   //             Special Offer for the First 100 Participants: Win a FREE DGCA Small Remote Pilot Training 
  //   //             Worth: ₹45,000. Winners: Anyone who completes 2h 30min of simulation, flies all 7 locations & scenarios, 
  //   //             and completes the social media tasks.
  //   //           </p>

  //   //           {/* Prize Highlights */}
  //   //           <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
  //   //             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
  //   //               <div className="text-lg font-bold text-yellow-300">₹45,000</div>
  //   //               <div className="text-sm text-white/80">DGCA Training Worth</div>
  //   //             </div>
  //   //             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
  //   //               <div className="text-lg font-bold text-yellow-300">100</div>
  //   //               <div className="text-sm text-white/80">Winners</div>
  //   //             </div>
  //   //             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
  //   //               <div className="text-lg font-bold text-yellow-300">2h 30min</div>
  //   //               <div className="text-sm text-white/80">Required Simulation Time</div>
  //   //             </div>
  //   //           </div>

  //   //           {/* CTA Button */}
  //   //           <div className="pt-2">
  //   //             <button className="group bg-white text-orange-600 px-5 py-3 rounded-full font-black text-base hover:bg-yellow-300 hover:text-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center mx-auto">
  //   //               <span>JOIN THE COMPETITION</span>
  //   //               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
  //   //             </button>
  //   //           </div>

  //   //           {/* Urgency Text */}
  //   //           <div className="text-sm text-yellow-200 animate-pulse">
  //   //             ⏰ Limited Time Offer - Campaign Ends Soon!
  //   //           </div>
  //   //         </div>
  //   //       </div>

  //   //       {/* Decorative Border */}
  //   //       <div className="absolute inset-0 rounded-3xl border-2 border-white/20"></div>
  //   //     </div>
  //   //   </div>
  //   // </section>
  // );
};

export default FlyToWinBanner;
