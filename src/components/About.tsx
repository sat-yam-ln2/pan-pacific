import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Globe2, 
  Zap, 
  Heart,
  Ear,
  FileText,
  Truck,
  MessageSquare,
  Package,
  RefreshCw,
  Check
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Footer } from './Footer';

const values = [
  {
    icon: Shield,
    title: 'Trust & Reliability',
    description: 'Built on 14+ years of unwavering commitment to secure, on-time delivery and transparent operations across every shipment.'
  },
  {
    icon: Globe2,
    title: 'Global Reach',
    description: 'Seamless connectivity from Nepal to Middle East, Far East, USA, Europe, and Australia through strategic partnerships worldwide.'
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'Optimized logistics workflows, real-time tracking, and expedited customs clearance to minimize transit times and maximize value.'
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Every shipment is treated with personalized attention, ensuring your cargo receives the care and priority it deserves.'
  }
];

const processSteps = [
  {
    number: '01',
    icon: Ear,
    title: 'Listen',
    description: 'We begin by deeply understanding your cargo requirements, timelines, and destination specifics.'
  },
  {
    number: '02',
    icon: FileText,
    title: 'Plan',
    description: 'Strategic route planning, carrier selection, and documentation preparation tailored to your shipment.'
  },
  {
    number: '03',
    icon: Truck,
    title: 'Execute',
    description: 'Efficient pickup, loading, and dispatch with real-time coordination across air, sea, and land networks.'
  },
  {
    number: '04',
    icon: MessageSquare,
    title: 'Communicate',
    description: 'Transparent updates at every milestone—from departure to customs clearance to final delivery.'
  },
  {
    number: '05',
    icon: Package,
    title: 'Deliver',
    description: 'On-time arrival at destination with complete documentation and seamless last-mile logistics.'
  },
  {
    number: '06',
    icon: RefreshCw,
    title: 'Refine',
    description: 'Post-delivery feedback and continuous process improvement to enhance future shipments.'
  }
];

const benefits = [
  'Specialized in Nepal-Global Trade Routes',
  'Space Promise Even in Peak Season',
  'Multiple Departure Schedule Options',
  'Coverage Across 50+ Global Destinations',
  'Dedicated Account Management',
  '24/7 Shipment Tracking & Support'
];

export function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-[#F5F7F8]">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003893]/5 via-transparent to-[#DC143C]/5" />
        
        <div className="relative max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-[#1A1A1B] opacity-20" />
              <span className="text-[#1A1A1B] text-sm tracking-[0.2em] uppercase font-mono opacity-40">
                About Us
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl text-[#1A1A1B] tracking-tight mb-8" style={{ fontWeight: 700 }}>
              About Pan Pacific
              <br />
              <span className="opacity-40">Leading Cargo Company</span>
            </h1>
            
            <p className="text-xl text-[#1A1A1B] opacity-60 leading-relaxed max-w-3xl">
              Since 2011, Pan Pacific Shipping & Logistics Services Pvt. Ltd. has been Nepal's trusted partner for 
              international freight forwarding, connecting businesses to global markets with precision and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Managing Director Message */}
      <section className="relative py-32 px-6 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl lg:text-5xl text-[#1A1A1B] tracking-tight mb-4" style={{ fontWeight: 700 }}>
              Message from the
              <br />
              <span className="opacity-40">Managing Directors</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* MD Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#003893]/20 to-transparent z-10" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2ODQ2ODY0OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Managing Directors"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              <div className="mt-6 border-l-2 border-[#FFD700] pl-6">
                <p className="text-2xl text-[#1A1A1B] mb-2" style={{ fontWeight: 600 }}>
                  Tejman Tamang & Manoj Thapa
                </p>
                <p className="text-[#1A1A1B] opacity-40 tracking-[0.15em] uppercase font-mono text-sm">
                  Managing Directors
                </p>
              </div>
            </motion.div>

            {/* MD Message */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-[#1A1A1B] opacity-70 leading-relaxed">
                When we founded Pan Pacific Shipping & Logistics Services in 2011, our vision was clear: to bridge 
                Nepal's businesses with global markets through reliable, efficient, and customer-focused freight solutions. 
                Over the past 14 years, we've transformed that vision into reality.
              </p>
              
              <p className="text-lg text-[#1A1A1B] opacity-70 leading-relaxed">
                Operating from our headquarters in Thamel, Kathmandu, we've built strategic partnerships across the 
                Middle East, Far East, USA, Europe, and Australia. Every shipment we handle—whether sea freight FCL/LCL, 
                air cargo, break bulk, or complex DDU/DDP logistics—carries our commitment to excellence.
              </p>
              
              <p className="text-lg text-[#1A1A1B] opacity-70 leading-relaxed">
                What sets us apart is our deep understanding of Himalayan transit challenges and our unwavering dedication 
                to on-time delivery. We treat your cargo as our own, ensuring it reaches its destination safely, securely, 
                and efficiently.
              </p>
              
              <div className="pt-8 border-t border-[#1A1A1B]/10">
                <p className="text-2xl text-[#003893] italic leading-relaxed" style={{ fontWeight: 600 }}>
                  "Your cargo, our commitment—
                  <br />
                  connecting Nepal to the world."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="relative py-32 px-6 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
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
                Core Values
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl text-[#1A1A1B] tracking-tight" style={{ fontWeight: 700 }}>
              What We
              <br />
              <span className="opacity-40">Stand For</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-[#1A1A1B]/10">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white p-12 hover:bg-[#F5F7F8] transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FFD700] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                
                <value.icon className="w-14 h-14 text-[#003893] mb-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1.5} />
                
                <h3 className="text-2xl text-[#1A1A1B] mb-4 tracking-tight" style={{ fontWeight: 700 }}>
                  {value.title}
                </h3>
                
                <p className="text-[#1A1A1B] opacity-60 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Company Way/Process Section */}
      <section className="relative py-32 px-6 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-[#1A1A1B] opacity-20" />
              <span className="text-[#1A1A1B] text-sm tracking-[0.2em] uppercase font-mono opacity-40">
                Our Process
              </span>
              <div className="w-12 h-px bg-[#1A1A1B] opacity-20" />
            </div>
            <h2 className="text-4xl lg:text-6xl text-[#1A1A1B] tracking-tight" style={{ fontWeight: 700 }}>
              The Pan Pacific
              <br />
              <span className="opacity-40">Way</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-[#F5F7F8] p-8 hover:bg-white border-2 border-transparent hover:border-[#003893]/10 transition-all duration-500"
              >
                <div className="absolute top-8 right-8 text-7xl font-mono text-[#1A1A1B] opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  {step.number}
                </div>
                
                <div className="relative z-10">
                  <step.icon className="w-10 h-10 text-[#DC143C] mb-6" strokeWidth={1.5} />
                  
                  <h3 className="text-2xl text-[#1A1A1B] mb-3 tracking-tight" style={{ fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  
                  <p className="text-[#1A1A1B] opacity-60 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-32 px-6 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl lg:text-6xl text-[#1A1A1B] tracking-tight" style={{ fontWeight: 700 }}>
              Why Choose
              <br />
              <span className="opacity-40">Pan Pacific</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-[#1A1A1B]" strokeWidth={3} />
                  </div>
                  <p className="text-lg text-[#1A1A1B] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {benefit}
                  </p>
                </motion.div>
              ))}

              <div className="pt-8">
                <p className="text-2xl text-[#003893] leading-relaxed" style={{ fontWeight: 600 }}>
                  14+ Years of Excellence
                  <br />
                  <span className="text-lg text-[#1A1A1B] opacity-40">
                    in Himalayan Logistics
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-[#003893]/30 to-transparent z-10" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759272548470-d0686d071036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXBwaW5nJTIwb3BlcmF0aW9ucyUyMHdhcmVob3VzZXxlbnwxfHx8fDE3Njg0Njg2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Pan Pacific Operations"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-[#DC143C] text-white px-8 py-6 z-20">
                <p className="text-4xl font-mono" style={{ fontWeight: 700 }}>50+</p>
                <p className="text-sm tracking-[0.15em] uppercase opacity-80">Global Ports</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
