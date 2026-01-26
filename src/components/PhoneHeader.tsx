import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function PhoneHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-8 right-8 z-[999] flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 border-l-4 border-[#DC143C]"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#003893] flex items-center justify-center">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-mono text-[10px] text-[#1A1A1B] opacity-40 tracking-wider uppercase">
            Call Us Now
          </div>
          <a
            href="tel:+9779841243981"
            className="text-[#003893] tracking-tight hover:text-[#DC143C] transition-colors"
            style={{ fontWeight: 600 }}
          >
            +977 984-1243981
          </a>
        </div>
      </div>
    </motion.div>
  );
}
