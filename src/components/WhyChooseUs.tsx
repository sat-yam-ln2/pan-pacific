import React from 'react';
import { motion } from 'motion/react';
import { Award, Shield, Globe2, Headphones } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Expert Knowledge',
    description: '14+ years of specialized experience in Himalayan transit logistics, customs clearance, and international freight forwarding.'
  },
  {
    icon: Shield,
    title: 'Security & Insurance',
    description: 'Comprehensive cargo insurance coverage and secure handling protocols ensuring your shipments arrive safely every time.'
  },
  {
    icon: Globe2,
    title: 'Global Network',
    description: 'Established partnerships across Middle East, Far East, USA, Europe, and Australia for seamless worldwide connectivity.'
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'Round-the-clock dedicated support team ready to assist with tracking, queries, and urgent shipment requirements.'
  }
];

export function WhyChooseUs() {
  return (
    <section className="relative py-32 px-6 lg:px-20 bg-white overflow-hidden">
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#DC143C]" />
            <span className="text-[#DC143C] text-sm tracking-[0.2em] uppercase font-mono">
              Our Advantages
            </span>
            <div className="w-12 h-px bg-[#DC143C]" />
          </div>
          
          <h2 
            className="text-4xl lg:text-6xl text-[#1A1A1B] tracking-tight"
            style={{ fontWeight: 700 }}
          >
            Why Choose <span className="text-[#003893]">Pan Pacific</span>
          </h2>
          
          <p className="text-lg text-[#1A1A1B] opacity-50 max-w-2xl mx-auto leading-relaxed">
            Delivering excellence through proven expertise, global partnerships, and unwavering commitment to your logistics needs.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-[#F5F7F8] p-8 hover:bg-white transition-all duration-500 border-b-4 border-transparent hover:border-[#DC143C]"
              >
                {/* Icon Container */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-[#003893] flex items-center justify-center group-hover:bg-[#DC143C] transition-all duration-500">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Decorative element */}
                  <div className="w-8 h-1 bg-[#FFD700] mt-4 group-hover:w-16 transition-all duration-500" />
                </div>

                {/* Content */}
                <h3 
                  className="text-xl text-[#1A1A1B] mb-4 group-hover:text-[#003893] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  {feature.title}
                </h3>
                
                <p className="text-[#1A1A1B] opacity-60 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Hover Effect - Top Right Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#FFD700] to-transparent" />
                  <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-[#FFD700] to-transparent" />
                </div>

                {/* Number Badge */}
                <div className="absolute top-8 right-8 font-mono text-6xl text-[#003893] opacity-5 group-hover:opacity-10 transition-opacity duration-500" style={{ fontWeight: 700 }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-[1600px] mx-auto mt-20 h-px bg-gradient-to-r from-transparent via-[#003893]/20 to-transparent"
      />
    </section>
  );
}
