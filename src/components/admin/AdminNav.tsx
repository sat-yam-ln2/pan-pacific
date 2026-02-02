import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Database,
  Users,
  LogOut,
  Menu,
  X,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminNavProps {
  adminUser: {
    name: string;
    email: string;
    avatar: string;
  };
  onLogout: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const navLinks = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/admin/orders', icon: Package, label: 'Order Management' },
  { path: '/admin/blogs', icon: FileText, label: 'Blog Management' },
  { path: '/admin/data-tools', icon: Database, label: 'Data Tools' },
  { path: '/admin/users', icon: Users, label: 'Admin Management' },
];

export function AdminNav({ adminUser, onLogout, isMobileMenuOpen, setIsMobileMenuOpen }: AdminNavProps) {
  return (
    <>
      {/* Top Header */}
      <header className="bg-gradient-to-r from-[#003893] to-[#002a6b] text-white px-4 md:px-6 py-3 md:py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Admin Panel</h1>
              <p className="text-xs md:text-sm text-white/70 hidden sm:block">Pan Pacific Shipping & Logistics</p>
            </div>
          </div>

          {/* Right: User Info & Logout */}
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <p className="text-xs text-white/70">{new Date().toLocaleTimeString()}</p>
            </div>

            <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 border-l border-white/20">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FFD700] rounded-full flex items-center justify-center font-bold text-[#003893] text-sm md:text-base">
                {adminUser.avatar}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">{adminUser.name}</p>
                <p className="text-xs text-white/70">{adminUser.email}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="px-3 md:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-sm md:text-base"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-[72px] bottom-0 w-64 bg-white border-r-2 border-[#1A1A1B]/10 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                  ? 'bg-gradient-to-r from-[#003893] to-[#002a6b] text-white shadow-lg'
                  : 'text-[#1A1A1B] hover:bg-[#F5F7F8]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon size={20} className={isActive ? 'text-[#FFD700]' : ''} />
                  <span className="font-semibold">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#1A1A1B]/10 bg-[#F5F7F8]">
          <p className="text-xs text-[#1A1A1B]/60 text-center">
            Pan Pacific Shipping
            <br />
            Est. 2011 • 14 Years of Excellence
          </p>
        </div>
      </aside>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 top-[72px]"
            />

            {/* Menu */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-[72px] bottom-0 w-64 bg-white border-r-2 border-[#1A1A1B]/10 overflow-y-auto z-50 shadow-2xl"
            >
              <nav className="p-4 space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.end}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                        ? 'bg-gradient-to-r from-[#003893] to-[#002a6b] text-white shadow-lg'
                        : 'text-[#1A1A1B] hover:bg-[#F5F7F8]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <link.icon size={20} className={isActive ? 'text-[#FFD700]' : ''} />
                        <span className="font-semibold">{link.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#1A1A1B]/10 bg-[#F5F7F8]">
                <p className="text-xs text-[#1A1A1B]/60 text-center">
                  Pan Pacific Shipping
                  <br />
                  Est. 2011 • 14 Years of Excellence
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
