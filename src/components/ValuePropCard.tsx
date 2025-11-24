import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface ValuePropCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function ValuePropCard({ icon: Icon, title, description, index = 0 }: ValuePropCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-white via-white to-[#2AD1C8]/5 border border-[#0A1A2F]/10 rounded-2xl p-6 hover:border-[#2AD1C8]/30 transition-all duration-300 overflow-hidden"
      style={{ boxShadow: '0 2px 8px rgba(10, 26, 47, 0.08)' }}
      whileHover={{ boxShadow: '0 8px 24px rgba(42, 209, 200, 0.15)' }}
    >
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2AD1C8]/0 to-[#A6F750]/0 group-hover:from-[#2AD1C8]/5 group-hover:to-[#A6F750]/5 transition-all duration-500 rounded-2xl" />
      
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl mb-4 shadow-lg shadow-[#2AD1C8]/20 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-[#0A1A2F] mb-2">{title}</h3>
        <p className="text-[#0A1A2F]/60">{description}</p>
      </div>
    </motion.div>
  );
}