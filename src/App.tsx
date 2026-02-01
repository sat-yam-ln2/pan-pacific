import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import PillNav from './components/PillNav';
import { HomePage } from './components/HomePage';
import { ServicesPage } from './components/ServicesPage';
import { About } from './components/About';
import { Tracking } from './components/Tracking';
import { Quote } from './components/Quote';
import { FAQ } from './components/FAQ';
import { Blog } from './components/Blog';
import { BlogDetail } from './components/BlogDetail';
import { Contact } from './components/Contact';
import { AdminTracking } from './components/AdminTracking';
import { UnifiedAdminPanel } from './components/admin/UnifiedAdminPanel';
import { VerticalBadge } from './components/VerticalBadge';
import { NepalMotif } from './components/NepalMotif';
import { FloatingButtons } from './components/FloatingButtons';
import logoImage from './assets/024a4a122e95c709239c8d5180f151d7b759edc8.png';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Tracking', href: '/tracking' },
  { label: 'Quote', href: '/quote' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' }
];

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="relative bg-[#F5F7F8] overflow-hidden">
      <NepalMotif />
      <VerticalBadge />
      <FloatingButtons />

      {/* Logo and Navigation - Left Aligned */}
      <div className="fixed top-0 left-0 w-full z-[999] flex items-center justify-between gap-4 px-6 lg:px-20 py-4 bg-[#F5F7F8]/95 backdrop-blur-md border-b border-[#1A1A1B]/5 transition-all duration-300">
        <a
          href="/"
          className="flex-shrink-0 w-16 h-16 hover:scale-105 transition-all duration-300 relative rounded-lg bg-white/80 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.9)] p-2"
          aria-label="Pan Pacific Shipping & Logistics Home"
        >
          <img src={logoImage} alt="Pan Pacific Logo" className="w-full h-full object-contain" />
        </a>

        <div className="flex-1 flex justify-end">
          <PillNav
            items={navItems}
            activeHref={currentPath}
            baseColor="#003893"
            pillColor="#F5F7F8"
            hoveredPillTextColor="#F5F7F8"
            pillTextColor="#003893"
          />
        </div>
      </div>

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-tracking" element={<AdminTracking />} />
          <Route path="/admin/*" element={<UnifiedAdminPanel />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}