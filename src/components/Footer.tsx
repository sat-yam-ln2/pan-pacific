import React from 'react';
import { Link } from 'react-router';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  ArrowRight,
  Globe
} from 'lucide-react';
import { ThreadsDivider } from './ThreadsDivider';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white">
      {/* Threads Divider */}
      <ThreadsDivider />

      {/* Main Footer Content */}
      <div className="relative bg-white text-[#1A1A1B] px-6 lg:px-20 pt-20 pb-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl mb-6 tracking-tight" style={{ fontWeight: 700 }}>
                Pan Pacific
                <br />
                <span className="text-[#003893]">Shipping & Logistics</span>
              </h3>
              <p className="text-[#1A1A1B]/60 leading-relaxed mb-6">
                Nepal's trusted partner for international freight forwarding since 2011.
                Connecting businesses to global markets with precision and reliability.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-[#1A1A1B]/20 hover:border-[#003893] hover:bg-[#003893] hover:text-white text-[#1A1A1B] flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-[#1A1A1B]/20 hover:border-[#003893] hover:bg-[#003893] hover:text-white text-[#1A1A1B] flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-[#1A1A1B]/20 hover:border-[#003893] hover:bg-[#003893] hover:text-white text-[#1A1A1B] flex items-center justify-center transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-[#1A1A1B]/20 hover:border-[#003893] hover:bg-[#003893] hover:text-white text-[#1A1A1B] flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg mb-6 tracking-tight" style={{ fontWeight: 700 }}>
                Our Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/services"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    Sea Freight FCL/LCL
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    Air Freight
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    Break Bulk Cargo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    DDU/DDP Logistics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    Customs Clearance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    Warehousing & Distribution
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg mb-6 tracking-tight" style={{ fontWeight: 700 }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tracking"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    Track Shipment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/quote"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    Get Quote
                  </Link>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-[#1A1A1B]/60 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg mb-6 tracking-tight" style={{ fontWeight: 700 }}>
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[#1A1A1B]/60">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-[#FFD700]" />
                  <div>
                    <p className="leading-relaxed">
                      1st Floor, Jyatha-29<br />
                      Thamel, Kathmandu, Nepal
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-[#1A1A1B]/60">
                  <Phone className="w-5 h-5 flex-shrink-0 mt-1 text-[#FFD700]" />
                  <div className="space-y-1">
                    <a href="tel:+97714216735" className="hover:text-[#003893] transition-colors block">
                      +977 1 4216735
                    </a>
                    <a href="tel:+97714216862" className="hover:text-[#003893] transition-colors block">
                      +977 1 4216862
                    </a>
                    <a href="tel:+97714152027" className="hover:text-[#003893] transition-colors block">
                      +977 1 4152027
                    </a>
                    <div className="pt-2 border-t border-[#1A1A1B]/10 mt-2">
                      <p className="text-xs text-[#1A1A1B]/40 mb-1">Director Contact:</p>
                      <a href="tel:+9779841243981" className="hover:text-[#003893] transition-colors block">
                        +977 9841243981
                      </a>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-[#1A1A1B]/60">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-1 text-[#FFD700]" />
                  <div>
                    <a href="mailto:csvpanpacific@wlink.com.np" className="hover:text-[#FFD700] transition-colors break-all">
                      csvpanpacific@wlink.com.np
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-[#1A1A1B]/60">
                  <Globe className="w-5 h-5 flex-shrink-0 mt-1 text-[#FFD700]" />
                  <div>
                    <a href="https://www.pslnepal.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors">
                      www.pslnepal.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-[#1A1A1B]/60">
                  <Clock className="w-5 h-5 flex-shrink-0 mt-1 text-[#FFD700]" />
                  <div>
                    <p className="leading-relaxed">
                      Sun - Fri: 9:00 AM - 6:00 PM<br />
                      Saturday: Closed
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Global Reach Banner */}
          <div className="border-t border-[#1A1A1B]/10 pt-12 mb-12">
            <div className="text-center mb-6">
              <p className="text-sm text-[#1A1A1B]/40 tracking-[0.2em] uppercase font-mono mb-4">
                Global Reach
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-[#1A1A1B]/60 text-sm">
                <span className="px-4 py-2 border border-[#1A1A1B]/20 hover:border-[#003893] hover:text-[#003893] transition-colors">
                  Middle East
                </span>
                <span className="px-4 py-2 border border-[#1A1A1B]/20 hover:border-[#003893] hover:text-[#003893] transition-colors">
                  Far East
                </span>
                <span className="px-4 py-2 border border-[#1A1A1B]/20 hover:border-[#003893] hover:text-[#003893] transition-colors">
                  USA
                </span>
                <span className="px-4 py-2 border border-[#1A1A1B]/20 hover:border-[#003893] hover:text-[#003893] transition-colors">
                  Europe
                </span>
                <span className="px-4 py-2 border border-[#1A1A1B]/20 hover:border-[#003893] hover:text-[#003893] transition-colors">
                  Australia
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#1A1A1B]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#1A1A1B]/40">
            <p>
              © {currentYear} Pan Pacific Shipping & Logistics Services Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#003893] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#003893] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#003893] transition-colors">
                Sitemap
              </a>
            </div>
          </div>

          {/* Managing Directors */}
          <div className="mt-8 pt-8 border-t border-[#1A1A1B]/10 text-center">
            <p className="text-xs text-[#1A1A1B]/40 tracking-[0.15em] uppercase font-mono mb-2">
              Leadership
            </p>
            <p className="text-sm text-[#1A1A1B]/60">
              <span className="text-[#003893]">Manoj Thapa</span> - Managing Director
            </p>
            <p className="text-xs text-[#1A1A1B]/40 mt-2">
              14+ Years of Excellence in Himalayan Logistics
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-[#003893] via-[#FFD700] to-[#DC143C]" />
    </footer>
  );
}