import React from 'react';
import { motion } from 'motion/react';
import { 
  Ship, 
  Plane, 
  Package, 
  FileCheck, 
  Warehouse, 
  PackageCheck,
  Shield,
  Zap,
  Container,
  Check,
  Globe2,
  Anchor,
  Clock,
  Users,
  Award,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

// Main detailed services
const mainServices = [
  {
    id: 'sea-freight',
    icon: Ship,
    title: 'Sea Freight / Ocean Shipping',
    description: 'Comprehensive ocean freight solutions connecting Nepal to global markets through major international ports. We handle both FCL (Full Container Load) and LCL (Less than Container Load) shipments with optimal cost efficiency and reliable transit times.',
    features: [
      'FCL (20ft, 40ft, 40ft HC) container shipping',
      'LCL consolidation for smaller shipments',
      'Port-to-port and door-to-door delivery',
      'Break-bulk and RoRo (Roll-on/Roll-off) services',
      'Refrigerated container (Reefer) transport',
      'Project cargo and heavy lift handling',
      'Real-time vessel tracking and monitoring'
    ],
    regions: 'Middle East (Jebel Ali, Doha), Far East (Shanghai, Singapore, Hong Kong), Europe (Hamburg, Rotterdam, Felixstowe), USA (Los Angeles, New York, Houston), Australia (Sydney, Melbourne)',
    imagePlaceholder: 'sea-freight-container'
  },
  {
    id: 'air-freight',
    icon: Plane,
    title: 'Air Cargo / Freight Services',
    description: 'Express air freight solutions through Tribhuvan International Airport (TIA) connecting Nepal to worldwide destinations. Perfect for time-sensitive shipments, high-value goods, and urgent deliveries with guaranteed transit times.',
    features: [
      'Express and economy air freight options',
      'Airport-to-airport cargo services',
      'Door-to-door air freight delivery',
      'Consolidated and direct flight options',
      'Temperature-controlled air cargo',
      'Dangerous goods (DG) certified shipping',
      'Hand-carry and charter services available'
    ],
    regions: 'Major hubs including Dubai, Delhi, Doha, Bangkok, Singapore, Hong Kong, Istanbul with global connections to USA, Europe, Middle East, and Asia Pacific',
    imagePlaceholder: 'air-cargo-plane'
  },
  {
    id: 'land-transport',
    icon: Package,
    title: 'Land Transport & Break Bulk',
    description: 'Specialized land transportation and break bulk cargo handling for oversized, heavy, and non-containerized freight. Our expertise in Himalayan terrain logistics ensures safe delivery of industrial equipment, machinery, and project cargo.',
    features: [
      'Heavy machinery and equipment transport',
      'Oversized cargo handling expertise',
      'Cross-border truck transportation',
      'Multi-modal transport coordination',
      'ODC (Over-Dimensional Cargo) permits',
      'Loading, lashing, and securing services',
      'Transit insurance and risk management'
    ],
    regions: 'India (ICD Tughlakabad, JNPT, Mundra, Kolkata), Bangladesh (Dhaka, Chittagong), and all major Nepal border crossings (Birgunj, Kakarbhitta, Nepalgunj, Bhairahawa)',
    imagePlaceholder: 'break-bulk-cargo'
  },
  {
    id: 'specialized',
    icon: Globe2,
    title: 'DDU/DDP & Specialized Logistics',
    description: 'Complete end-to-end logistics management with Delivered Duty Unpaid (DDU) and Delivered Duty Paid (DDP) services. We handle all aspects of international shipping including customs clearance, documentation, and final mile delivery.',
    features: [
      'DDU (Delivered Duty Unpaid) services',
      'DDP (Delivered Duty Paid) solutions',
      'Complete customs clearance support',
      'Import/export documentation handling',
      'HS code classification assistance',
      'Duty and tax calculation services',
      'Last-mile delivery coordination'
    ],
    regions: 'Comprehensive global coverage with expertise in Nepal customs regulations and international trade compliance for all major trading partners',
    imagePlaceholder: 'logistics-network'
  }
];

// Additional services
const additionalServices = [
  {
    icon: FileCheck,
    title: 'Customs Clearance',
    description: 'Expert customs brokerage and clearance services for smooth import/export processing.'
  },
  {
    icon: Warehouse,
    title: 'Warehousing & Storage',
    description: 'Secure bonded and non-bonded warehouse facilities with inventory management.'
  },
  {
    icon: PackageCheck,
    title: 'Packaging Services',
    description: 'Professional cargo packaging, crating, and palletizing for safe international transport.'
  },
  {
    icon: Shield,
    title: 'Insurance Services',
    description: 'Comprehensive marine and cargo insurance coverage for all your shipments.'
  },
  {
    icon: Zap,
    title: 'Express Delivery',
    description: 'Time-critical express shipping solutions with priority handling and customs clearance.'
  },
  {
    icon: Container,
    title: 'Bulk Cargo Shipping',
    description: 'Specialized bulk commodity shipping for mining, agriculture, and industrial sectors.'
  }
];

// Service benefits
const benefits = [
  {
    icon: Award,
    title: '14+ Years Experience',
    description: 'Proven track record in Nepal logistics since 2011'
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: '98% on-time performance across all service lines'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Personal account managers for every client'
  },
  {
    icon: TrendingUp,
    title: 'Cost Optimization',
    description: 'Competitive rates with transparent pricing'
  }
];

export function Services() {
  return (
    <div className="relative bg-white">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 lg:px-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F7F8] via-white to-[#F5F7F8] opacity-60" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#003893]/5 to-transparent" />
        
        <div className="relative z-10 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-[#DC143C]" />
              <span className="text-[#DC143C] text-sm tracking-[0.2em] uppercase font-mono">
                Our Services
              </span>
            </div>
            
            <h1 
              className="text-5xl lg:text-7xl text-[#1A1A1B] tracking-tight mb-8"
              style={{ fontWeight: 700 }}
            >
              Cargo & Logistics Services{' '}
              <span className="text-[#003893]">Nepal</span>
            </h1>
            
            <p className="text-xl text-[#1A1A1B] opacity-60 leading-relaxed max-w-3xl">
              Pan Pacific Shipping & Logistics Services delivers comprehensive freight forwarding solutions 
              from Nepal to the world. With 14+ years of expertise in Himalayan transit logistics, we provide 
              seamless sea freight, air cargo, land transport, and specialized logistics services tailored to 
              your business needs.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl">
              {[
                { value: '200+', label: 'Global Routes' },
                { value: '14+', label: 'Years Excellence' },
                { value: '24/7', label: 'Support Available' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="border-l-4 border-[#FFD700] pl-4"
                >
                  <div 
                    className="text-3xl text-[#003893] tracking-tight mb-1"
                    style={{ fontWeight: 700 }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#1A1A1B] opacity-40 font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section - Alternating Layout */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-[1600px] mx-auto space-y-32">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Content */}
                <div className={isEven ? '' : 'lg:col-start-2'}>
                  {/* Icon & Title */}
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-[#003893] flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h2 
                      className="text-4xl lg:text-5xl text-[#1A1A1B] tracking-tight mb-6"
                      style={{ fontWeight: 700 }}
                    >
                      {service.title}
                    </h2>
                    
                    <p className="text-lg text-[#1A1A1B] opacity-60 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <h3 
                      className="text-sm tracking-[0.2em] uppercase font-mono text-[#DC143C] mb-6"
                    >
                      Key Features
                    </h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                          <span className="text-[#1A1A1B] opacity-70">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Regions */}
                  <div className="mb-8 p-6 bg-[#F5F7F8] border-l-4 border-[#003893]">
                    <div className="flex items-center gap-2 mb-3">
                      <Anchor className="w-5 h-5 text-[#003893]" />
                      <span className="text-sm tracking-[0.2em] uppercase font-mono text-[#003893]">
                        Destinations Covered
                      </span>
                    </div>
                    <p className="text-sm text-[#1A1A1B] opacity-60 leading-relaxed">
                      {service.regions}
                    </p>
                  </div>

                  {/* Get Quote Button */}
                  <a
                    href="#quote"
                    className="inline-flex items-center gap-3 bg-[#DC143C] text-white px-8 py-4 hover:bg-[#B8102E] transition-all duration-300 group"
                  >
                    <span className="tracking-wide">Get Quote</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Image Placeholder */}
                <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[500px] bg-gradient-to-br from-[#003893]/10 to-[#DC143C]/10 overflow-hidden"
                  >
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-32 h-32 text-[#003893] opacity-10" strokeWidth={1} />
                    </div>
                    
                    {/* Image overlay with service number */}
                    <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-6 border-l-4 border-[#FFD700]">
                      <div className="font-mono text-xs text-[#1A1A1B] opacity-40 mb-2">
                        SERVICE
                      </div>
                      <div 
                        className="text-6xl text-[#003893] tracking-tight"
                        style={{ fontWeight: 700 }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-32 px-6 lg:px-20 bg-[#F5F7F8]">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-[#DC143C]" />
              <span className="text-[#DC143C] text-sm tracking-[0.2em] uppercase font-mono">
                Value Added Services
              </span>
              <div className="w-12 h-px bg-[#DC143C]" />
            </div>
            
            <h2 
              className="text-4xl lg:text-5xl text-[#1A1A1B] tracking-tight"
              style={{ fontWeight: 700 }}
            >
              Additional Solutions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white p-8 hover:shadow-xl transition-all duration-500 border-b-4 border-transparent hover:border-[#FFD700]"
                >
                  <div className="w-14 h-14 bg-[#F5F7F8] flex items-center justify-center mb-6 group-hover:bg-[#003893] transition-colors duration-500">
                    <Icon className="w-7 h-7 text-[#003893] group-hover:text-white transition-colors duration-500" />
                  </div>
                  
                  <h3 
                    className="text-xl text-[#1A1A1B] mb-4"
                    style={{ fontWeight: 600 }}
                  >
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-[#1A1A1B] opacity-60 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Features / Benefits Section */}
      <section className="py-32 px-6 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl lg:text-5xl text-[#1A1A1B] tracking-tight mb-6"
              style={{ fontWeight: 700 }}
            >
              Why Choose Our <span className="text-[#003893]">Services</span>
            </h2>
            <p className="text-lg text-[#1A1A1B] opacity-60 max-w-2xl mx-auto">
              Experience the Pan Pacific difference with industry-leading expertise and customer-first approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-[#003893] flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 
                    className="text-xl text-[#1A1A1B] mb-3"
                    style={{ fontWeight: 600 }}
                  >
                    {benefit.title}
                  </h3>
                  
                  <p className="text-sm text-[#1A1A1B] opacity-60">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-20 bg-[#003893] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
          }} />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl lg:text-6xl text-white tracking-tight mb-6"
              style={{ fontWeight: 700 }}
            >
              Need a Custom Solution?
            </h2>
            
            <p className="text-xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto">
              Our logistics experts are ready to design a tailored freight solution that perfectly 
              matches your unique shipping requirements and budget constraints.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-white text-[#003893] px-10 py-5 hover:bg-[#FFD700] hover:text-[#1A1A1B] transition-all duration-300 group"
              >
                <span 
                  className="tracking-wide"
                  style={{ fontWeight: 600 }}
                >
                  Contact Us
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="tel:+9779841243981"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 hover:bg-white hover:text-[#003893] transition-all duration-300"
              >
                <span className="tracking-wide">Call: +977 984-1243981</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20 max-w-3xl mx-auto">
              {[
                { label: 'ISO Certified', value: '✓' },
                { label: 'Licensed & Bonded', value: '✓' },
                { label: 'Insured Cargo', value: '✓' }
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-3xl text-[#FFD700] mb-2">{item.value}</div>
                  <div className="text-sm text-white/60 font-mono uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
