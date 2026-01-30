import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router';
import { post } from '../services/api';
import { Footer } from './Footer';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const quickFAQs = [
  {
    question: 'What are your shipping rates?',
    answer: 'Rates vary by weight, destination, and service type. Use our quote form or contact us for accurate pricing.'
  },
  {
    question: 'How long does international shipping take?',
    answer: 'Air freight: 2-7 days. Sea freight: 15-35 days depending on destination and service type.'
  },
  {
    question: 'Do you handle customs clearance?',
    answer: 'Yes! We manage all customs procedures including documentation, duty calculation, and clearance processing.'
  },
  {
    question: 'Can I track my shipment?',
    answer: 'Absolutely! Use our tracking page with your AWB or B/L number for real-time updates.'
  },
  {
    question: 'What documents do I need for shipping?',
    answer: 'Typically: Commercial Invoice, Packing List, Bill of Lading, and Certificate of Origin (if required).'
  },
  {
    question: 'Do you offer cargo insurance?',
    answer: 'Yes, we provide comprehensive cargo insurance covering loss, damage, and theft during transit.'
  }
];

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await post<{ success: boolean; message?: string }>(
        '/contact',
        {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        },
        false
      );

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F5F7F8]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#003893] to-[#002a6b] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] pr-[32px] pb-[0px] pl-[32px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                We're here to help with all your shipping and logistics needs
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Address Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#003893] to-[#002a6b] p-6 rounded-xl text-white"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <MapPin size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Address</h3>
                <p className="text-white/80 leading-relaxed">
                  1st Floor, Jyatha-29<br />
                  Thamel, Kathmandu<br />
                  Nepal
                </p>
                <a 
                  href="https://maps.google.com/?q=Jyatha-29,Thamel,Kathmandu,Nepal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[#FFD700] hover:underline text-sm"
                >
                  Get Directions →
                </a>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#DC143C] to-[#a00f2d] p-6 rounded-xl text-white"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Phone size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Call Us</h3>
                <div className="space-y-2 text-white/80">
                  <a href="tel:+97714216735" className="block hover:text-white transition-colors">
                    +977 1 4216735
                  </a>
                  <a href="tel:+97714216862" className="block hover:text-white transition-colors">
                    +977 1 4216862
                  </a>
                  <a href="tel:+97714152027" className="block hover:text-white transition-colors">
                    +977 1 4152027
                  </a>
                  <div className="pt-2 mt-2 border-t border-white/20">
                    <p className="text-xs mb-1">Director Contact:</p>
                    <a href="tel:+9779841243981" className="hover:text-white transition-colors">
                      +977 9841243981
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[#FFD700] to-[#ddb800] p-6 rounded-xl text-[#1A1A1B]"
              >
                <div className="w-14 h-14 bg-white/40 rounded-full flex items-center justify-center mb-4">
                  <Mail size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Email Us</h3>
                <div className="space-y-2">
                  <a 
                    href="mailto:csvpanpacific@wlink.com.np" 
                    className="block text-[#1A1A1B]/80 hover:text-[#1A1A1B] transition-colors break-all"
                  >
                    csvpanpacific@wlink.com.np
                  </a>
                  <div className="pt-2 mt-2 border-t border-[#1A1A1B]/20">
                    <p className="text-xs mb-1">Website:</p>
                    <a 
                      href="https://www.pslnepal.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      www.pslnepal.com
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Business Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#1A1A1B] to-[#000000] p-6 rounded-xl text-white"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Clock size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Business Hours</h3>
                <div className="space-y-2 text-white/80">
                  <div className="flex justify-between">
                    <span>Sunday - Friday:</span>
                    <span className="font-semibold text-white">9AM - 6PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold text-white">Closed</span>
                  </div>
                  <p className="text-xs pt-2 mt-2 border-t border-white/20">
                    * Closed on public holidays
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form + Map Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-xl border-2 border-[#1A1A1B]/10"
              >
                <h2 className="text-3xl font-bold text-[#1A1A1B] mb-2">
                  Send Us a Message
                </h2>
                <p className="text-[#1A1A1B]/60 mb-6">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-green-800">Message sent successfully!</p>
                      <p className="text-sm text-green-700">We'll get back to you soon.</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg flex items-start gap-3">
                    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-red-800">Failed to send message</p>
                      <p className="text-sm text-red-700">Please try again or contact us directly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.fullName 
                          ? 'border-red-500 focus:border-red-600' 
                          : 'border-[#1A1A1B]/20 focus:border-[#003893]'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-600' 
                          : 'border-[#1A1A1B]/20 focus:border-[#003893]'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.phone 
                          ? 'border-red-500 focus:border-red-600' 
                          : 'border-[#1A1A1B]/20 focus:border-[#003893]'
                      }`}
                      placeholder="+977 XXXXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                      Subject / Service Type *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.subject 
                          ? 'border-red-500 focus:border-red-600' 
                          : 'border-[#1A1A1B]/20 focus:border-[#003893]'
                      }`}
                    >
                      <option value="">Select a subject...</option>
                      <option value="Air Cargo">Air Cargo</option>
                      <option value="Sea Freight">Sea Freight</option>
                      <option value="Land Transport">Land Transport</option>
                      <option value="Door-to-Door Delivery">Door-to-Door Delivery</option>
                      <option value="Customs Clearance">Customs Clearance</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Quote Request">Quote Request</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none ${
                        errors.message 
                          ? 'border-red-500 focus:border-red-600' 
                          : 'border-[#1A1A1B]/20 focus:border-[#003893]'
                      }`}
                      placeholder="Tell us about your shipping needs..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#003893] hover:bg-[#002a6b] text-white font-semibold rounded-lg transition-colors disabled:bg-[#003893]/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Google Maps Embed */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl border-2 border-[#1A1A1B]/10 overflow-hidden h-full min-h-[600px]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0723822844363!2d85.30858931506196!3d27.715331982790947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fdefffffff%3A0x5681bbf5f1e2139a!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1234567890123!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pan Pacific Office Location"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#1A1A1B] mb-4">
                Common Questions
              </h2>
              <p className="text-xl text-[#1A1A1B]/60">
                Quick answers to frequently asked questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {quickFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#F5F7F8] p-6 rounded-lg border-2 border-[#1A1A1B]/10 hover:border-[#003893]/30 transition-colors"
                >
                  <h3 className="text-lg font-bold text-[#1A1A1B] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-[#1A1A1B]/70 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#003893] hover:bg-[#002a6b] text-white font-semibold rounded-lg transition-colors"
              >
                View All FAQs
              </Link>
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="py-16 bg-gradient-to-br from-[#003893] to-[#002a6b] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4">
                Connect With Us
              </h2>
              <p className="text-xl text-white/80">
                Follow us on social media for updates and logistics insights
              </p>
            </div>

            <div className="flex justify-center items-center gap-6 flex-wrap">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white/20 hover:bg-[#1877F2] border-2 border-white/40 hover:border-[#1877F2] rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={28} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white/20 hover:bg-gradient-to-br hover:from-[#E1306C] hover:to-[#FD1D1D] border-2 border-white/40 hover:border-[#E1306C] rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={28} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white/20 hover:bg-[#0A66C2] border-2 border-white/40 hover:border-[#0A66C2] rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white/20 hover:bg-[#1DA1F2] border-2 border-white/40 hover:border-[#1DA1F2] rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={28} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white/20 hover:bg-[#FF0000] border-2 border-white/40 hover:border-[#FF0000] rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube size={28} />
              </a>
            </div>

            {/* Additional Contact CTA */}
            <div className="mt-12 text-center">
              <p className="text-lg text-white/80 mb-6">
                Prefer to speak directly? Our team is ready to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+97714216735"
                  className="px-8 py-4 bg-[#DC143C] hover:bg-[#a00f2d] text-white font-semibold rounded-lg transition-colors"
                >
                  Call Now
                </a>
                <Link
                  to="/quote"
                  className="px-8 py-4 bg-white hover:bg-[#F5F7F8] text-[#003893] font-semibold rounded-lg transition-colors"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
