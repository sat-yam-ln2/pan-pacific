import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Package } from 'lucide-react';
import logoImage from 'figma:asset/a364c891f5827be3c4014813b59cd9a43a29780d.png';
import LiquidEther from './LiquidEther';
import { ShippingAnimation } from './ShippingAnimation';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-20 pt-32 pb-20 overflow-hidden">
      {/* LiquidEther Background Effect - Hero Only */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#003893', '#003893', '#DC143C']}
          mouseForce={25}
          cursorSize={120}
          isViscous={false}
          viscous={30}
          iterationsPoisson={32}
          resolution={0.4}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={1.8}
          takeoverDuration={0.3}
          autoResumeDelay={2500}
          autoRampDuration={0.8}
          style={{ opacity: 0.22 }}
        />
      </div>
      
      <div className="max-w-[1600px] mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-px bg-[#DC143C]" />
                <span className="text-[#DC143C] text-sm tracking-[0.2em] uppercase font-mono">
                  Nepal Specialist
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl lg:text-7xl xl:text-8xl text-[#1A1A1B] tracking-tight leading-[0.95]"
                style={{ fontWeight: 700 }}
              >
                Pan Pacific
                <br />
                <span className="text-[#003893] text-[0.6em]">Shipping & Logistics</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg lg:text-xl text-[#1A1A1B] opacity-50 max-w-xl leading-relaxed"
              >
                14 years of Himalayan transit excellence. Connecting Nepal to the world through precision logistics.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a 
                href="#quote"
                className="group bg-[#DC143C] text-white px-10 py-5 flex items-center justify-center gap-3 hover:bg-[#B8102E] transition-all duration-300"
              >
                <Package className="w-5 h-5" />
                <span className="tracking-wide">Get Free Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#tracking"
                className="border-2 border-[#003893] text-[#003893] px-10 py-5 hover:bg-[#003893] hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="tracking-wide">Track Shipment</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-8 font-mono text-xs text-[#1A1A1B] opacity-30 tracking-wider"
            >
              PAN: 600633110 · THAMEL, KATHMANDU
            </motion.div>
          </motion.div>

          {/* Right - Shipping Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[600px] lg:h-[700px]"
          >
            {/* Animation Container */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-[#003893]/10">
              <ShippingAnimation />
            </div>
            
            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm p-6 border-l-4 border-[#FFD700] z-10"
            >
              <div className="font-mono text-xs text-[#1A1A1B] opacity-40 mb-2">
                OPERATIONAL SINCE
              </div>
              <div className="text-4xl text-[#003893] tracking-tight" style={{ fontWeight: 700 }}>
                2011
              </div>
              <div className="font-mono text-xs text-[#1A1A1B] opacity-40 mt-2">
                14+ YEARS EXCELLENCE
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}