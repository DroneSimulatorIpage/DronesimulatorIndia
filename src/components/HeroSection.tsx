
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-snug">
              Drone Simulator Pro:
              <span className="text-primary"> Realistic Training </span>
              <br />for Enthusiasts & Defense Professionals
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover the ultimate drone flying experience with Drone Simulator Pro. Our advanced simulator offers realistic training for drone enthusiasts and defense professionals and beyond. Start your flight journey today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/download">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
                  Download Now
                </Button>
              </Link>
              {/* <Link to="/tutorials">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg"
                >
                  Watch Tutorials
                </Button>
              </Link> */}
            </div>

            {/* Stats */}

          </div>

          {/* Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {/* Video Container */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/h25pI6pQ_cs?autoplay=1&mute=1&rel=0&modestbranding=1"
                title="Drone Simulator Interface"
                className="w-full aspect-video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Optional Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 pointer-events-none rounded-2xl"></div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-float z-10">
              <div className="text-sm font-semibold text-gray-900">Flight Status</div>
              <div className="text-primary">● Active</div>
            </div>

            <div
              className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 animate-float z-10"
              style={{ animationDelay: '1.5s' }}
            >
              <div className="text-sm font-semibold text-gray-900">Altitude</div>
              <div className="text-accent font-bold">120m</div>
            </div>
          </div>

        </div>
        {/* <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8 text-center mt-12 pt-8 border-t border-gray-200">
  <div>
    <div className="text-3xl font-bold text-primary">2K+</div>
    <div className="text-gray-600">Downloads</div>
  </div>
  <div>
    <div className="text-3xl font-bold text-primary">4.8</div>
    <div className="text-gray-600">Rating</div>
  </div>
  <div>
    <div className="text-3xl font-bold text-primary">24/7</div>
    <div className="text-gray-600">Support</div>
  </div>
</div> */}
      </div>
    </section>
  );
};

export default HeroSection;
