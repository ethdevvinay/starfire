import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  Camera,
  Flame,
  Award,
  CheckCircle,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";
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

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch products
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch categories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategoriesData(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const categories = ["all", ...categoriesData.map((cat) => cat.name)];

  const categoryIcons = {
    "Fire Extinguishers": Flame,
    "Fire Alarm Systems": Shield,
    "CCTV Cameras": Camera,
    "Fire Hydrant": Shield,
    "Fire Sprinkler": Shield,
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our <span className="gradient-text">Products</span>
            </h1>
            <p className="text-lg text-gray-300">
              Explore our comprehensive range of ISI certified fire safety
              equipment and advanced CCTV surveillance solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Product <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our extensive catalog organized by category
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {categories
              .filter((cat) => cat !== "all")
              .map((category, index) => {
                const Icon =
                  categoryIcons[category as keyof typeof categoryIcons] ||
                  Shield;
                return (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-6 rounded-xl border transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-fire-500 border-fire-500 text-white"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-fire-500/30"
                    }`}
                  >
                    <Icon
                      size={32}
                      className={`mx-auto mb-3 ${
                        selectedCategory === category
                          ? "text-white"
                          : "text-fire-500"
                      }`}
                    />
                    <div className="text-sm font-bold">{category}</div>
                  </motion.button>
                );
              })}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-fire-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fire-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-fire-500 text-white"
                    : "bg-dark-800 text-gray-400 hover:bg-dark-700"
                }`}
              >
                {category === "all" ? "All Products" : category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-gray-400">
              Showing{" "}
              <span className="text-fire-500 font-bold">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          {/* Products Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            key={selectedCategory + searchTerm}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={item}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No products found matching your criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Buy <span className="gradient-text">From Us</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Quality assurance and customer satisfaction guaranteed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "ISI Certified",
                desc: "All products are ISI certified and meet international standards",
              },
              {
                icon: CheckCircle,
                title: "Genuine Products",
                desc: "100% authentic products from authorized manufacturers",
              },
              {
                icon: Shield,
                title: "Warranty Included",
                desc: "Comprehensive warranty on all products with free service",
              },
              {
                icon: Camera,
                title: "Expert Installation",
                desc: "Professional installation by certified technicians",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center group hover:border-fire-500/30"
              >
                <div className="inline-block p-4 bg-fire-500/10 rounded-xl mb-4 group-hover:bg-fire-500 group-hover:text-white transition-all duration-500">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Can't Find What You're Looking For?"
        description="Contact us directly and our experts will help you find the perfect safety solution for your needs."
      />
      <WhatsAppButton message="Hello! I'm browsing your products and would like more information." />
    </div>
  );
};

export default Products;
