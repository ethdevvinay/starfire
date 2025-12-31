import { motion } from "framer-motion";
import {
  Shield,
  Target,
  Eye,
  Award,
  Users,
  Heart,
  MapPin,
  Quote,
  Send,
  Building2,
  Phone,
  Mail,
} from "lucide-react";
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

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description:
        "We prioritize the safety and security of our clients above all else",
    },
    {
      icon: Award,
      title: "Quality Products",
      description:
        "Only ISI certified and tested products from trusted manufacturers",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Highly trained professionals with years of industry experience",
    },
    {
      icon: Heart,
      title: "Customer Trust",
      description:
        "Building long-term relationships based on trust and reliability",
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
              About <span className="gradient-text">Star Fire Service</span>
            </h1>
            <p className="text-lg text-gray-300">
              With over 15 years of experience, we are Chandigarh's leading
              provider of fire safety equipment and CCTV surveillance solutions,
              committed to protecting what matters most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-fire-500/20 rounded-lg">
                  <Target size={32} className="text-fire-500" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-400">
                To provide comprehensive fire safety and security solutions that
                protect lives and property. We strive to deliver excellence
                through quality products, professional service, and unwavering
                commitment to customer satisfaction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-fire-500/20 rounded-lg">
                  <Eye size={32} className="text-fire-500" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-400">
                To be the most trusted name in fire safety and security
                solutions across North India, setting industry standards for
                quality, innovation, and customer service while making safety
                accessible to all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card text-center group hover:border-fire-500/30"
              >
                <div className="inline-block p-4 bg-fire-500/10 rounded-xl mb-4 group-hover:bg-fire-500 group-hover:text-white transition-all duration-500">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="card bg-gradient-to-br from-fire-500/10 to-transparent border-fire-500/20 p-8 md:p-12 relative">
            <div className="absolute top-8 right-8 text-fire-500/10">
              <Quote size={120} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <div className="relative inline-block">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
                    alt="Founder"
                    className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover shadow-2xl border-4 border-fire-500/20"
                  />
                  <div className="absolute -bottom-4 -right-4 p-3 bg-fire-500 rounded-xl text-white shadow-xl">
                    <Quote size={24} />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Founder's <span className="gradient-text">Message</span>
                </h2>
                <p className="text-xl text-gray-300 italic leading-relaxed">
                  "At Star Fire Service, we believe that safety is not just a
                  service—it's a responsibility and a promise. For over 15
                  years, our mission has been to empower businesses and families
                  with world-class fire safety and security solutions. Every
                  installation we complete, every system we maintain, is a
                  testament to our commitment to protecting what truly
                  matters—lives and livelihoods."
                </p>
                <div>
                  <h4 className="text-xl font-bold text-white">Rajan Popli</h4>
                  <p className="text-fire-400">Founder & CEO</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="gradient-text">Service Areas</span>
              </h2>
              <p className="text-gray-400 text-lg">
                We provide prompt fire safety and CCTV installation services
                across the Tri-city area and surrounding regions.
              </p>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
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
                    variants={item}
                    className="flex items-center space-x-2 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-fire-500/30 hover:bg-fire-500/5 transition-all duration-300"
                  >
                    <MapPin size={18} className="text-fire-500" />
                    <span>{city}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="p-6 rounded-xl bg-fire-500/10 border border-fire-500/20 flex items-start space-x-4">
                <div className="p-3 bg-fire-500 rounded-lg text-white">
                  <Send size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Quick Response</h4>
                  <p className="text-sm text-gray-400">
                    Our team is ready to reach any location in the Tri-city
                    within hours for emergency support.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-fire-500/20 blur-3xl rounded-full" />
              <div className="card relative z-10 border-fire-500/20 overflow-hidden">
                <div className="p-4 bg-fire-500/10 border-b border-fire-500/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 size={20} className="text-fire-500" />
                    <span className="text-white font-bold">Headquarters</span>
                  </div>
                  <span className="text-xs text-fire-400">Chandigarh</span>
                </div>
                <div className="p-8 space-y-4">
                  <p className="text-gray-300">
                    SCO 24, Second Floor, Sector 20-C, <br />
                    Chandigarh - 160020
                  </p>
                  <div className="flex items-center space-x-2 text-fire-400">
                    <Phone size={18} />
                    <span>9815884906 / 9855025731</span>
                  </div>
                  <div className="flex items-center space-x-2 text-fire-400">
                    <Mail size={18} />
                    <span>star.fireservice77@gmail.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-dark-900">
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
              What sets us apart in the fire safety and security industry
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Award,
                title: "ISI Certified Products",
                desc: "All our products meet international safety standards and are ISI certified for your peace of mind.",
              },
              {
                icon: Users,
                title: "Expert Installation Team",
                desc: "Certified professionals with 15+ years of combined experience in fire safety and CCTV systems.",
              },
              {
                icon: Shield,
                title: "24/7 Emergency Support",
                desc: "Round-the-clock support for urgent repairs and emergency situations across the Tri-city area.",
              },
              {
                icon: Heart,
                title: "Customer-First Approach",
                desc: "We prioritize your safety needs and provide personalized solutions tailored to your requirements.",
              },
              {
                icon: Target,
                title: "Competitive Pricing",
                desc: "Premium quality products and services at fair, transparent prices with no hidden costs.",
              },
              {
                icon: Building2,
                title: "Comprehensive AMC",
                desc: "Annual Maintenance Contracts to ensure your systems are always in optimal working condition.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card group hover:border-fire-500/30"
              >
                <div className="inline-block p-4 bg-fire-500/10 rounded-xl mb-4 group-hover:bg-fire-500 group-hover:text-white transition-all duration-500">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              15+ years of dedication, growth, and excellence in fire safety and
              security
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-fire-500 via-fire-500/50 to-transparent hidden lg:block" />

            <div className="space-y-12">
              {[
                {
                  year: "2008",
                  title: "Foundation",
                  desc: "Star Fire Service was founded by Rajan Popli with a vision to make fire safety accessible to all.",
                },
                {
                  year: "2012",
                  title: "Expansion",
                  desc: "Expanded services to include CCTV surveillance systems, becoming a one-stop safety solution provider.",
                },
                {
                  year: "2018",
                  title: "1000+ Customers",
                  desc: "Reached the milestone of serving over 1000 satisfied customers across residential and commercial sectors.",
                },
                {
                  year: "2024",
                  title: "Industry Leader",
                  desc: "Recognized as one of the leading fire safety and CCTV providers in the Tri-city area with 2000+ installations.",
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`${
                      index % 2 === 0 ? "lg:text-right" : "lg:order-2"
                    }`}
                  >
                    <div className="card inline-block group hover:border-fire-500/30">
                      <div className="text-5xl font-black text-fire-500 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-400">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className={index % 2 === 0 ? "lg:order-2" : ""}>
                    {/* Spacer for timeline */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Meet Our <span className="gradient-text">Expert Team</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dedicated professionals committed to your safety and security
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                name: "Rajan Popli",
                role: "Founder & CEO",
                expertise: "Fire Safety Expert",
              },
              {
                name: "Technical Team Lead",
                role: "Installation Head",
                expertise: "CCTV Specialist",
              },
              {
                name: "Service Manager",
                role: "AMC & Support",
                expertise: "Maintenance Expert",
              },
              {
                name: "Sales Manager",
                role: "Client Relations",
                expertise: "Solution Consultant",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card text-center group hover:border-fire-500/30"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-fire-500/20 to-fire-500/5 flex items-center justify-center text-4xl font-black text-fire-500 group-hover:from-fire-500 group-hover:to-fire-600 group-hover:text-white transition-all duration-500">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-fire-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-xs">{member.expertise}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Certifications &{" "}
              <span className="gradient-text">Partnerships</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trusted by government bodies and industry leaders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card text-center group hover:border-fire-500/30"
            >
              <div className="text-6xl font-black text-fire-500 mb-4">ISI</div>
              <h3 className="text-xl font-bold text-white mb-2">
                ISI Certified
              </h3>
              <p className="text-gray-400 text-sm">
                All products meet Indian Standards Institute certification
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card text-center group hover:border-fire-500/30"
            >
              <Building2 size={64} className="mx-auto text-fire-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                MSME Registered
              </h3>
              <p className="text-gray-400 text-sm">
                Officially registered with Ministry of MSME, Government of India
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card text-center group hover:border-fire-500/30"
            >
              <Award size={64} className="mx-auto text-fire-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Authorized Dealer
              </h3>
              <p className="text-gray-400 text-sm">
                Authorized dealer for leading brands like Ceasefire, Hikvision,
                CP Plus
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800"
                alt="Our Team"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">15+ Years</span> of Excellence
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Star Fire Service & CCTV System was founded with a simple yet
                  powerful mission: to make fire safety and security accessible
                  and reliable for everyone in Chandigarh and surrounding
                  regions.
                </p>
                <p>
                  Over the years, we've grown from a small local business to a
                  trusted name in the industry, serving over 2000+ satisfied
                  customers including residential complexes, commercial
                  establishments, industrial facilities, and government
                  institutions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Partner With Us for Complete Safety Solutions"
        description="Experience the difference that 15+ years of expertise makes. Let's discuss how we can protect your property."
      />
    </div>
  );
};

export default About;
