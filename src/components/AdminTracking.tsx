import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  DollarSign,
  Timer,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Calendar,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Plane,
  Ship,
  Home,
  FileText,
  Save,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Footer } from './Footer';

// Types
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
  events: TrackingEvent[];
}

interface TrackingEvent {
  date: string;
  status: string;
  location: string;
  description: string;
}

interface AdminUser {
  name: string;
  email: string;
  avatar: string;
}

// Mock data
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

const statusColors = {
  'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'in-transit': 'bg-blue-100 text-blue-800 border-blue-300',
  'customs': 'bg-purple-100 text-purple-800 border-purple-300',
  'out-for-delivery': 'bg-orange-100 text-orange-800 border-orange-300',
  'delivered': 'bg-green-100 text-green-800 border-green-300',
  'cancelled': 'bg-red-100 text-red-800 border-red-300'
};

const serviceIcons = {
  'air-freight': Plane,
  'sea-freight': Ship,
  'land-transport': Truck,
  'door-to-door': Home
};

export function AdminTracking() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [shipments, setShipments] = useState<Shipment[]>(mockShipments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof Shipment>('lastUpdated');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

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
  };

  // Filter and sort shipments
  const filteredShipments = useMemo(() => {
    let filtered = [...shipments];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(shipment =>
        shipment.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.destination.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(shipment => shipment.status === statusFilter);
    }

    // Service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(shipment => shipment.serviceType === serviceFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

    return filtered;
  }, [shipments, searchQuery, statusFilter, serviceFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShipments = filteredShipments.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const stats = useMemo(() => {
    const total = shipments.length;
    const active = shipments.filter(s => ['in-transit', 'customs', 'out-for-delivery'].includes(s.status)).length;
    const delivered = shipments.filter(s => s.status === 'delivered' && 
      new Date(s.lastUpdated).getMonth() === new Date().getMonth()).length;
    const pending = shipments.filter(s => s.status === 'pending').length;

    return { total, active, delivered, pending };
  }, [shipments]);

  // Create new shipment
  const handleCreateShipment = () => {
    setSelectedShipment(null);
    setIsEditMode(false);
    setShowCreateModal(true);
  };

  // Edit shipment
  const handleEditShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsEditMode(true);
    setShowCreateModal(true);
  };

  // View shipment details
  const handleViewShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setShowDetailModal(true);
  };

  // Delete shipment
  const handleDeleteShipment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      setShipments(shipments.filter(s => s.id !== id));
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const csv = [
      ['Tracking ID', 'Customer', 'Origin', 'Destination', 'Status', 'Service Type', 'Created', 'Last Updated'],
      ...filteredShipments.map(s => [
        s.trackingId,
        s.customerName,
        s.origin,
        s.destination,
        s.status,
        s.serviceType,
        s.createdDate,
        s.lastUpdated
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shipments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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

  // Admin Dashboard
  return (
    <>
      <div className="min-h-screen bg-[#F5F7F8]">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#003893] to-[#002a6b] text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
          <div className="max-w-[1800px] mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-white/70">Shipment Management System</p>
            </div>
            
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
              
              <div className="flex items-center gap-3 pl-6 border-l border-white/20">
                <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center font-bold text-[#003893]">
                  {adminUser.avatar}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold">{adminUser.name}</p>
                  <p className="text-xs text-white/70">{adminUser.email}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-[1800px] mx-auto px-6 py-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#003893]/10 rounded-lg flex items-center justify-center">
                  <Package className="text-[#003893]" size={24} />
                </div>
                <span className="text-3xl font-bold text-[#1A1A1B]">{stats.total}</span>
              </div>
              <h3 className="text-sm font-semibold text-[#1A1A1B]/60">Total Shipments</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="text-blue-600" size={24} />
                </div>
                <span className="text-3xl font-bold text-[#1A1A1B]">{stats.active}</span>
              </div>
              <h3 className="text-sm font-semibold text-[#1A1A1B]/60">Active Shipments</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <span className="text-3xl font-bold text-[#1A1A1B]">{stats.delivered}</span>
              </div>
              <h3 className="text-sm font-semibold text-[#1A1A1B]/60">Delivered This Month</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="text-yellow-600" size={24} />
                </div>
                <span className="text-3xl font-bold text-[#1A1A1B]">{stats.pending}</span>
              </div>
              <h3 className="text-sm font-semibold text-[#1A1A1B]/60">Pending Deliveries</h3>
            </motion.div>
          </div>

          {/* Controls Bar */}
          <div className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1B]/40" size={20} />
                  <input
                    type="text"
                    placeholder="Search by tracking ID, customer, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="customs">Customs</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {/* Service Filter */}
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                >
                  <option value="all">All Services</option>
                  <option value="air-freight">Air Freight</option>
                  <option value="sea-freight">Sea Freight</option>
                  <option value="land-transport">Land Transport</option>
                  <option value="door-to-door">Door to Door</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 border-2 border-[#003893] text-[#003893] hover:bg-[#003893] hover:text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Download size={18} />
                  Export CSV
                </button>
                <button
                  onClick={handleCreateShipment}
                  className="px-4 py-2 bg-[#003893] hover:bg-[#002a6b] text-white rounded-lg transition-colors flex items-center gap-2 font-semibold"
                >
                  <Plus size={18} />
                  Add New Shipment
                </button>
              </div>
            </div>
          </div>

          {/* Shipments Table */}
          <div className="bg-white rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F7F8] border-b-2 border-[#1A1A1B]/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1A1A1B] uppercase tracking-wider">
                      Tracking ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1A1A1B] uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1A1A1B] uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1A1A1B] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1A1A1B] uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1A1A1B] uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#1A1A1B] uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-[#1A1A1B] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1B]/10">
                  {paginatedShipments.map((shipment, index) => {
                    const ServiceIcon = serviceIcons[shipment.serviceType];
                    return (
                      <motion.tr
                        key={shipment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-[#F5F7F8] transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono font-semibold text-[#003893]">
                            {shipment.trackingId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-[#1A1A1B]">{shipment.customerName}</p>
                            <p className="text-sm text-[#1A1A1B]/60">{shipment.customerEmail}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-[#1A1A1B]/70">{shipment.origin}</span>
                            <span className="text-[#FFD700]">→</span>
                            <span className="text-[#1A1A1B]/70">{shipment.destination}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${statusColors[shipment.status]}`}>
                            {shipment.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <ServiceIcon size={18} className="text-[#003893]" />
                            <span className="text-sm text-[#1A1A1B]/70">
                              {shipment.serviceType.replace('-', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1A1B]/70">
                          {new Date(shipment.createdDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1A1B]/70">
                          {new Date(shipment.lastUpdated).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewShipment(shipment)}
                              className="p-2 hover:bg-[#003893]/10 rounded-lg transition-colors text-[#003893]"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleEditShipment(shipment)}
                              className="p-2 hover:bg-[#FFD700]/20 rounded-lg transition-colors text-[#FFD700]"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteShipment(shipment.id)}
                              className="p-2 hover:bg-[#DC143C]/10 rounded-lg transition-colors text-[#DC143C]"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t-2 border-[#1A1A1B]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#1A1A1B]/60">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredShipments.length)} of {filteredShipments.length} results
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893] text-sm"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border-2 border-[#1A1A1B]/20 rounded-lg hover:bg-[#F5F7F8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[#003893] text-white'
                          : 'border-2 border-[#1A1A1B]/20 hover:bg-[#F5F7F8]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border-2 border-[#1A1A1B]/20 rounded-lg hover:bg-[#F5F7F8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Create/Edit Modal */}
        <CreateEditModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          shipment={selectedShipment}
          isEditMode={isEditMode}
          onSave={(shipment) => {
            if (isEditMode && selectedShipment) {
              setShipments(shipments.map(s => s.id === selectedShipment.id ? shipment : s));
            } else {
              setShipments([...shipments, { ...shipment, id: String(shipments.length + 1) }]);
            }
            setShowCreateModal(false);
          }}
        />

        {/* Detail Modal */}
        <DetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          shipment={selectedShipment}
          onEdit={(shipment) => {
            setShowDetailModal(false);
            handleEditShipment(shipment);
          }}
          onDelete={(id) => {
            setShowDetailModal(false);
            handleDeleteShipment(id);
          }}
        />
      </div>

      <Footer />
    </>
  );
}

// Create/Edit Modal Component
function CreateEditModal({ 
  isOpen, 
  onClose, 
  shipment, 
  isEditMode, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  shipment: Shipment | null; 
  isEditMode: boolean; 
  onSave: (shipment: Shipment) => void;
}) {
  const [formData, setFormData] = useState<Partial<Shipment>>(
    shipment || {
      trackingId: `PPS${new Date().getFullYear()}${String(Date.now()).slice(-4)}`,
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      origin: '',
      destination: '',
      status: 'pending',
      serviceType: 'air-freight',
      packageDetails: '',
      weight: '',
      dimensions: '',
      specialInstructions: '',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      estimatedDelivery: '',
      events: []
    }
  );

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onSave(formData as Shipment);
      setIsSaving(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl max-w-4xl w-full my-8"
        >
          <div className="p-6 border-b-2 border-[#1A1A1B]/10 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#1A1A1B]">
              {isEditMode ? 'Edit Shipment' : 'Create New Shipment'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#F5F7F8] rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Tracking ID */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Tracking ID
                </label>
                <input
                  type="text"
                  value={formData.trackingId}
                  onChange={(e) => setFormData({ ...formData, trackingId: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Service Type
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  required
                >
                  <option value="air-freight">Air Freight</option>
                  <option value="sea-freight">Sea Freight</option>
                  <option value="land-transport">Land Transport</option>
                  <option value="door-to-door">Door to Door</option>
                </select>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  required
                />
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Customer Email
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  required
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Customer Phone
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="customs">Customs</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Origin */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Origin
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  placeholder="City, Country"
                  required
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  placeholder="City, Country"
                  required
                />
              </div>

              {/* Package Details */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Package Details
                </label>
                <input
                  type="text"
                  value={formData.packageDetails}
                  onChange={(e) => setFormData({ ...formData, packageDetails: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  placeholder="Description of items"
                  required
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Weight
                </label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  placeholder="e.g., 125 kg"
                  required
                />
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Dimensions
                </label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  placeholder="e.g., 100x80x60 cm"
                  required
                />
              </div>

              {/* Estimated Delivery */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Estimated Delivery
                </label>
                <input
                  type="date"
                  value={formData.estimatedDelivery}
                  onChange={(e) => setFormData({ ...formData, estimatedDelivery: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  required
                />
              </div>

              {/* Special Instructions */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                  Special Instructions
                </label>
                <textarea
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893] resize-none"
                  placeholder="Any special handling instructions..."
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-8 pt-6 border-t-2 border-[#1A1A1B]/10">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-[#1A1A1B]/20 hover:bg-[#F5F7F8] rounded-lg transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-[#003893] hover:bg-[#002a6b] text-white rounded-lg transition-colors font-semibold disabled:bg-[#003893]/50 flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    {isEditMode ? 'Update Shipment' : 'Create Shipment'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Detail Modal Component
function DetailModal({
  isOpen,
  onClose,
  shipment,
  onEdit,
  onDelete
}: {
  isOpen: boolean;
  onClose: () => void;
  shipment: Shipment | null;
  onEdit: (shipment: Shipment) => void;
  onDelete: (id: string) => void;
}) {
  if (!isOpen || !shipment) return null;

  const ServiceIcon = serviceIcons[shipment.serviceType];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl max-w-4xl w-full my-8"
        >
          <div className="p-6 border-b-2 border-[#1A1A1B]/10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1B] mb-2">
                  Shipment Details
                </h2>
                <p className="font-mono text-lg text-[#003893] font-semibold">
                  {shipment.trackingId}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#F5F7F8] rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border-2 ${statusColors[shipment.status]}`}>
              {shipment.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {/* Customer Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-4 flex items-center gap-2">
                <User size={20} className="text-[#003893]" />
                Customer Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 bg-[#F5F7F8] p-4 rounded-lg">
                <div>
                  <p className="text-sm text-[#1A1A1B]/60 mb-1">Name</p>
                  <p className="font-semibold text-[#1A1A1B]">{shipment.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-[#1A1A1B]/60 mb-1">Email</p>
                  <p className="font-semibold text-[#1A1A1B]">{shipment.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-[#1A1A1B]/60 mb-1">Phone</p>
                  <p className="font-semibold text-[#1A1A1B]">{shipment.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-[#1A1A1B]/60 mb-1">Service Type</p>
                  <div className="flex items-center gap-2">
                    <ServiceIcon size={18} className="text-[#003893]" />
                    <p className="font-semibold text-[#1A1A1B]">
                      {shipment.serviceType.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-4 flex items-center gap-2">
                <Package size={20} className="text-[#003893]" />
                Shipment Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4 bg-[#F5F7F8] p-4 rounded-lg">
                <div>
                  <p className="text-sm text-[#1A1A1B]/60 mb-1">Origin</p>
                  <p className="font-semibold text-[#1A1A1B]">{shipment.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-[#1A1A1B]/60 mb-1">Destination</p>
                  <p className="font-semibold text-[#1A1A1B]">{shipment.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-[#1A1A1B]/60 mb-1">Package Details</p>
                  <p className="font-semibold text-[#1A1A1B]">{shipment.packageDetails}</p>
                </div>
                <div>
                  <p className="text-sm text-[#1A1A1B]/60 mb-1">Weight</p>
                  <p className="font-semibold text-[#1A1A1B]">{shipment.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-[#1A1A1B]/60 mb-1">Dimensions</p>
                  <p className="font-semibold text-[#1A1A1B]">{shipment.dimensions}</p>
                </div>
                <div>
                  <p className="text-sm text-[#1A1A1B]/60 mb-1">Estimated Delivery</p>
                  <p className="font-semibold text-[#1A1A1B]">
                    {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
                {shipment.specialInstructions && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-[#1A1A1B]/60 mb-1">Special Instructions</p>
                    <p className="font-semibold text-[#1A1A1B]">{shipment.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-4 flex items-center gap-2">
                <Clock size={20} className="text-[#003893]" />
                Tracking Timeline
              </h3>
              <div className="space-y-4">
                {shipment.events.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-[#003893] rounded-full" />
                      {index < shipment.events.length - 1 && (
                        <div className="w-0.5 h-full bg-[#003893]/30 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#1A1A1B]">{event.status}</span>
                        <span className="text-sm text-[#1A1A1B]/40">•</span>
                        <span className="text-sm text-[#1A1A1B]/60">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#1A1A1B]/60 mb-1">
                        <MapPin size={14} />
                        {event.location}
                      </div>
                      <p className="text-sm text-[#1A1A1B]/70">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t-2 border-[#1A1A1B]/10 flex gap-4 justify-end">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this shipment?')) {
                  onDelete(shipment.id);
                }
              }}
              className="px-6 py-3 border-2 border-[#DC143C] text-[#DC143C] hover:bg-[#DC143C] hover:text-white rounded-lg transition-colors font-semibold flex items-center gap-2"
            >
              <Trash2 size={20} />
              Delete
            </button>
            <button
              onClick={() => onEdit(shipment)}
              className="px-6 py-3 bg-[#003893] hover:bg-[#002a6b] text-white rounded-lg transition-colors font-semibold flex items-center gap-2"
            >
              <Edit size={20} />
              Edit Shipment
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
