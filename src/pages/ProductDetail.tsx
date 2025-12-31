import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Phone, Mail } from "lucide-react";

const ProductDetail = () => {
  useParams();

  // Mock product data - will be replaced with API call
  const product = {
    id: 1,
    name: "ABC Fire Extinguisher",
    description:
      "Multi-purpose dry powder fire extinguisher suitable for Class A, B, and C fires. Perfect for homes, offices, and industrial use.",
    image: "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800",
    category: "Fire Extinguishers",
    specifications: {
      Type: "ABC Dry Powder",
      Capacity: "4 kg / 6 kg / 9 kg",
      "Fire Rating": "Class A, B, C",
      Certification: "ISI Certified",
      Warranty: "2 Years",
      Refilling: "Available",
    },
    features: [
      "ISI certified and tested",
      "Suitable for multiple fire classes",
      "Easy to operate",
      "Durable construction",
      "Regular maintenance available",
      "Quick discharge mechanism",
    ],
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding">
        <div className="container-custom">
          {/* Back Button */}
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-fire-400 hover:text-fire-300 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-fire-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {product.category}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-400 text-lg">{product.description}</p>
              </div>

              {/* Features */}
              <div className="card">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check
                        size={20}
                        className="text-fire-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="card">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Specifications
                </h2>
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between border-b border-fire-500/10 pb-2"
                      >
                        <dt className="text-gray-400">{key}</dt>
                        <dd className="text-white font-medium">{value}</dd>
                      </div>
                    )
                  )}
                </dl>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/enquiry?product=${product.id}`}
                  className="btn-primary flex-1 text-center"
                >
                  Request Quote
                </Link>
                <a
                  href="tel:9815884906"
                  className="btn-secondary flex-1 text-center flex items-center justify-center space-x-2"
                >
                  <Phone size={20} />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Contact Info */}
              <div className="glass p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">
                  Need more information?
                </p>
                <div className="flex flex-col space-y-2">
                  <a
                    href="tel:9815884906"
                    className="text-fire-400 hover:text-fire-300 flex items-center space-x-2"
                  >
                    <Phone size={16} />
                    <span>9815884906 / 9855025731</span>
                  </a>
                  <a
                    href="mailto:star.fireservice77@gmail.com"
                    className="text-fire-400 hover:text-fire-300 flex items-center space-x-2"
                  >
                    <Mail size={16} />
                    <span>star.fireservice77@gmail.com</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
