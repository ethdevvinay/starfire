import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface WhatsAppButtonProps {
  message?: string;
  productName?: string;
}

const WhatsAppButton = ({ message, productName }: WhatsAppButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "919815884906"; // Star Fire Service WhatsApp number

  // Default message if none provided
  const defaultMessage =
    "Hello Star Fire Service! I would like to know more about your products and services.";

  // Create product-specific message if productName is provided
  const finalMessage = productName
    ? `Hello Star Fire Service! I'm interested in ${productName}. Please provide more details.`
    : message || defaultMessage;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(finalMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing background effect */}
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main button */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl flex items-center justify-center hover:shadow-green-500/50 transition-shadow">
          <MessageCircle size={32} className="text-white" fill="white" />
        </div>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
          className="absolute right-20 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap pointer-events-none"
        >
          <div className="font-semibold text-sm">Chat on WhatsApp</div>
          <div className="text-xs text-gray-600">We'll reply instantly!</div>
          {/* Arrow */}
          <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white" />
        </motion.div>

        {/* Online indicator */}
        <motion.div
          className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppButton;
