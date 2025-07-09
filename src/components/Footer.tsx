
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <img
              src="/images/footerlogo1.png"
              alt="DroneSimulator Logo"
              className="w-[200px] h-auto object-contain"
            />
            <p className="text-gray-400 mb-6 max-w-md">
              The most comprehensive drone flight simulator for learning, practicing,
              and mastering drone piloting skills safely from your device.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/dronesimulatorpro/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors cursor-pointer"
              >
                <span className="text-white font-bold">f</span>
              </a>
              <a
                href="https://x.com/Drone_Simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors cursor-pointer"
              >
                <span className="text-white font-bold">x</span>
              </a>
              <a
                href="https://www.linkedin.com/company/dronesimulatorpro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors cursor-pointer"
              >
                <span className="text-white font-bold">in</span>
              </a>
              <a
                href="https://www.youtube.com/@DroneSimulatorPro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors cursor-pointer"
              >
                <span className="text-white font-bold">yt</span>
              </a>
              <a
                href="https://www.instagram.com/dronesimulatorpro/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors cursor-pointer"
              >
                <span className="text-white font-bold">ig</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              {/* <li><Link to="/tutorials" className="text-gray-400 hover:text-white transition-colors">Tutorials</Link></li> */}
              <li><Link to="/download" className="text-gray-400 hover:text-white transition-colors">Download</Link></li>
              <li><Link to="/contactus" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p><b>IPage UM Services Pte Ltd</b><br />
                641A,Punggol drive,<br />
                Singapore - 821641<br />
                WhatsApp: +65 9006 2901</p>
              <p><b>IPage UM Services Pvt Ltd</b><br />
                5A/6B, White Waters,<br />
                Timber Lake Colony, Shaikpet,<br />
                Hyderabad - 500008 India<br />
                Phone: +91 880 434 9999</p>
              <p>EMail: bd@dronesimulator.pro</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 DroneSimulator. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</ Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="/cookie" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
            <Link to="/refund" className="text-gray-400 hover:text-white text-sm transition-colors">Refund  Policy</Link>
            <Link to="/general" className="text-gray-400 hover:text-white text-sm transition-colors">General  Policy</Link>
           <Link to="/contact" className="text-sm text-gray-400 hover:text-white">Help</Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
