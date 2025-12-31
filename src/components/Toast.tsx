import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -50, x: "-50%" }}
      className="fixed top-24 left-1/2 z-50 min-w-[320px] max-w-md"
    >
      <div
        className={`card flex items-center gap-3 shadow-2xl ${
          type === "success"
            ? "border-green-500/50 bg-green-500/10"
            : "border-red-500/50 bg-red-500/10"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
        ) : (
          <XCircle className="text-red-500 flex-shrink-0" size={24} />
        )}
        <p
          className={`flex-1 font-medium ${
            type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </motion.div>
  );
};

interface ToastContainerProps {
  toast: { message: string; type: "success" | "error" } | null;
  onClose: () => void;
}

export const ToastContainer = ({ toast, onClose }: ToastContainerProps) => {
  return (
    <AnimatePresence>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={onClose} />
      )}
    </AnimatePresence>
  );
};

export default Toast;
