import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton";

const Enquiry = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product_name: "",
    message: "",
  });

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch products from database
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        // Auto-select product if product ID is in URL
        const productId = searchParams.get("product");
        if (productId) {
          const product = data.find((p: any) => p.id === parseInt(productId));
          if (product) {
            setFormData((prev) => ({ ...prev, product_name: product.name }));
          }
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          product_name: formData.product_name,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      console.log("Enquiry submitted successfully");
      setSubmitted(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          product_name: "",
          message: "",
        });
        navigate("/products");
      }, 3000);
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card max-w-md text-center"
        >
          <div className="inline-block p-4 bg-green-500/20 rounded-full mb-4">
            <Check size={48} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Enquiry Submitted!
          </h2>
          <p className="text-gray-400">
            Thank you for your interest. Our team will contact you shortly.
          </p>
        </motion.div>
      </div>
    );
  }

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
              Get a <span className="gradient-text">Free Quote</span>
            </h1>
            <p className="text-lg text-gray-300">
              Fill out the form below and our experts will get back to you with
              a customized solution
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors"
                    placeholder="+91 98XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Product/Service Interest
                </label>
                <select
                  value={formData.product_name}
                  onChange={(e) =>
                    setFormData({ ...formData, product_name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors"
                >
                  <option value="">Select a product/service</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                  <option value="Installation & Maintenance">
                    Installation & Maintenance
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 transition-colors resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-lg">
                Submit Enquiry
              </button>

              <p className="text-sm text-gray-400 text-center">
                By submitting this form, you agree to be contacted by our team
                regarding your enquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Why Enquire With Us */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Choose <span className="gradient-text">Us</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get the best fire safety and security solutions with guaranteed
              satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Free Consultation",
                desc: "Expert advice and site visit at no cost",
              },
              {
                title: "Competitive Pricing",
                desc: "Best rates with transparent quotations",
              },
              {
                title: "Quick Response",
                desc: "Get a quote within 24 hours",
              },
              {
                title: "Professional Service",
                desc: "15+ years of industry experience",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center group hover:border-fire-500/30"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-fire-500 rounded-full flex items-center justify-center text-white font-black text-xl">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What Happens <span className="gradient-text">Next</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our simple and transparent process from enquiry to installation
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Submit Enquiry",
                  desc: "Fill out the form with your requirements",
                  time: "Now",
                },
                {
                  step: "2",
                  title: "Expert Contact",
                  desc: "Our team will reach out within 24 hours",
                  time: "Within 24 hours",
                },
                {
                  step: "3",
                  title: "Site Visit & Quote",
                  desc: "Free consultation and detailed quotation",
                  time: "2-3 days",
                },
                {
                  step: "4",
                  title: "Installation",
                  desc: "Professional setup by certified technicians",
                  time: "As per schedule",
                },
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-6"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-fire-500 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-fire-500/50">
                    {process.step}
                  </div>
                  <div className="flex-1 card">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {process.title}
                      </h3>
                      <span className="text-sm text-fire-400 font-semibold">
                        {process.time}
                      </span>
                    </div>
                    <p className="text-gray-400">{process.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "2000+", label: "Happy Customers" },
              { number: "5000+", label: "Installations" },
              { number: "15+", label: "Years Experience" },
              { number: "100%", label: "Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center group hover:border-fire-500/30"
              >
                <div className="text-4xl font-black text-fire-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <WhatsAppButton productName={formData.product_name} />
    </div>
  );
};

export default Enquiry;
