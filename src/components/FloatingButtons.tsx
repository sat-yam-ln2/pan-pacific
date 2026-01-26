import React from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

export function FloatingButtons() {
  return (
    <>
      {/* WhatsApp Button - Bottom Left */}
      <div className="fixed bottom-8 left-8 z-50">
        <ElectricBorder
          color="#003893"
          speed={0.5}
          chaos={0.07}
          borderRadius={15}
        >
          <a
            href="https://wa.me/9779841243981"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-white hover:bg-[#F5F7F8] transition-all duration-300 group"
            style={{ borderRadius: 50 }}
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 text-[#25D366] group-hover:scale-110 transition-transform" />
          </a>
        </ElectricBorder>
      </div>

      {/* Calendar Button - Bottom Right */}
      <div className="fixed bottom-8 right-8 z-50">
        <ElectricBorder
          color="#DC143C"
          speed={0.5}
          chaos={0.07}
          borderRadius={15}
        >
          <a
            href="#contact"
            className="flex items-center justify-center w-14 h-14 bg-white hover:bg-[#F5F7F8] transition-all duration-300 group"
            style={{ borderRadius: 50 }}
            aria-label="Schedule a meeting"
          >
            <Calendar className="w-6 h-6 text-[#DC143C] group-hover:scale-110 transition-transform" />
          </a>
        </ElectricBorder>
      </div>
    </>
  );
}