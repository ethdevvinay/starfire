import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { ToastContainer } from "../components/Toast";
import WhatsAppButton from "../components/WhatsAppButton";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting contact form:", formData);

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact-enquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        setToast({
          message: "Your message has been sent successfully!",
          type: "success",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        console.error("Error response:", data);
        setToast({
          message: data.error || "Failed to send message. Please try again.",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setToast({
        message: "An error occurred. Please check console for details.",
        type: "error",
      });
    }
  };

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
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-lg text-gray-300">
              Get in touch with us for any inquiries or to schedule a
              consultation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-fire-500/20 rounded-lg">
                    <MapPin size={24} className="text-fire-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Our Location
                    </h3>
                    <p className="text-gray-400">
                      Ground Shop, Near Bank of Baroda
                      <br />
                      Raipur Khurd, Old Airport
                      <br />
                      Chandigarh
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-fire-500/20 rounded-lg">
                    <Phone size={24} className="text-fire-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Phone Numbers
                    </h3>
                    <div className="space-y-1 text-gray-400">
                      <p>
                        <a
                          href="tel:9815884906"
                          className="hover:text-fire-400 transition-colors"
                        >
                          9815884906
                        </a>
                      </p>
                      <p>
                        <a
                          href="tel:9855025731"
                          className="hover:text-fire-400 transition-colors"
                        >
                          9855025731
                        </a>
                      </p>
                      <p>
                        <a
                          href="tel:9815884931"
                          className="hover:text-fire-400 transition-colors"
                        >
                          9815884931
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-fire-500/20 rounded-lg">
                    <Mail size={24} className="text-fire-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Email
                    </h3>
                    <p className="text-gray-400">
                      <a
                        href="mailto:star.fireservice77@gmail.com"
                        className="hover:text-fire-400 transition-colors"
                      >
                        star.fireservice77@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-fire-500/20 rounded-lg">
                    <Clock size={24} className="text-fire-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Business Hours
                    </h3>
                    <div className="text-gray-400 space-y-1">
                      <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p>Sunday: 10:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Find <span className="gradient-text">Us</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Visit our office or schedule an appointment
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card overflow-hidden"
          >
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.1234567890!2d76.7794!3d30.7046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQyJzE2LjYiTiA3NsKwNDYnNDUuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Common <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Quick answers to questions you may have
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What areas do you serve?",
                a: "We provide services across Chandigarh, Mohali, Panchkula, Zirakpur, Dera Bassi, Baddi, Kharar, and Pinjore.",
              },
              {
                q: "Do you provide emergency services?",
                a: "Yes, we offer 24/7 emergency support for urgent repairs and maintenance across the Tri-city area.",
              },
              {
                q: "Are your products ISI certified?",
                a: "Absolutely! All our fire safety products are ISI certified and meet international safety standards.",
              },
              {
                q: "Do you offer installation services?",
                a: "Yes, we provide professional installation services by certified technicians for all products we sell.",
              },
              {
                q: "What is your response time for service calls?",
                a: "We typically respond within 2-4 hours for emergency calls and schedule regular service visits within 24-48 hours.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group hover:border-fire-500/30"
              >
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-fire-400 transition-colors">
                  {faq.q}
                </h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ToastContainer toast={toast} onClose={() => setToast(null)} />
      <WhatsAppButton message="Hello Star Fire Service! I have a question and would like to connect with you." />
    </div>
  );
};

export default Contact;
