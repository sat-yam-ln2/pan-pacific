import React from 'react';
import { motion } from 'motion/react';
import { Ship, Plane, Package, Globe } from 'lucide-react';
import { Link } from 'react-router';

const services = [
  {
    icon: Ship,
    title: 'Sea Freight',
    subtitle: 'FCL / LCL',
    description: 'Complete ocean freight solutions with full container and less-than-container load options for optimal cost efficiency.',
    metrics: '200+ Routes'
  },
  {
    icon: Plane,
    title: 'Air Freight',
    subtitle: 'TIA Gateway',
    description: 'Rapid air cargo services through Tribhuvan International Airport, connecting Nepal to global markets.',
    metrics: '48hr Transit'
  },
  {
    icon: Package,
    title: 'Break Bulk',
    subtitle: 'Oversized Cargo',
    description: 'Specialized handling for heavy machinery, industrial equipment, and non-containerized freight.',
    metrics: '500T+ Capacity'
  },
  {
    icon: Globe,
    title: 'DDU / DDP',
    subtitle: 'Complex Logistics',
    description: 'End-to-end logistics management with customs clearance, documentation, and last-mile delivery.',
    metrics: 'Door-to-Door'
  }
];

export function ServicesPreview() {
  return (
    <section className="relative py-32 px-6 lg:px-20 bg-white">
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
              Service Pillars
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl text-[#1A1A1B] tracking-tight" style={{ fontWeight: 700 }}>
            Comprehensive
            <br />
            <span className="opacity-40">Freight Solutions</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-px bg-[#1A1A1B]/10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white p-10 lg:p-14 hover:bg-[#F5F7F8] transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="relative z-10">
                <service.icon className="w-12 h-12 text-[#003893] mb-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1.5} />

                <div className="mb-4">
                  <h3 className="text-3xl lg:text-4xl text-[#1A1A1B] mb-2 tracking-tight" style={{ fontWeight: 700 }}>
                    {service.title}
                  </h3>
                  <div className="text-[#DC143C] text-sm tracking-[0.15em] uppercase font-mono">
                    {service.subtitle}
                  </div>
                </div>

                <p className="text-[#1A1A1B] opacity-50 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="font-mono text-xs text-[#1A1A1B] opacity-30 tracking-wider">
                  {service.metrics}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Import/Export Badge + View All Services Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-block border-2 border-[#1A1A1B]/10 px-8 py-4 mb-8">
            <div className="flex items-center gap-6">
              <span className="text-[#1A1A1B] tracking-[0.2em] uppercase font-mono text-sm">
                Both Way Services
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[#FFD700] font-mono">→</span>
                <span className="text-[#1A1A1B] opacity-40 font-mono text-sm">IMPORT</span>
                <span className="text-[#1A1A1B] opacity-20">/</span>
                <span className="text-[#1A1A1B] opacity-40 font-mono text-sm">EXPORT</span>
                <span className="text-[#FFD700] font-mono">←</span>
              </div>
            </div>
          </div>

          {/* View All Services Link */}
          <div>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 bg-[#003893] text-white px-8 py-4 hover:bg-[#002670] transition-all duration-300 group"
            >
              <span className="tracking-wide" style={{ fontWeight: 600 }}>
                View All Services
              </span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
