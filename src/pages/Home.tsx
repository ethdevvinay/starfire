import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Camera,
  Flame,
  Award,
  Users,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  Search,
  Settings,
  CheckCircle2,
  MessageSquare,
  Building2,
  ChevronDown,
  Home as HomeIcon,
  Factory,
  Hotel,
  School,
  HeartPulse,
  Lightbulb,
  Zap,
  Eye as EyeIcon,
  Cpu,
  Wifi,
  MessageCircle,
} from "lucide-react";
// Removed ModelViewer3D as it is now replaced by ScrollytellingModel
import ScrollytellingModel, {
  type ScrollytellingSection,
} from "../components/ScrollytellingModel";
import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";
import StatsCard from "../components/StatsCard";
import CTASection from "../components/CTASection";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  {
    icon: Shield,
    title: "Certified Products",
    description: "All products are ISI certified and tested",
  },
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "Trusted by thousands of customers",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Professional installation and support",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round the clock customer service",
  },
];

const steps = [
  {
    icon: Search,
    title: "Consultation",
    desc: "We analyze your requirements and site conditions.",
  },
  {
    icon: Settings,
    title: "Design & Plan",
    desc: "Custom safety architecture tailored to your needs.",
  },
  {
    icon: CheckCircle2,
    title: "Installation",
    desc: "Professional setup by our certified expert team.",
  },
  {
    icon: MessageSquare,
    title: "Maintenance",
    desc: "Regular checks and 24/7 emergency support.",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Property Manager",
    text: "Star Fire Service provided exceptional installation for our commercial complex. Their attention to detail and ISI certified products give us peace of mind.",
    rating: 5,
  },
  {
    name: "Anjali Sharma",
    role: "School Principal",
    text: "The fire alarm system they installed is top-notch. Their team was very professional and completed the process without any disruption to our classes.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Business Owner",
    text: "Best CCTV solutions in Chandigarh. The clarity of the footage and the reliability of their support team are unmatched.",
    rating: 4,
  },
];

const faqs = [
  {
    q: "Are all your products ISI certified?",
    a: "Yes, all our fire safety equipment and systems are ISI certified and undergo rigorous testing to meet international safety standards.",
  },
  {
    q: "Do you provide AMC (Annual Maintenance Contract)?",
    a: "Absolutely. We offer comprehensive AMC services to ensure your fire safety systems and CCTV are always in optimal working condition.",
  },
  {
    q: "How soon can you install a system?",
    a: "Depending on the scope, we typically begin installation within 24-48 hours after the site survey and approval.",
  },
  {
    q: "Do you provide training for employees?",
    a: "Yes, we provide hands-on training for your staff on how to operate fire extinguishers and respond to alarm systems.",
  },
];

const partners = [
  { name: "Government of India", logo: "Building2" },
  { name: "Local Authorities", logo: "Shield" },
  { name: "Industry Leaders", logo: "Award" },
  { name: "Educational Institutions", logo: "Users" },
];

const sectors = [
  {
    icon: HomeIcon,
    name: "Residential",
    desc: "Apartments, villas, and housing societies.",
  },
  {
    icon: Building2,
    name: "Commercial",
    desc: "Offices, malls, and business complexes.",
  },
  {
    icon: Factory,
    name: "Industrial",
    desc: "Factories, warehouses, and plants.",
  },
  {
    icon: Hotel,
    name: "Hospitality",
    desc: "Hotels, restaurants, and banquet halls.",
  },
  {
    icon: School,
    name: "Educational",
    desc: "Schools, colleges, and universities.",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    desc: "Hospitals, clinics, and labs.",
  },
];

const safetyTips = [
  {
    icon: Lightbulb,
    title: "Monthly Inspection",
    desc: "Always check pressure gauges on fire extinguishers monthly to ensure they are in the green zone.",
  },
  {
    icon: Zap,
    title: "Smoke Detectors",
    desc: "Test your smoke detectors every month and replace batteries at least once a year.",
  },
  {
    icon: EyeIcon,
    title: "CCTV Blind Spots",
    desc: "Regularly review camera angles to ensure no new obstacles are blocking critical security views.",
  },
];

const brands = [
  { name: "Ceasefire", domain: "ceasefire.in" },
  { name: "Hikvision", domain: "hikvision.com" },
  { name: "CP Plus", domain: "cpplusworld.com" },
  { name: "Dahua", domain: "dahuasecurity.com" },
  { name: "Honeywell", domain: "honeywell.com" },
  { name: "Bosch", domain: "bosch.com" },
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] =
    useState<ScrollytellingSection>("hero");
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products?is_featured=true")
      .then((res) => res.json())
      .then((data) => setFeaturedProducts(data))
      .catch((err) => console.error("Error fetching featured products:", err));
  }, []);

  const sectionHandlers = useMemo(
    () => ({
      hero: { onViewportEnter: () => setActiveSection("hero") },
      fireSafety: { onViewportEnter: () => setActiveSection("fire-safety") },
      cctv: { onViewportEnter: () => setActiveSection("cctv") },
      none: { onViewportEnter: () => setActiveSection("none") },
    }),
    []
  );

  return (
    <div className="min-h-screen">
      <ScrollytellingModel activeSection={activeSection} />
      {/* 1. Hero Section with 3D Model */}
      <motion.section
        onViewportEnter={sectionHandlers.hero.onViewportEnter}
        viewport={{ amount: 0.3 }}
        className="hero-gradient min-h-screen flex items-center pt-20 overflow-hidden relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fire-500/5 rounded-full blur-[120px] -z-10" />

        <motion.div
          onViewportEnter={sectionHandlers.hero.onViewportEnter}
          className="container-custom relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="bg-fire-500/20 text-fire-400 px-4 py-2 rounded-full text-sm font-semibold">
                  Premium Fire Safety & Security Solutions
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                Protect What Matters <span className="gradient-text">Most</span>
              </h1>

              <p className="text-lg text-gray-300">
                Leading provider of fire safety equipment, fire alarm systems,
                and CCTV surveillance solutions in Chandigarh. Your safety is
                our priority.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/enquiry"
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <span>Get Free Quote</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/products"
                  className="btn-secondary flex items-center justify-center"
                >
                  View Products
                </Link>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="tel:9815884906"
                  className="flex items-center space-x-2 text-gray-300 hover:text-fire-400 transition-colors"
                >
                  <Phone size={20} className="text-fire-500" />
                  <span>9815884906</span>
                </a>
                <a
                  href="mailto:star.fireservice77@gmail.com"
                  className="flex items-center space-x-2 text-gray-300 hover:text-fire-400 transition-colors"
                >
                  <Mail size={20} className="text-fire-500" />
                  <span>star.fireservice77@gmail.com</span>
                </a>
              </div>
            </motion.div>

            {/* Right - Model placeholder (ScrollytellingModel takes over) */}
            <div className="relative h-[400px] md:h-[600px]">
              {/* This space is intentionally layout-only for the scrollytelling guide */}
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* 2. Stats Section */}
      <motion.section
        className="section-padding bg-dark-900 border-b border-white/5"
        onViewportEnter={sectionHandlers.none.onViewportEnter}
        viewport={{ amount: 0.2, margin: "-100px" }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={Users}
              value="2000+"
              label="Happy Customers"
              growth="+15% this year"
            />
            <StatsCard
              icon={Shield}
              value="5000+"
              label="Products Installed"
              growth="+20% this year"
            />
            <StatsCard icon={Award} value="15+" label="Years Experience" />
            <StatsCard
              icon={Camera}
              value="100%"
              label="Customer Satisfaction"
            />
          </div>
        </div>
      </motion.section>

      {/* 2b. Fire Safety Solutions (Guided Experience) */}
      <motion.section
        onViewportEnter={sectionHandlers.fireSafety.onViewportEnter}
        viewport={{ amount: 0.2, margin: "-100px" }}
        className="section-padding bg-dark-950 overflow-hidden relative min-h-[600px] flex items-center"
      >
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Guide Landing Spot */}
            <div className="relative h-[400px] order-2 lg:order-1">
              {/* Scrollytelling model moves here */}
            </div>

            {/* Right - Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-1 lg:order-2 relative z-20"
            >
              <div className="inline-flex items-center space-x-2 bg-fire-500/10 text-fire-500 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                <Shield size={18} />
                <span>Next-Gen Fire Protection</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                Intelligent <span className="gradient-text">Fire Safety</span>
                <br /> Solutions
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Beyond just equipment, we provide a complete safety ecosystem.
                Our integrated systems detect, alert, and protect automatically,
                giving you peace of mind whether you're at home or away.
              </p>
              <ul className="space-y-4">
                {[
                  "Smart Detection Sensors",
                  "Automatic Suppression Systems",
                  "Real-time Mobile Alerts",
                  "Certified Professional Installation",
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="flex items-center space-x-3 text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 bg-fire-500 rounded-full" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="pt-4">
                <Link
                  to="/services"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>View Full Solutions</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 2c. CCTV Surveillance (Guided Experience) */}
      <motion.section
        onViewportEnter={sectionHandlers.cctv.onViewportEnter}
        viewport={{ amount: 0.2, margin: "-100px" }}
        className="section-padding bg-dark-900 overflow-hidden relative min-h-[600px] flex items-center"
      >
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6 relative z-20"
            >
              <div className="inline-flex items-center space-x-2 bg-fire-500/10 text-fire-500 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                <Camera size={18} />
                <span>Smart Surveillance</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                Advanced <span className="gradient-text">CCTV</span>
                <br /> Solutions
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Experience total visibility with our high-definition
                surveillance ecosystems. From AI-powered human detection to
                crystal-clear night vision, we ensure regular monitoring is
                effortless and reliable.
              </p>
              <ul className="space-y-4">
                {[
                  "AI Human & Vehicle Detection",
                  "4K Ultra-HD Resolution",
                  "Color Night Vision Technology",
                  "Encrypted Cloud Storage",
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="flex items-center space-x-3 text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 bg-fire-500 rounded-full" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="pt-4">
                <Link
                  to="/products?category=CCTV"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>Explore Cameras</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Right - Guide Landing Spot */}
            <div className="relative h-[400px]">
              {/* Scrollytelling CCTV model moves here */}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Brand Introduction Section */}
      <motion.section
        className="section-padding overflow-hidden bg-dark-950"
        onViewportEnter={sectionHandlers.none.onViewportEnter}
        viewport={{ amount: 0.2, margin: "-100px" }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text Slide */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-fire-500/10 text-fire-500 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                <Award size={18} />
                <span>Legacy of Excellence</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                Protecting Your World for Over <br />
                <span className="gradient-text">15+ Successful Years</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Star Fire Service & CCTV System has been at the forefront of
                safety solutions in Chandigarh. What started as a small service
                provider has grown into a trusted name for premium fire
                protection and high-end surveillance systems. Our commitment to
                ISI-certified products and flawless installation sets us apart.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">Trust</div>
                  <div className="text-sm text-gray-500">
                    2000+ Verified Installations
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">Quality</div>
                  <div className="text-sm text-gray-500">
                    ISI Certified & Tested
                  </div>
                </div>
              </div>
              <Link
                to="/about"
                className="btn-secondary inline-flex items-center space-x-2 mt-4"
              >
                <span>Our Full Story</span>
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            {/* Right - Image Zoom */}
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative group"
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/images/company-heritage.png"
                  alt="Our Heritage"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl border-fire-500/20 shadow-xl max-w-[200px]"
              >
                <div className="text-4xl font-black text-fire-500 mb-1">
                  15+
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-tighter">
                  Years of Industry Leadership
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 4. Technology We Use Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16">
            <div className="max-w-xl">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4 relative inline-block text-white"
              >
                Advanced <span className="gradient-text">Technology</span> We
                Use
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute bottom-0 left-0 h-1 bg-fire-500 rounded-full"
                />
              </motion.h2>
              <p className="text-gray-400 mt-4">
                We leverage cutting-edge AI and IoT solutions to provide
                proactive security and safety management.
              </p>
            </div>
            <Link
              to="/services"
              className="text-fire-500 font-bold hover:text-fire-400 flex items-center mt-4 md:mt-0 transition-colors"
            >
              Explore Tech <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: EyeIcon,
                title: "AI Video Analytics",
                desc: "Facial recognition, human detection, and automated perimeter security powered by AI.",
              },
              {
                icon: Cpu,
                title: "Smart Fire Sensors",
                desc: "IoT-enabled smoke and heat detectors that provide real-time alerts to your smartphone.",
              },
              {
                icon: Wifi,
                title: "Remote Monitoring",
                desc: "Cloud-based surveillance access from anywhere in the world with encrypted streaming.",
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card group hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-white/5 to-transparent"
              >
                <div className="w-16 h-16 bg-fire-500/10 rounded-2xl flex items-center justify-center text-fire-500 group-hover:bg-fire-500 group-hover:text-white transition-all duration-500 mb-6">
                  <tech.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {tech.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Features Section */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Choose{" "}
              <span className="gradient-text">Star Fire Service</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide comprehensive fire safety and security solutions with
              unmatched quality and service
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card text-center group hover:border-fire-500/30"
              >
                <div className="inline-block p-4 bg-fire-500/10 rounded-xl mb-4 group-hover:bg-fire-500 group-hover:text-white transition-all duration-500">
                  <feature.icon
                    size={32}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Services Preview */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Comprehensive{" "}
                <span className="gradient-text">Safety Solutions</span>
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Flame,
                    title: "Fire Safety Equipment",
                    desc: "Complete range of fire extinguishers and safety gear",
                  },
                  {
                    icon: Shield,
                    title: "Fire Alarm Systems",
                    desc: "Advanced detection and warning systems",
                  },
                  {
                    icon: Camera,
                    title: "CCTV Surveillance",
                    desc: "High-definition security camera systems",
                  },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 card"
                  >
                    <div className="p-3 bg-fire-500/20 rounded-lg">
                      <service.icon size={24} className="text-fire-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{service.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/services"
                className="btn-primary inline-flex items-center space-x-2 mt-6"
              >
                <span>Explore Services</span>
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/images/fire-safety-equipment.png"
                alt="Fire Safety Services"
                className="rounded-xl shadow-2xl border border-white/5"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Products Section */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our <span className="gradient-text">Products</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of fire safety equipment and CCTV
              surveillance solutions
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={item}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Sectors We Serve */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Sectors We <span className="gradient-text">Serve</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tailored safety and security solutions across diverse industries
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card flex items-center space-x-4 group hover:border-fire-500/30 transition-all duration-500"
              >
                <div className="p-4 bg-fire-500/10 rounded-xl text-fire-500 group-hover:bg-fire-500 group-hover:text-white transition-all duration-500">
                  <sector.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-fire-400 transition-colors">
                    {sector.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{sector.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. Safety Tips Section */}
      <section className="section-padding bg-dark-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-fire-500/5 rounded-full blur-[100px] -z-10" />

        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Safety First: <br />
                <span className="gradient-text">Expert Tips & Advice</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg">
                Your safety is our priority. We've compiled essential tips to
                help you maintain a secure environment for your family and
                business.
              </p>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {safetyTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-fire-500/30 transition-all duration-300"
                  >
                    <div className="p-2 bg-fire-500/10 rounded-lg text-fire-500">
                      <tip.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{tip.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {tip.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-fire-500/10 border border-white/5">
                <img
                  src="/images/safety-training.png"
                  alt="Fire Safety Knowledge"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 glass rounded-2xl border border-fire-500/20 max-w-[240px]">
                <div className="flex items-center space-x-2 text-fire-500 mb-2">
                  <Shield size={20} />
                  <span className="font-bold">Trust Matters</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Regular maintenance can increase the life of your safety
                  equipment by 60%.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. Our Process Section */}
      <section className="section-padding bg-dark-900 border-y border-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our <span className="gradient-text">Streamlined Process</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              How we ensure the highest level of safety for your property in
              four simple steps
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                className="relative group"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-fire-500/50 to-transparent -z-10" />
                )}
                <div className="card text-center group-hover:border-fire-500/50 transition-all duration-500 group-hover:-translate-y-3">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-fire-500/10 rounded-full mb-6 border border-fire-500/20 group-hover:bg-fire-500 group-hover:text-white transition-all duration-500">
                    <step.icon
                      size={36}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-fire-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-fire-500/50">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 11. Certifications Showcase */}
      <section className="py-16 bg-dark-950 border-b border-white/5 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
            <motion.div
              whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
              className="flex items-center space-x-3 text-gray-400 grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
            >
              <span className="text-3xl font-black italic text-fire-500">
                ISI
              </span>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-bold">
                  certified
                </span>
                <span className="text-[10px] text-gray-500">
                  Quality Standards
                </span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
              className="flex items-center space-x-3 text-gray-400 grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
            >
              <Building2 size={36} className="text-fire-400" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-bold">
                  MSME
                </span>
                <span className="text-[10px] text-gray-500">Registered</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
              className="flex items-center space-x-3 text-gray-400 grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
            >
              <Award size={36} className="text-yellow-500" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-bold">
                  15+ Years
                </span>
                <span className="text-[10px] text-gray-500">Excellence</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
              className="flex items-center space-x-3 text-gray-400 grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
            >
              <div className="p-2 border-2 border-fire-500/50 rounded-lg">
                <span className="text-xl font-black text-white">GOVT</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-bold text-fire-500">
                  Approved
                </span>
                <span className="text-[10px] text-gray-500">
                  Licensed Vendor
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 12. Brands We Deal In */}
      <section className="section-padding overflow-hidden bg-dark-900 border-b border-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Brands We <span className="gradient-text">Deal In</span>
            </h2>
            <p className="text-gray-400 mb-12">
              Partnered with global leaders to bring you the best in safety and
              security
            </p>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
            >
              {brands.map((brand, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-fire-500/30 transition-all duration-500 group h-32 flex flex-col items-center justify-center overflow-hidden"
                >
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={`https://cdn.brandfetch.io/${brand.domain}`}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain filter grayscale brightness-200 opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        if (e.currentTarget.parentElement) {
                          const fallback = document.createElement("div");
                          fallback.className =
                            "text-2xl font-black text-fire-500 uppercase";
                          fallback.innerText = brand.name.charAt(0);
                          e.currentTarget.parentElement.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 13. Emergency Support Section */}
      <section className="section-padding bg-dark-950 overflow-hidden relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fire-500 rounded-full blur-[120px] -z-10"
        />

        <div className="container-custom">
          <div className="glass p-8 md:p-16 rounded-[2rem] border-fire-500/20 text-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="inline-flex items-center space-x-2 bg-fire-500/20 text-fire-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8">
                <span className="w-2 h-2 bg-fire-500 rounded-full animate-pulse" />
                <span>24/7 Priority Support</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
                Emergency <span className="gradient-text">Assistance</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Critical situations don't wait. Our rapid response team is
                available 24 hours a day, 7 days a week for urgent repairs and
                support.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a
                  href="tel:9815884906"
                  className="btn-primary flex items-center space-x-3 w-full md:w-auto px-10 py-5 group"
                >
                  <Phone
                    size={24}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span className="text-xl">Call 9815884906</span>
                </a>
                <a
                  href="https://wa.me/919815884906"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-5 rounded-full font-bold flex items-center justify-center space-x-3 w-full md:w-auto transition-all shadow-lg hover:shadow-[#25D366]/20"
                >
                  <MessageCircle size={24} />
                  <span className="text-xl">WhatsApp Us</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 14. Testimonials Section */}
      <section className="section-padding overflow-hidden bg-dark-900 border-b border-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trusted by thousands of businesses and homeowners across the
              region
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testi, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card relative group hover:border-fire-500/30"
              >
                <div className="absolute top-6 right-6 text-fire-500/10 group-hover:text-fire-500/20 transition-colors">
                  <MessageSquare size={48} />
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < testi.rating ? "text-yellow-500" : "text-gray-600"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">
                  "{testi.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-fire-500/10 flex items-center justify-center text-fire-500 font-bold group-hover:bg-fire-500 group-hover:text-white transition-all duration-500">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testi.name}</h4>
                    <p className="text-gray-500 text-xs">{testi.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 15. FAQ Section */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 pt-4 text-white">
                Frequently Asked <br />
                <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-md">
                Find answers to common questions about our products,
                installations, and maintenance services.
              </p>
              <Link
                to="/contact"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <span>Still have questions?</span>
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-white/5 bg-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/10 transition-colors"
                  >
                    <span className="text-white font-medium">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      className="text-fire-500"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>
                  <AnimatePresence mode="wait">
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 bg-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 16. Trusted Partners Grid */}
      <section className="section-padding bg-dark-900 border-y border-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-500 uppercase tracking-widest mb-8">
              Trusted by <span className="text-fire-500">Industry Leaders</span>
            </h2>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {partners.map((partner, index) => {
                const Icon =
                  partner.logo === "Building2"
                    ? Building2
                    : partner.logo === "Shield"
                    ? Shield
                    : partner.logo === "Award"
                    ? Award
                    : Users;

                return (
                  <motion.div
                    key={index}
                    variants={item}
                    className="flex flex-col items-center space-y-3 group cursor-pointer"
                  >
                    <div className="p-6 bg-white/5 rounded-2xl group-hover:bg-fire-500/10 group-hover:scale-110 transition-all duration-500 border border-white/5 group-hover:border-fire-500/30">
                      <Icon
                        size={48}
                        className="text-gray-500 group-hover:text-fire-500 transition-colors"
                      />
                    </div>
                    <span className="text-sm font-semibold tracking-wide text-gray-500 group-hover:text-white transition-colors">
                      {partner.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 17. Quick Contact & Enquiry Section */}
      <section className="section-padding bg-dark-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-fire-500/5 rounded-full blur-[150px] -z-10" />

        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Ready to <span className="gradient-text">Get Started?</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Whether it's a small repair or a large-scale installation, our
                  team is ready to help you secure your property.
                </p>
              </div>

              <div className="space-y-6">
                <motion.a
                  whileHover={{ x: 10 }}
                  href="tel:9815884906"
                  className="flex items-center space-x-6 group"
                >
                  <div className="w-14 h-14 bg-fire-500/10 rounded-2xl flex items-center justify-center text-fire-500 group-hover:bg-fire-500 group-hover:text-white transition-all duration-300">
                    <Phone size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">
                      Call Us 24/7
                    </div>
                    <div className="text-xl font-bold text-white">
                      9815884906
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 10 }}
                  href="https://wa.me/919815884906"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-6 group"
                >
                  <div className="w-14 h-14 bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 font-bold">
                    <MessageCircle size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">
                      WhatsApp Support
                    </div>
                    <div className="text-xl font-bold text-white">
                      Instant Chat
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 10 }}
                  href="mailto:star.fireservice77@gmail.com"
                  className="flex items-center space-x-6 group"
                >
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <Mail size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">
                      Email Address
                    </div>
                    <div className="text-xl font-bold text-white">
                      star.fireservice77@gmail.com
                    </div>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-10 rounded-3xl border-white/10 shadow-2xl relative"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Quick Enquiry
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-fire-500/50 focus:border-fire-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-fire-500/50 focus:border-fire-500/50 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Service Required
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fire-500/50 focus:border-fire-500/50 transition-all appearance-none cursor-pointer">
                    <option className="bg-dark-900">Fire Safety Audit</option>
                    <option className="bg-dark-900">CCTV Installation</option>
                    <option className="bg-dark-900">AMC Service</option>
                    <option className="bg-dark-900">Product Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-fire-500/50 focus:border-fire-500/50 transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-lg font-bold shadow-xl shadow-fire-500/20 active:scale-95 transition-all"
                >
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 18. CTA Section */}
      <CTASection
        title="Ready to Secure Your Property?"
        description="Join thousands of satisfied customers who trust Star Fire Service for their safety needs. Get a free consultation today."
      />
      <WhatsAppButton message="Hello Star Fire Service! I'm interested in your fire safety products and services." />
    </div>
  );
};

export default Home;
