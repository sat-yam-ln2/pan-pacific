import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Package, Loader2, AlertCircle } from 'lucide-react';
import { AdminNav } from './AdminNav';
import { AdminDashboard } from './AdminDashboard';
import { OrderManagement } from './OrderManagement';
import { DataTools } from './DataTools';
import { BlogManagement } from './BlogManagement';
import { AdminManagement } from './AdminManagement';
import * as authService from '../../services/auth';
import * as shipmentsService from '../../services/shipments';
import * as adminService from '../../services/admin';

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
  customerAddress: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'customs' | 'out-for-delivery' | 'delivered' | 'cancelled' | 'processing' | 'picked-up';
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

export function UnifiedAdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoadingShipments, setIsLoadingShipments] = useState(false);

  const [adminUser, setAdminUser] = useState<AdminUser>({
    name: 'Admin User',
    email: 'admin@panpacific.com',
    avatar: 'AU'
  });

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const result = await authService.verifyToken();
      if (result.success && result.admin) {
        setIsAuthenticated(true);
        setAdminUser({
          name: result.admin.name,
          email: result.admin.email,
          avatar: result.admin.name.split(' ').map(n => n[0]).join('').toUpperCase()
        });
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);



  const fetchShipments = async () => {
    setIsLoadingShipments(true);
    try {
      const result = await shipmentsService.getAllShipments(1, 100);
      if (result.success && result.data) {
        // result.data is the array of shipments from the backend
        const shipmentsArray = Array.isArray(result.data) ? result.data : (result.data as any).shipments || [];
        const mappedShipments = shipmentsArray.map(
          shipmentsService.mapShipmentToFrontend
        ) as Shipment[];
        setShipments(mappedShipments);
      }
    } catch (error) {
      console.error('Failed to fetch shipments:', error);
    } finally {
      setIsLoadingShipments(false);
    }
  };

  const [admins, setAdmins] = useState<adminService.AdminUser[]>([]);

  const fetchAdmins = async () => {
    try {
      const result = await adminService.getAllAdmins();
      if (result.success && result.data) {
        setAdmins(result.data.map(adminService.mapAdminToFrontend));
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  };

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchShipments();
      fetchAdmins();
    }
  }, [isAuthenticated]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const result = await authService.login(email, password);

      if (result.success && result.data) {
        setIsAuthenticated(true);
        setAdminUser({
          name: result.data.admin.name,
          email: result.data.admin.email,
          avatar: result.data.admin.name.split(' ').map(n => n[0]).join('').toUpperCase()
        });
        setLoginError('');
      } else {
        setLoginError(result.message || 'Invalid email or password');
      }
    } catch (error) {
      setLoginError('Network error. Please check if the server is running.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setShipments([]);
    setIsMobileMenuOpen(false);
  };

  // Handle shipment updates from child components
  const handleUpdateShipments = (newShipments: Shipment[]) => {
    setShipments(newShipments);
  };

  const handleUpdateAdmins = (newAdmins: adminService.AdminUser[]) => {
    setAdmins(newAdmins);
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003893] to-[#002a6b] flex items-center justify-center">
        <div className="text-white flex items-center gap-3">
          <Loader2 className="animate-spin" size={32} />
          <span className="text-xl">Loading...</span>
        </div>
      </div>
    );
  }

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
                  placeholder="admin@panpacific.com"
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
                Default: admin@panpacific.com / capitalcargo123$
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
            {isLoadingShipments ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#003893]" size={48} />
              </div>
            ) : (
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
                      onUpdateShipments={handleUpdateShipments}
                      onRefresh={fetchShipments}
                    />
                  }
                />
                <Route
                  path="/data-tools"
                  element={
                    <DataTools
                      shipments={shipments}
                      onUpdateShipments={handleUpdateShipments}
                    />
                  }
                />
                <Route
                  path="/blogs"
                  element={<BlogManagement />}
                />
                <Route
                  path="/users"
                  element={
                    <AdminManagement
                      admins={admins}
                      onUpdateAdmins={handleUpdateAdmins}
                      onRefresh={fetchAdmins}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            )}
          </div>
        </div>
      </div>

    </>
  );
}
