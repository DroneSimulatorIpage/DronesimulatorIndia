
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const FeaturesSection = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Realistic Flight Physics",
      description: "Experience authentic drone behavior with realistic physics engine and environmental factors.",
      icon: "/images/s1.png",
      color: "from-blue-500 to-primary"
    },

    {
      title: "Real-Time Scenarios",
      description: "Experience real-world drone operations in dynamic environments like rescue, delivery, and inspection missions.",
      icon: "/images/s2.png",
      color: "from-green-500 to-blue-500"
    },

    {
      title: "Color-coded Orientation",
      description: "Red and green visual indicators help you maintain perfect drone orientation during flight.",
      icon: "/images/s3.png",
      color: "from-primary to-accent"
    },
    {
      title: "Manual Geofencing",
      description: "Set custom flight boundaries with adjustable height and radius parameters for safe operations.",
      icon: "/images/s4.png",
      color: "from-green-500 to-primary"
    },
    {
      title: "Smooth RTL Function",
      description: "Automated Return to Launch with configurable altitude settings for emergency situations.",
      icon: "/images/s5.png",
      color: "from-accent to-yellow-500"
    },
    {
      title: "Advanced Controls",
      description: "Professional-grade control interface with customizable sensitivity and response settings.",
      icon: "/images/s6.png",
      color: "from-red-500 to-primary"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our
            <span className="text-primary"> Simulator</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the most comprehensive drone simulation with features designed
            for both learning and professional training.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-white shadow-md">

              {/* Icon and Title in a row */}
              <div className="flex items-center mb-2">
                {typeof feature.icon === "string" &&
                  (feature.icon.endsWith(".png") || feature.icon.endsWith(".ico")) ? (
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-10 h-10 mr-3"
                  />
                ) : (
                  <div className="text-3xl mr-3">{feature.icon}</div>
                )}
                <h3 className="text-xl font-semibold text-black">
                  {feature.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-800 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>





        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Flight?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of pilots who have mastered drone flying with our simulator.
            </p>
            <button
              onClick={() => {
                navigate("/download");
                window.scrollTo(0, 0); // 👈 Scroll to top
              }}
              className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300"
            >
              Start Your Journey
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
