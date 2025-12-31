import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  growth?: string;
  color?: string;
}

const StatsCard = ({
  icon: Icon,
  value,
  label,
  growth,
  color = "fire",
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="card"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-2">{label}</p>
          <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
          {growth && (
            <p className="text-green-400 text-sm font-medium">{growth}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/20`}>
          <Icon size={24} className={`text-${color}-500`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
