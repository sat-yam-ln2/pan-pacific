import React from 'react';
import { motion } from 'motion/react';

const directors = [
  {
    name: 'Tejman Tamang',
    title: 'Managing Director',
    signature: 'TT'
  },
  {
    name: 'Manoj Thapa',
    title: 'Managing Director',
    signature: 'MT'
  }
];

export function Directors() {
  return (
    <section className="relative py-32 px-6 lg:px-20">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#1A1A1B] opacity-20" />
            <span className="text-[#1A1A1B] text-sm tracking-[0.2em] uppercase font-mono opacity-40">
              Leadership
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl text-[#1A1A1B] tracking-tight" style={{ fontWeight: 700 }}>
            Meet The
            <br />
            <span className="opacity-40">Directors</span>
          </h2>
        </motion.div>

        {/* Directors Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {directors.map((director, index) => (
            <motion.div
              key={director.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative">
                {/* Director Card */}
                <div className="bg-white border-l-4 border-[#003893] p-10 lg:p-12 space-y-6">
                  <div>
                    <h3 className="text-3xl lg:text-4xl text-[#1A1A1B] mb-2 tracking-tight" style={{ fontWeight: 700 }}>
                      {director.name}
                    </h3>
                    <div className="text-[#003893] text-sm tracking-[0.15em] uppercase font-mono">
                      {director.title}
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-[#1A1A1B]/10">
                    <p className="text-[#1A1A1B] opacity-50 leading-relaxed mb-8">
                      Leading Pan Pacific with vision and expertise, driving excellence in Himalayan logistics and fostering global partnerships.
                    </p>
                    
                    {/* Signature */}
                    <div className="flex items-end justify-between">
                      <div className="text-5xl lg:text-6xl text-[#FFD700] opacity-30 italic tracking-wide" style={{ fontFamily: 'cursive', fontWeight: 300 }}>
                        {director.signature}
                      </div>
                      <div className="font-mono text-xs text-[#1A1A1B] opacity-20 tracking-wider">
                        MD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <div className="bg-white p-10 lg:p-14 border-2 border-[#1A1A1B]/10">
            <p className="text-xl lg:text-2xl text-[#1A1A1B] opacity-60 leading-relaxed mb-6 italic">
              "Building bridges between the Himalayas and the world, one shipment at a time."
            </p>
            <div className="font-mono text-xs text-[#1A1A1B] opacity-30 tracking-wider">
              PAN PACIFIC SHIPPING & LOGISTICS SERVICES PVT. LTD.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}