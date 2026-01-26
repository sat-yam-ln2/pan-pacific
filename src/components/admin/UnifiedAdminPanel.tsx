import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Package, Loader2, AlertCircle } from 'lucide-react';
import { AdminNav } from './AdminNav';
import { AdminDashboard } from './AdminDashboard';
import { OrderManagement } from './OrderManagement';
import { DataTools } from './DataTools';
import { AdminManagement } from './AdminManagement';
import { Footer } from '../Footer';

interface AdminUser {
  name: string;
  email: string;
  avatar: string;
}

interface Shipment {
  id: string;
  trackingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'customs' | 'out-for-delivery' | 'delivered' | 'cancelled';
  serviceType: 'air-freight' | 'sea-freight' | 'land-transport' | 'door-to-door';
  packageDetails: string;
  weight: string;
  dimensions: string;
  specialInstructions?: string;
  createdDate: string;
  lastUpdated: string;
  estimatedDelivery: string;
  events: Array<{
    date: string;
    status: string;
    location: string;
    description: string;
  }>;
}

// Mock shipments data
const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingId: 'PPS2024001',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh@example.com',
    customerPhone: '+977 9841234567',
    origin: 'Kathmandu, Nepal',
    destination: 'Dubai, UAE',
    status: 'in-transit',
    serviceType: 'air-freight',
    packageDetails: 'Electronics - 5 boxes',
    weight: '125 kg',
    dimensions: '100x80x60 cm',
    specialInstructions: 'Handle with care - fragile items',
    createdDate: '2024-01-10',
    lastUpdated: '2024-01-14',
    estimatedDelivery: '2024-01-17',
    events: [
      { date: '2024-01-14 10:30', status: 'In Transit', location: 'Dubai Airport', description: 'Arrived at destination hub' },
      { date: '2024-01-12 15:20', status: 'In Transit', location: 'Tribhuvan Airport', description: 'Departed origin' },
      { date: '2024-01-10 09:00', status: 'Processing', location: 'Kathmandu Office', description: 'Shipment received' }
    ]
  },
  {
    id: '2',
    trackingId: 'PPS2024002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 555-0123',
    origin: 'Los Angeles, USA',
    destination: 'Kathmandu, Nepal',
    status: 'customs',
    serviceType: 'sea-freight',
    packageDetails: 'Machinery parts - 1 container',
    weight: '15000 kg',
    dimensions: '20ft container',
    createdDate: '2023-12-15',
    lastUpdated: '2024-01-13',
    estimatedDelivery: '2024-01-20',
    events: [
      { date: '2024-01-13 14:00', status: 'Customs Clearance', location: 'Kathmandu Customs', description: 'Under customs inspection' },
      { date: '2024-01-08 08:30', status: 'In Transit', location: 'Kolkata Port', description: 'Arrived at transit port' },
      { date: '2023-12-20 10:00', status: 'In Transit', location: 'LA Port', description: 'Container loaded' }
    ]
  },
  {
    id: '3',
    trackingId: 'PPS2024003',
    customerName: 'Pemba Sherpa',
    customerEmail: 'pemba@example.com',
    customerPhone: '+977 9851234567',
    origin: 'Kathmandu, Nepal',
    destination: 'Sydney, Australia',
    status: 'delivered',
    serviceType: 'air-freight',
    packageDetails: 'Handicrafts - 3 boxes',
    weight: '45 kg',
    dimensions: '60x40x40 cm',
    createdDate: '2024-01-05',
    lastUpdated: '2024-01-12',
    estimatedDelivery: '2024-01-12',
    events: [
      { date: '2024-01-12 11:00', status: 'Delivered', location: 'Sydney', description: 'Package delivered successfully' },
      { date: '2024-01-11 09:30', status: 'Out for Delivery', location: 'Sydney Hub', description: 'Out for final delivery' },
      { date: '2024-01-08 16:00', status: 'In Transit', location: 'Sydney Airport', description: 'Cleared customs' }
    ]
  },
  {
    id: '4',
    trackingId: 'PPS2024004',
    customerName: 'Mohammed Al-Rashid',
    customerEmail: 'm.rashid@example.com',
    customerPhone: '+971 50 123 4567',
    origin: 'Dubai, UAE',
    destination: 'Kathmandu, Nepal',
    status: 'out-for-delivery',
    serviceType: 'door-to-door',
    packageDetails: 'Documents and samples',
    weight: '2 kg',
    dimensions: '30x25x10 cm',
    createdDate: '2024-01-13',
    lastUpdated: '2024-01-15',
    estimatedDelivery: '2024-01-15',
    events: [
      { date: '2024-01-15 08:00', status: 'Out for Delivery', location: 'Kathmandu', description: 'Assigned to delivery driver' },
      { date: '2024-01-14 20:00', status: 'Arrived', location: 'Kathmandu Office', description: 'Ready for delivery' },
      { date: '2024-01-14 02:00', status: 'In Transit', location: 'Tribhuvan Airport', description: 'Arrived at destination' }
    ]
  },
  {
    id: '5',
    trackingId: 'PPS2024005',
    customerName: 'Lisa Chen',
    customerEmail: 'lisa.chen@example.com',
    customerPhone: '+86 138 0000 1234',
    origin: 'Shanghai, China',
    destination: 'Kathmandu, Nepal',
    status: 'pending',
    serviceType: 'sea-freight',
    packageDetails: 'Textile materials - 2 pallets',
    weight: '800 kg',
    dimensions: '120x100x180 cm',
    createdDate: '2024-01-14',
    lastUpdated: '2024-01-14',
    estimatedDelivery: '2024-02-05',
    events: [
      { date: '2024-01-14 11:00', status: 'Processing', location: 'Shanghai', description: 'Booking confirmed, awaiting pickup' }
    ]
  }
];

export function UnifiedAdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [shipments, setShipments] = useState<Shipment[]>(mockShipments);

  const adminUser: AdminUser = {
    name: 'Admin User',
    email: 'admin@pslnepal.com',
    avatar: 'AU'
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    // Simulate API call
    setTimeout(() => {
      if (email === 'admin@pslnepal.com' && password === 'admin123') {
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('Invalid email or password');
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setIsMobileMenuOpen(false);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#003893] to-[#002a6b] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#003893] to-[#002a6b] rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-[#1A1A1B] mb-2">
                Admin Panel
              </h1>
              <p className="text-[#1A1A1B]/60">
                Pan Pacific Shipping & Logistics
              </p>
            </div>

            {loginError && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-red-800">{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  placeholder="admin@pslnepal.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#003893] border-[#1A1A1B]/20 rounded focus:ring-[#003893]"
                  />
                  <span className="text-sm text-[#1A1A1B]/60">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#003893] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-[#003893] hover:bg-[#002a6b] text-white font-semibold rounded-lg transition-colors disabled:bg-[#003893]/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#1A1A1B]/10">
              <p className="text-xs text-center text-[#1A1A1B]/40">
                Demo credentials: admin@pslnepal.com / admin123
              </p>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  // Admin Panel with Router
  return (
    <>
      <div className="min-h-screen bg-[#F5F7F8]">
        <AdminNav
          adminUser={adminUser}
          onLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <div className="lg:ml-64 pt-6">
          <div className="max-w-[1800px] mx-auto px-6 py-8">
            <Routes>
              <Route 
                path="/" 
                element={<AdminDashboard shipments={shipments} />} 
              />
              <Route 
                path="/orders" 
                element={
                  <OrderManagement 
                    shipments={shipments} 
                    onUpdateShipments={setShipments} 
                  />
                } 
              />
              <Route 
                path="/data-tools" 
                element={
                  <DataTools 
                    shipments={shipments} 
                    onUpdateShipments={setShipments} 
                  />
                } 
              />
              <Route 
                path="/users" 
                element={<AdminManagement />} 
              />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
