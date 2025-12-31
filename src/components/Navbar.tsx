import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Star Fire Service"
              className="h-12 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold gradient-text">
                STAR FIRE SERVICE
              </h1>
              <p className="text-xs text-gray-400">& CCTV SYSTEM</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-fire-500"
                    : "text-gray-300 hover:text-fire-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/enquiry" className="btn-primary">
              Get Quote
            </Link>
          </div>

          {/* Contact Info (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4 text-sm">
            <a
              href="tel:9815884906"
              className="flex items-center space-x-2 text-gray-300 hover:text-fire-400 transition-colors"
            >
              <Phone size={16} />
              <span>9815884906</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-fire-500/20"
          >
            <div className="container-custom py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-fire-500"
                      : "text-gray-300 hover:text-fire-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/enquiry"
                onClick={() => setIsOpen(false)}
                className="block btn-primary text-center"
              >
                Get Quote
              </Link>
              <div className="pt-4 border-t border-fire-500/20 space-y-2">
                <a
                  href="tel:9815884906"
                  className="flex items-center space-x-2 text-gray-300"
                >
                  <Phone size={16} />
                  <span>9815884906</span>
                </a>
                <a
                  href="mailto:star.fireservice77@gmail.com"
                  className="flex items-center space-x-2 text-gray-300"
                >
                  <Mail size={16} />
                  <span>star.fireservice77@gmail.com</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
