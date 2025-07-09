import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Tutorials = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 pb-10 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Masterclass Tutorial
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            This is the tutorial video to get an idea on how to download our simulator on PC and mobile controller,
            and how to set up environment variables.
          </p>
        </div>
      </section>


      {/* Full-Width YouTube Video */}
    <section className="w-full bg-white flex justify-center items-center py-10">
  <div className="w-full max-w-4xl px-6">
    <div className="relative w-full" style={{ paddingBottom: "56.25%", height: 0 }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
        src="https://www.youtube.com/embed/aWdmp_pTXmo"
        title="Agri Mapping Masterclass"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
};

export default Tutorials;
