import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BrandCardProps {
  children: ReactNode;
  variant?: 'elevated' | 'bordered' | 'flat' | 'dark';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

export function BrandCard({
  children,
  variant = 'elevated',
  padding = 'md',
  hoverable = false,
  animated = true,
  className = '',
  onClick,
}: BrandCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = {
    elevated: 'bg-gradient-to-br from-white via-white to-[#2AD1C8]/5 border border-[#0A1A2F]/10',
    bordered: 'bg-gradient-to-br from-white to-white border-2 border-[#2AD1C8]/20',
    flat: 'bg-gradient-to-br from-[#DDE2E8]/30 to-[#DDE2E8]/10',
    dark: 'bg-white/5 border border-white/10 backdrop-blur-sm',
  };

  const baseClasses = `rounded-2xl ${paddingClasses[padding]} ${variantClasses[variant]} ${onClick ? 'cursor-pointer' : ''} ${className}`;

  const card = (
    <div
      className={baseClasses}
      onClick={onClick}
      style={
        variant === 'elevated'
          ? { boxShadow: '0 2px 8px rgba(10, 26, 47, 0.08)' }
          : undefined
      }
    >
      {children}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        whileHover={
          hoverable
            ? {
                y: -4,
                boxShadow: '0 8px 24px rgba(10, 26, 47, 0.12)',
                transition: { duration: 0.2 },
              }
            : undefined
        }
      >
        {card}
      </motion.div>
    );
  }

  return card;
}