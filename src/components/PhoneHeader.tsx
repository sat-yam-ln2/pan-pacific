import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function PhoneHeader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="flex items-center gap-2"
    >
      <Phone className="w-4 h-4 text-[#003893] opacity-40" />
      <a
        href="tel:+9779841243981"
        className="font-mono text-sm text-[#1A1A1B] opacity-40 hover:opacity-70 hover:text-[#DC143C] transition-all tracking-wide"
      >
        +977 984-1243981
      </a>
    </motion.div>
  );
}
