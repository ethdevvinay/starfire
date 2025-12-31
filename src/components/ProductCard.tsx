import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  category?: string;
  category_name?: string;
}

const ProductCard = ({
  id,
  name,
  description,
  image,
  category,
  category_name,
}: ProductCardProps) => {
  const displayCategory = category || category_name;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {displayCategory && (
          <div className="absolute top-3 right-3 bg-fire-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {displayCategory}
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-fire-400 transition-colors">
        {name}
      </h3>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center justify-between">
        <Link
          to={`/products/${id}`}
          className="text-fire-400 font-medium text-sm flex items-center space-x-2 group-hover:text-fire-300 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>

        <Link
          to={`/enquiry?product=${id}`}
          className="btn-primary text-xs px-4 py-2"
        >
          Enquire Now
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
