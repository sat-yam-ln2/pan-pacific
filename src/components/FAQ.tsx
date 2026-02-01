import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ChevronDown,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  DollarSign,
  Truck,
  Globe,
  Shield
} from 'lucide-react';
import { Link } from 'react-router';
import { Footer } from './Footer';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Shipping & Delivery
  {
    category: 'Shipping & Delivery',
    question: 'What cargo services does Pan Pacific offer?',
    answer: 'We offer comprehensive logistics solutions including Sea Freight (FCL & LCL), Air Freight, Break Bulk cargo, DDU (Delivered Duty Unpaid), and DDP (Delivered Duty Paid) services. Our network covers major routes to the Middle East, Far East, USA, Europe, and Australia.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'How fast is delivery for international shipments?',
    answer: 'Delivery times vary by service: Air Freight Express (2-3 days), Air Freight Standard (5-7 days), Sea Freight LCL (15-25 days), Sea Freight FCL (20-35 days). Economy services take 10-15 days. Exact timelines depend on origin, destination, and customs clearance.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'Do you provide door-to-door delivery?',
    answer: 'Yes! Our DDP (Delivered Duty Paid) service includes complete door-to-door delivery with all customs duties and taxes paid. We handle pickup from your location in Nepal and deliver directly to the recipient\'s address internationally.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'What is the difference between FCL and LCL shipping?',
    answer: 'FCL (Full Container Load) means you rent an entire shipping container, ideal for large volumes (20ft or 40ft containers). LCL (Less than Container Load) allows you to share container space with other shippers, perfect for smaller shipments. FCL is faster and more secure; LCL is more cost-effective for smaller volumes.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'Which countries do you ship to?',
    answer: 'We provide shipping services to over 200 countries worldwide, with specialized routes to the Middle East (UAE, Saudi Arabia, Qatar), Far East (China, Japan, Korea, Singapore), USA, Europe (UK, Germany, France), and Australia. Our primary hub is Tribhuvan International Airport in Kathmandu.'
  },

  // Pricing & Payments
  {
    category: 'Pricing & Payments',
    question: 'How are shipping rates calculated?',
    answer: 'Shipping rates are based on several factors: weight (actual or volumetric, whichever is greater), dimensions, destination, service type (air/sea, express/standard), cargo type, and any special handling requirements. For accurate quotes, use our online quote form or contact our team directly.'
  },
  {
    category: 'Pricing & Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, credit/debit cards, and cash payments at our Kathmandu office. For corporate clients, we offer credit terms upon approval. Payment is typically required before shipment for new customers, with flexible terms available for established business relationships.'
  },
  {
    category: 'Pricing & Payments',
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees! We provide transparent pricing with all costs outlined in your quote, including freight charges, fuel surcharges, documentation fees, and handling charges. Additional costs may occur for special services, storage, or customs duties (unless using DDP service).'
  },
  {
    category: 'Pricing & Payments',
    question: 'Do you offer discounts for bulk shipments?',
    answer: 'Yes, we offer competitive rates for high-volume shippers and regular business clients. FCL shipments and long-term contracts receive preferential pricing. Contact our sales team at info@panpacificnepal.com to discuss volume discounts tailored to your needs.'
  },
  {
    category: 'Pricing & Payments',
    question: 'What is included in the DDP service cost?',
    answer: 'Our DDP (Delivered Duty Paid) service includes freight charges, insurance, customs clearance, import duties, taxes, and final delivery to the recipient. You pay one comprehensive fee with no surprises at destination—we handle all costs and paperwork.'
  },

  // Customs & Documentation
  {
    category: 'Customs & Documentation',
    question: 'What documents are required for international shipping?',
    answer: 'Standard documents include: Commercial Invoice (3 copies), Packing List, Bill of Lading/Airway Bill, Certificate of Origin (if required), and any product-specific certificates (e.g., phytosanitary for agricultural goods). Our team provides a complete checklist based on your destination and cargo type.'
  },
  {
    category: 'Customs & Documentation',
    question: 'Do you handle customs clearance?',
    answer: 'Absolutely! We manage all customs procedures including documentation preparation, duty calculation, clearance processing, and coordination with customs authorities. Our 14 years of experience ensures smooth, compliant clearance at both origin and destination.'
  },
  {
    category: 'Customs & Documentation',
    question: 'What items are prohibited from shipping?',
    answer: 'Prohibited items include: weapons and ammunition, illegal drugs, hazardous materials without proper certification, counterfeit goods, and perishable foods (restrictions vary by destination). Restricted items like batteries, liquids, and electronics require special documentation. We\'ll guide you through regulations for your specific cargo.'
  },
  {
    category: 'Customs & Documentation',
    question: 'How long does customs clearance take?',
    answer: 'Customs clearance typically takes 1-3 business days for air freight and 3-7 days for sea freight, depending on the destination country, completeness of documentation, and cargo type. Our experienced customs team expedites the process to minimize delays.'
  },
  {
    category: 'Customs & Documentation',
    question: 'Who pays customs duties and taxes?',
    answer: 'With DDU (Delivered Duty Unpaid), the recipient pays duties and taxes at destination. With DDP (Delivered Duty Paid), Pan Pacific pays all duties and taxes on your behalf—it\'s included in your shipping quote. We recommend DDP for hassle-free international shipping.'
  },

  // Tracking
  {
    category: 'Tracking',
    question: 'How do I track my shipment?',
    answer: 'Track your shipment easily on our Tracking page using your tracking number (AWB for air freight or B/L number for sea freight). You\'ll see real-time updates including pickup, departure, customs clearance, and delivery status. We also send automated email/SMS notifications at key milestones.'
  },
  {
    category: 'Tracking',
    question: 'Will I receive notifications about my shipment?',
    answer: 'Yes! We provide proactive notifications via email and SMS when your shipment is picked up, departs origin, clears customs, arrives at destination airport/port, is out for delivery, and is successfully delivered. You can also contact our support team anytime for updates.'
  },
  {
    category: 'Tracking',
    question: 'What if my tracking shows no updates?',
    answer: 'Tracking may not update immediately during transit or weekends. Sea freight updates are less frequent than air freight. If your tracking hasn\'t updated in 3 business days, contact our support team at +977 1 4216735 or csvpanpacific@wlink.com.np with your tracking number for immediate assistance.'
  },

  // Services
  {
    category: 'Services',
    question: 'Do you handle fragile or valuable items?',
    answer: 'Yes, we specialize in handling delicate cargo including electronics, glassware, artwork, and antiques. We provide custom crating, specialized packing materials, "Fragile" labeling, and careful handling protocols. We recommend additional insurance for high-value items.'
  },
  {
    category: 'Services',
    question: 'How should I pack my items for shipping?',
    answer: 'Use sturdy corrugated boxes, bubble wrap for fragile items, fill empty spaces with packing peanuts or paper, and seal with strong packing tape. Label boxes clearly with contents and "This Side Up" arrows. For Break Bulk or heavy machinery, contact us for professional packing services and crating solutions.'
  },
  {
    category: 'Services',
    question: 'Do you provide cargo insurance?',
    answer: 'Yes, we offer comprehensive cargo insurance covering loss, damage, and theft during transit. Insurance costs typically 1-3% of declared cargo value. While our handling is careful, we strongly recommend insurance for valuable shipments to protect your investment.'
  },
  {
    category: 'Services',
    question: 'Can you handle oversized or heavy cargo?',
    answer: 'Absolutely! Our Break Bulk service specializes in oversized, overweight, and project cargo including machinery, vehicles, construction equipment, and industrial materials. We arrange specialized loading equipment, route planning, and permits. Contact us for a customized Break Bulk solution.'
  },
  {
    category: 'Services',
    question: 'Do you offer warehousing and storage?',
    answer: 'Yes, we provide secure warehousing facilities in Kathmandu for temporary storage, consolidation, and distribution. Our warehouse offers climate control, 24/7 security, and inventory management. Storage fees apply after the first 7 days of free storage.'
  },

  // General
  {
    category: 'General',
    question: 'How do I file a claim for damaged or lost cargo?',
    answer: 'Notify us within 24 hours of delivery if damage is visible, or within 7 days for concealed damage. Provide photos, the original packing list, and your insurance policy (if applicable). Our claims team will guide you through the process and work with insurance providers for resolution.'
  },
  {
    category: 'General',
    question: 'What are your business hours?',
    answer: 'Our Kathmandu office is open Sunday-Friday, 9:00 AM - 6:00 PM NPT (closed Saturdays). Our customer support team is available via email 24/7, with phone support during business hours. For urgent shipments, contact our emergency hotline.'
  },
  {
    category: 'General',
    question: 'How experienced is Pan Pacific in logistics?',
    answer: 'Pan Pacific Shipping & Logistics Services has been serving Nepal since 2011—that\'s 14 years of expertise in international freight forwarding. Our leadership team (MD: Manoj Thapa) brings decades of combined experience, ensuring reliable, professional service for every shipment.'
  },
  {
    category: 'General',
    question: 'Can I change my shipment details after booking?',
    answer: 'Changes are possible before cargo pickup or within 24 hours of booking, depending on the modification. Address changes, weight adjustments, or service upgrades may incur additional fees. Contact our customer service team immediately to request changes—we\'ll do our best to accommodate.'
  }
];

const categories = [
  'All',
  'Shipping & Delivery',
  'Pricing & Payments',
  'Customs & Documentation',
  'Tracking',
  'Services',
  'General'
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="min-h-screen bg-[#F5F7F8]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#003893] to-[#002a6b] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[150px] pr-[32px] pb-[20px] pl-[32px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Find answers to common questions about our shipping services, pricing, and logistics solutions
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1B]/40" size={20} />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-white/20 bg-white text-[#1A1A1B] placeholder-[#1A1A1B]/40 focus:border-[#FFD700] outline-none transition-colors"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="bg-white border-b-2 border-[#1A1A1B]/10 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4 gap-3 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeCategory === category
                      ? 'bg-[#003893] text-white'
                      : 'bg-[#F5F7F8] text-[#1A1A1B] hover:bg-[#003893]/10'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-[#1A1A1B]/60">
                  No questions found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-[#003893] hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg border-2 border-[#1A1A1B]/10 overflow-hidden hover:border-[#003893]/30 transition-colors"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-[#F5F7F8]/50 transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <span className="text-xs font-mono text-[#003893] mb-2 block">
                          {faq.category}
                        </span>
                        <h3 className="text-lg font-semibold text-[#1A1A1B]">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <ChevronDown className="text-[#003893]" size={24} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-[#1A1A1B]/70 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#1A1A1B] mb-4">
                Didn't Find Your Answer?
              </h2>
              <p className="text-xl text-[#1A1A1B]/60">
                Our support team is here to help you with any questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Phone */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#003893] to-[#002a6b] p-6 rounded-lg text-white text-center"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
                <p className="text-sm text-white/80 mb-3">Sun-Fri, 9AM-6PM NPT</p>
                <a href="tel:+97714216735" className="text-[#FFD700] hover:underline block text-sm">
                  +977 1 4216735
                </a>
                <a href="tel:+97714216862" className="text-[#FFD700] hover:underline block text-sm mt-1">
                  +977 1 4216862
                </a>
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#DC143C] to-[#a00f2d] p-6 rounded-lg text-white text-center"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-sm text-white/80 mb-3">24/7 Response</p>
                <a href="mailto:csvpanpacific@wlink.com.np" className="text-[#FFD700] hover:underline break-all text-sm">
                  csvpanpacific@wlink.com.np
                </a>
              </motion.div>

              {/* Live Chat */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#FFD700] to-[#ddb800] p-6 rounded-lg text-[#1A1A1B] text-center"
              >
                <div className="w-14 h-14 bg-white/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                <p className="text-sm text-[#1A1A1B]/70 mb-3">Available Now</p>
                <button className="text-[#003893] font-semibold hover:underline">
                  Start Chat
                </button>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#1A1A1B] to-[#000000] p-6 rounded-lg text-white text-center"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Contact Form</h3>
                <p className="text-sm text-white/80 mb-3">Detailed Inquiries</p>
                <Link to="/quote" className="text-[#FFD700] hover:underline">
                  Get Quote
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-16 bg-[#F5F7F8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#1A1A1B] mb-4">
                Popular Topics
              </h2>
              <p className="text-xl text-[#1A1A1B]/60">
                Quick access to frequently requested information
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Shipping Rates */}
              <motion.button
                onClick={() => {
                  setActiveCategory('Pricing & Payments');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg border-2 border-[#1A1A1B]/10 hover:border-[#003893] transition-all text-left group"
              >
                <div className="w-12 h-12 bg-[#003893]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#003893] transition-colors">
                  <DollarSign className="text-[#003893] group-hover:text-white" size={24} />
                </div>
                <h3 className="font-semibold text-lg text-[#1A1A1B] mb-2">
                  Shipping Rates
                </h3>
                <p className="text-sm text-[#1A1A1B]/60">
                  Learn how we calculate pricing for different services
                </p>
              </motion.button>

              {/* Tracking Guide */}
              <motion.button
                onClick={() => {
                  setActiveCategory('Tracking');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg border-2 border-[#1A1A1B]/10 hover:border-[#DC143C] transition-all text-left group"
              >
                <div className="w-12 h-12 bg-[#DC143C]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#DC143C] transition-colors">
                  <Truck className="text-[#DC143C] group-hover:text-white" size={24} />
                </div>
                <h3 className="font-semibold text-lg text-[#1A1A1B] mb-2">
                  Tracking Guide
                </h3>
                <p className="text-sm text-[#1A1A1B]/60">
                  How to track and monitor your shipments
                </p>
              </motion.button>

              {/* Customs Info */}
              <motion.button
                onClick={() => {
                  setActiveCategory('Customs & Documentation');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg border-2 border-[#1A1A1B]/10 hover:border-[#FFD700] transition-all text-left group"
              >
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FFD700] transition-colors">
                  <Globe className="text-[#FFD700] group-hover:text-[#1A1A1B]" size={24} />
                </div>
                <h3 className="font-semibold text-lg text-[#1A1A1B] mb-2">
                  Customs Info
                </h3>
                <p className="text-sm text-[#1A1A1B]/60">
                  Understanding customs clearance and duties
                </p>
              </motion.button>

              {/* Documentation */}
              <motion.button
                onClick={() => {
                  setActiveCategory('Customs & Documentation');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg border-2 border-[#1A1A1B]/10 hover:border-[#1A1A1B] transition-all text-left group"
              >
                <div className="w-12 h-12 bg-[#1A1A1B]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1A1A1B] transition-colors">
                  <Shield className="text-[#1A1A1B] group-hover:text-white" size={24} />
                </div>
                <h3 className="font-semibold text-lg text-[#1A1A1B] mb-2">
                  Documentation
                </h3>
                <p className="text-sm text-[#1A1A1B]/60">
                  Required documents for international shipping
                </p>
              </motion.button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#003893] to-[#002a6b] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Get in touch with our logistics experts for personalized assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="px-8 py-4 bg-[#DC143C] hover:bg-[#a00f2d] text-white font-semibold rounded-lg transition-colors"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:+97714216735"
                className="px-8 py-4 bg-white hover:bg-[#F5F7F8] text-[#003893] font-semibold rounded-lg transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}