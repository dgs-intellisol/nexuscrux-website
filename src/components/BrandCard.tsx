import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BrandCardProps {
  children: ReactNode;
  variant?: 'elevated' | 'bordered' | 'flat';
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
    elevated: 'bg-white border border-[#0A1A2F]/10',
    bordered: 'bg-white border-2 border-[#2AD1C8]/20',
    flat: 'bg-[#DDE2E8]/30',
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
