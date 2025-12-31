import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-fire-500/20">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img
              src="/logo.png"
              alt="Star Fire Service"
              className="h-16 w-auto"
            />
            <h3 className="text-xl font-bold gradient-text">
              STAR FIRE SERVICE
            </h3>
            <p className="text-sm text-gray-400">& CCTV SYSTEM</p>
            <p className="text-sm text-gray-400">
              Leading provider of fire safety equipment and CCTV surveillance
              solutions in Chandigarh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-fire-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-fire-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-fire-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-fire-400 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-fire-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-fire-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/enquiry"
                  className="text-gray-400 hover:text-fire-400 transition-colors"
                >
                  Get Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-fire-400">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Fire Safety Equipment</li>
              <li>Fire Alarm Systems</li>
              <li>Fire Hydrant Systems</li>
              <li>CCTV Surveillance</li>
              <li>Security Solutions</li>
              <li>Installation & Maintenance</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-fire-400">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin
                  size={18}
                  className="text-fire-500 mt-1 flex-shrink-0"
                />
                <span>
                  Ground Shop, Near Bank of Baroda, Raipur Khurd, Old Airport,
                  Chandigarh
                </span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={18} className="text-fire-500" />
                <div className="flex flex-col">
                  <a
                    href="tel:9815884906"
                    className="hover:text-fire-400 transition-colors"
                  >
                    9815884906
                  </a>
                  <a
                    href="tel:9855025731"
                    className="hover:text-fire-400 transition-colors"
                  >
                    9855025731
                  </a>
                  <a
                    href="tel:9815884931"
                    className="hover:text-fire-400 transition-colors"
                  >
                    9815884931
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={18} className="text-fire-500" />
                <a
                  href="mailto:star.fireservice77@gmail.com"
                  className="hover:text-fire-400 transition-colors"
                >
                  star.fireservice77@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-fire-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-fire-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-fire-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-fire-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-fire-500/20 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} Star Fire Service & CCTV System. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
