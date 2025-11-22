import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface ValuePropCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function ValuePropCard({ icon: Icon, title, description, index }: ValuePropCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative bg-white border border-[#0A1A2F]/10 rounded-2xl p-6 hover:border-[#2AD1C8]/50 transition-all duration-200"
      style={{ boxShadow: '0 2px 8px rgba(10, 26, 47, 0.08)' }}
      whileHover={{ boxShadow: '0 4px 16px rgba(10, 26, 47, 0.12)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#2AD1C8]/5 to-[#A6F750]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-[#0A1A2F] mb-2 font-semibold">{title}</h3>
        <p className="text-[#0A1A2F]/70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
