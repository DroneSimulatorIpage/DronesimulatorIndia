import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HelpCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/product" },
    { name: "Features", path: "/features" },
    { name: "Tutorials", path: "/tutorials" },
    // { name: "Download", path: "/download" },
    
    { name: "Contact", path: "/contactus" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const token = sessionStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

const handleLogout = async () => {
  const token = sessionStorage.getItem('auth_token')

  try {
    if (token) {
      await fetch('https://34-124-167-179.nip.io/api/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
    }
  } catch (error) {
    console.error('Logout API failed:', error)
  } finally {
    // Clear session and redirect
    sessionStorage.clear()
    setIsLoggedIn(false)
    navigate("/auth/login")
  }
}


  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-20 md:h-24 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <img src="/images/logonew.png" alt="Logo" className="w-[190px] h-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Conditional Auth Buttons */}
            {isLoggedIn ? (
              <>
                <Link to="/auth/profile" className="text-sm text-primary font-semibold">
                  Profile
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth/login" className="text-sm text-primary font-semibold">
                Login
              </Link>
            )}
  <Link
  to="/contact"
  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
  title="Help & Support"
>
  <HelpCircle className="w-4 h-4" />
  Help
</Link>
            <Link to="/download">
  <Button className="bg-primary hover:bg-primary/90 text-white">
    Download Now
  </Button>
</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  <Link
                    to="/auth/profile"
                    className="block px-3 py-2 text-base font-medium text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth/login"
                  className="block px-3 py-2 text-base font-medium text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
<Link
  to="/contact"
  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
  title="Help & Support"
>
  <HelpCircle className="w-4 h-4" />
  Help
</Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Download Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
