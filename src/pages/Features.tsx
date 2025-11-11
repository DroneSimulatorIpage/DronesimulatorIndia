import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import { useLocation } from 'react-router-dom';

interface Feature {
  title: string;
  description: string;
  images: string[];
  details: string[];
}

const FeaturesPage: React.FC = () => {
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const capabilitiesRef = useRef<HTMLDivElement | null>(null);

  const scrollToCapabilities = () => {
    capabilitiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Delay ensures it scrolls after load
    }
  }
}, [location]);
  const mainFeatures: Feature[] = [
    {
      title: "RPTO Ground Training (DGCA Compliant)",
      description: "Train with RPTO-compliant modules as per DGCA norms. Includes syllabus-based missions, geofencing, automation, and emergency drills with RTH, GPS loss, and battery fail scenarios.",
      images: [
        "/images/Feautures/1.jpg",
        "/images/Feautures/2.jpg",
        "/images/Feautures/3.jpg",
        "/images/Feautures/4.jpg",
        "/images/Feautures/5.jpg"

      ],

      details: [
        "DGCA syllabus-aligned scenarios",
        "Flight automation and waypoint missions",
        "Geofencing setup and safety boundaries",
        "Shape drawing for training drills (square, circle, linear)"
      ]
    },
    {
      title: "Real-Time Physics Engine & Metrics",
      description: "Adjust drone speed, control response, and weight dynamically with our real-time physics engine. Visualize altitude, speed, and orientation using in-flight metrics.",
      images: [
        "/images/Feautures/Drone_UI_HighClarity.jpg",

        "/images/Feautures/Drone_Settings_UI.jpg"
      ],
      details: [
        "Adjustable speed and drag settings",
        "Live metrics: Altitude, speed, orientation",
        "Control sensitivity calibration",
        "Physics-based response to input"
      ]
    },
    {
      title: "Thermal Inspection Integration",
      description: "Train with thermal cameras in critical scenarios like solar farms, power lines, and building inspections. Toggle thermal view to identify anomalies.",
      images: [
        "/images/Feautures/t1.jpg",
        "/images/Feautures/t2.jpg",
        "/images/Feautures/t3.jpg",
        "/images/Feautures/t4.jpg"
      ],
      details: [
        "Toggle between thermal and RGB mode",
        "High-temp anomaly detection",
        "Use cases: solar, electrical, building",
        "Infrared color palette customization"
      ]
    },
    {
      title: "Agricultural Drone Spraying",
      description: "Practice precision drone spraying over farmlands with adjustable nozzle width, droplet size, and flight path settings.",
      images: [
        "/images/Feautures/a1.jpg",
        "/images/Feautures/a2.jpg",
        "/images/Feautures/a3.jpg",
        "/images/Feautures/a4.jpg",
        "/images/Feautures/a5.jpg",
      ],
      details: [
        "Field map overlay for crop coverage",
        "Spray intensity & width adjustment",
        "Scenario-based agri drone training",
        "Chemical tank refill simulation"
      ]
    },
    {
      title: "Aerial Image Capturing Training",
      description: "Simulate real-world inspection use cases by capturing aerial photos with framing guides, GPS tagging, and zoom features.",
      images: [
        "/images/Feautures/ar1.jpg",
        "/images/Feautures/ar2.jpg",
        "/images/Feautures/ar3.jpg",
        "/images/Feautures/ar4.jpg",
        "/images/Feautures/ar5.jpg",
      ],
      details: [
        "Manual or automatic image capture",
        "Zoom, focus, and frame guides",
        "Capture GPS metadata for images",
        "Replay captured mission results"
      ]
    },
    {
      title: "Drawing Flight Patterns & Visual Shapes",
      description: "Enhance drone control skills by drawing custom flight paths and shapes. Useful for mapping, coverage optimization, and entertainment shows.",
      images: [
        "/images/Feautures/d1.jpg",
        "/images/Feautures/d2.jpg",
        "/images/Feautures/d3.jpg",
        "/images/Feautures/d4.jpg",
        "/images/Feautures/d5.jpg",
      ],
      details: [
        "Draw custom shapes in sky",
        "Practice smooth curve and loop flying",
        "Visualize path with trails",
        "Good for team coordination drills"
      ]
    }
  ];

  const additionalFeatures = [
    { title: "Customizable Control Settings", desc: "Configure RC sensitivity, stick mapping, and command responses to match real-life drones." },
    { title: "Multi-Drone Scenario Training", desc: "Operate and coordinate multiple drones in shared airspace to practice collaborative missions and avoid mid-air conflicts." },

    { title: "Analytics & Performance Logs", desc: "Track flight hours, efficiency scores, crash logs, and skill improvements." },
    { title: "Geofencing Limit Alerts", desc: "Create and enforce virtual boundaries for training areas, altitude ceilings, and GPS zones." },
    { title: "Crash Detection Sensors", desc: "Trigger crash simulations with audio/visual effects and incident summaries for training improvement." },
    { title: "LED Indicators", desc: "Use RGB indicators for direction, battery levels, or alerts during simulation." }
  ];

  // Auto-advance carousel with reduced delay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = { ...prev };
        mainFeatures.forEach((_, featureIndex) => {
          const currentIndex = newIndex[featureIndex] || 0;
          newIndex[featureIndex] = (currentIndex + 1) % mainFeatures[featureIndex].images.length;
        });
        return newIndex;
      });
    }, 2500); // Reduced from 4000ms to 2500ms

    return () => clearInterval(interval);
  }, [mainFeatures]);

  const nextImage = (featureIndex: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [featureIndex]: ((prev[featureIndex] || 0) + 1) % mainFeatures[featureIndex].images.length
    }));
  };

  const prevImage = (featureIndex: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [featureIndex]: ((prev[featureIndex] || 0) - 1 + mainFeatures[featureIndex].images.length) % mainFeatures[featureIndex].images.length
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Advanced
              <span className="text-orange-500"> Features</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the comprehensive set of features that make our drone simulator
              the most realistic and educational flight training experience available.
            </p>
          </div>
        </div>
      </section>


      {/* Features Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center mb-20 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {feature.title}
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {feature.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Carousel with Sliding Animation */}
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <Card className="overflow-hidden shadow-2xl relative group">
                  <div className="relative w-full aspect-video bg-black">
                    {/* Show one image at a time using opacity */}
                    {feature.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`${feature.title} ${imgIndex + 1}`}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${(currentImageIndex[index] || 0) === imgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                          }`}
                      />
                    ))}

                    {/* Carousel Controls */}
                    <button
                      onClick={() => prevImage(index)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={() => nextImage(index)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                      {feature.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() =>
                            setCurrentImageIndex((prev) => ({ ...prev, [index]: imgIndex }))
                          }
                          className={`w-2.5 h-2.5 rounded-full ${(currentImageIndex[index] || 0) === imgIndex
                            ? 'bg-white'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
     <section id="capabilities" ref={capabilitiesRef} className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Additional
        <span className="text-orange-500"> Capabilities</span>
      </h2>
    </div>

    {/* Controller Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {[
        {
          id: "flysky-fs-i6s",
          image: "/images/FlyskyFS-i6S.jpg",
          title: "Flysky FS-i6S",
          description: "A versatile 10-channel RC controller with a compact design and iBus/PPM support—ideal for professional simulator training.",
        },
        {
          id: "mobile-app",
          image: "/images/mobile.png",
          title: "Mobile RC App",
          description: "Simulate drone control directly from your smartphone. Great for training on the go or without RC gear.",
        },
        {
          id: "flysky-fs-i6s",
          image: "/images/FlyskyFS-i6S.jpg",
          title: "Flysky FS-i6S",
          description: "A versatile 10-channel RC controller with a compact design and iBus/PPM support—ideal for professional simulator training.",
        },
      ].map((item, i) => (
        <div key={i} id={item.id}>
          <Card className="overflow-hidden transition-transform duration-300 transform hover:-translate-y-1 hover:border-4 hover:border-orange-500 hover:shadow-xl border border-transparent rounded-xl">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-contain bg-white border-b"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500">
                {item.title}
              </h3>
              <p className="text-base text-gray-700 mt-2">{item.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>

    {/* Additional Feature Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {additionalFeatures.map((item, index) => (
        <Card
          key={index}
          className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>



      <Footer />
    </div>
  );
};

export default FeaturesPage;