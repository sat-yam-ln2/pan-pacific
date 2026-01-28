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
import { PhoneHeader } from './components/PhoneHeader';
import logoImage from 'figma:asset/024a4a122e95c709239c8d5180f151d7b759edc8.png';

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
      <PhoneHeader />

      {/* External Logo + Navigation Layout */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-4">
        <a
          href="/"
          className="flex-shrink-0 w-24 h-24 hover:scale-105 transition-all duration-300"
          aria-label="Pan Pacific Shipping & Logistics Home"
        >
          <img src={logoImage} alt="Pan Pacific Logo" className="w-full h-full object-contain" />
        </a>

        <PillNav
          logo={logoImage}
          logoAlt="Pan Pacific Shipping & Logistics"
          items={navItems}
          activeHref={currentPath}
          baseColor="#003893"
          pillColor="#F5F7F8"
          hoveredPillTextColor="#F5F7F8"
          pillTextColor="#003893"
        />
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