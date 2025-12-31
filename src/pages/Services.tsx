import { motion } from "framer-motion";
import { Flame, Shield, Camera, Wrench, Clock, Award } from "lucide-react";
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

const Services = () => {
  const services = [
    {
      icon: Flame,
      title: "Fire Safety Equipment",
      description:
        "Comprehensive range of fire extinguishers, fire blankets, and safety gear",
      features: [
        "ABC, CO2, Foam, and Water extinguishers",
        "ISI certified products",
        "All capacities available",
        "Residential and commercial solutions",
      ],
    },
    {
      icon: Shield,
      title: "Fire Alarm Systems",
      description:
        "Advanced fire detection and alarm systems for early warning",
      features: [
        "Addressable and conventional systems",
        "Smoke and heat detectors",
        "Manual call points",
        "Integrated control panels",
      ],
    },
    {
      icon: Camera,
      title: "CCTV Surveillance",
      description:
        "High-definition security camera systems for complete monitoring",
      features: [
        "HD and 4K cameras",
        "Day and night vision",
        "Remote viewing capability",
        "DVR/NVR systems",
      ],
    },
    {
      icon: Wrench,
      title: "Installation & Maintenance",
      description: "Professional installation and regular maintenance services",
      features: [
        "Expert installation team",
        "Regular maintenance contracts",
        "Emergency repair services",
        "System upgrades",
      ],
    },
    {
      icon: Clock,
      title: "Fire Hydrant Systems",
      description: "Complete fire hydrant system installation and maintenance",
      features: [
        "Hose reel systems",
        "Landing valves",
        "Fire brigade connections",
        "Pressure testing",
      ],
    },
    {
      icon: Award,
      title: "Consultation & Training",
      description: "Expert consultation and fire safety training programs",
      features: [
        "Fire safety audits",
        "Risk assessment",
        "Staff training programs",
        "Compliance guidance",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-lg text-gray-300">
              Comprehensive fire safety and security solutions tailored to your
              needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={item} className="card group">
                <div className="p-4 bg-fire-500/10 rounded-xl inline-block mb-4 group-hover:bg-fire-500 group-hover:text-white transition-all duration-500">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-400 flex items-start"
                    >
                      <span className="text-fire-500 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Process */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Service <span className="gradient-text">Process</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A systematic approach to ensure quality and customer satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "Free site visit and requirement analysis by our experts",
              },
              {
                step: "02",
                title: "Proposal",
                desc: "Detailed quotation with product specifications and timeline",
              },
              {
                step: "03",
                title: "Installation",
                desc: "Professional installation by certified technicians",
              },
              {
                step: "04",
                title: "Support",
                desc: "Ongoing maintenance and 24/7 emergency support",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center group hover:border-fire-500/30 relative"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-fire-500 rounded-full flex items-center justify-center text-white font-black shadow-lg">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 mt-4">
                  {process.title}
                </h3>
                <p className="text-gray-400 text-sm">{process.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Plans */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Annual Maintenance <span className="gradient-text">Plans</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Keep your safety systems in optimal condition with our
              comprehensive AMC plans
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "Contact for Quote",
                features: [
                  "Quarterly maintenance visits",
                  "Basic system inspection",
                  "Minor repairs included",
                  "Email support",
                  "Spare parts extra",
                ],
              },
              {
                name: "Standard",
                price: "Contact for Quote",
                popular: true,
                features: [
                  "Monthly maintenance visits",
                  "Comprehensive inspection",
                  "All repairs included",
                  "Phone & email support",
                  "Spare parts included",
                  "Priority service",
                ],
              },
              {
                name: "Premium",
                price: "Contact for Quote",
                features: [
                  "Bi-weekly maintenance",
                  "Complete system audit",
                  "All repairs & upgrades",
                  "24/7 emergency support",
                  "All spare parts included",
                  "Highest priority service",
                  "Free annual training",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card relative ${
                  plan.popular
                    ? "border-fire-500 shadow-xl shadow-fire-500/20"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-fire-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-black text-fire-500">
                    {plan.price}
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <span className="text-fire-500 mr-2">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn-primary w-full">Get Quote</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Service <span className="gradient-text">Coverage</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide services across the Tri-city area and surrounding
              regions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Chandigarh",
              "Mohali",
              "Panchkula",
              "Zirakpur",
              "Dera Bassi",
              "Baddi",
              "Kharar",
              "Pinjore",
            ].map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card text-center group hover:border-fire-500/30"
              >
                <div className="text-lg font-bold text-white group-hover:text-fire-400 transition-colors">
                  {city}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">Our Services</span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Certified Professionals",
                description:
                  "Our team consists of certified technicians with extensive industry experience",
              },
              {
                title: "Quality Assurance",
                description:
                  "We use only ISI certified products from trusted manufacturers",
              },
              {
                title: "24/7 Support",
                description:
                  "Round-the-clock customer support and emergency services",
              },
            ].map((item_data, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card text-center hover:border-fire-500/30"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item_data.title}
                </h3>
                <p className="text-gray-400">{item_data.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Enhance Your Safety & Security?"
        description="Let our experts help you choose the right services for your property. Get a free consultation today."
      />
    </div>
  );
};

export default Services;
