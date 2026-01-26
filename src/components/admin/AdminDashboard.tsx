import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Globe,
  Users,
  Plane,
  Ship,
  MapPin,
  Calendar
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Shipment {
  id: string;
  trackingId: string;
  status: string;
  serviceType: string;
  createdDate: string;
  lastUpdated: string;
  destination: string;
}

interface AdminDashboardProps {
  shipments: Shipment[];
}

export function AdminDashboard({ shipments }: AdminDashboardProps) {
  // Statistics
  const stats = useMemo(() => {
    const total = shipments.length;
    const active = shipments.filter(s => ['in-transit', 'customs', 'out-for-delivery'].includes(s.status)).length;
    const delivered = shipments.filter(s => s.status === 'delivered' && 
      new Date(s.lastUpdated).getMonth() === new Date().getMonth()).length;
    const pending = shipments.filter(s => s.status === 'pending').length;
    
    // Calculate revenue (mock calculation)
    const revenue = shipments.filter(s => 
      new Date(s.lastUpdated).getMonth() === new Date().getMonth()
    ).length * 1250; // Average $1250 per shipment

    return { total, active, delivered, pending, revenue };
  }, [shipments]);

  // Monthly shipments chart data
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      name: month,
      shipments: Math.floor(Math.random() * 50) + 20,
      delivered: Math.floor(Math.random() * 40) + 15,
    }));
  }, []);

  // Service type distribution
  const serviceData = useMemo(() => {
    const types = {
      'air-freight': { name: 'Air Freight', count: 0, color: '#003893' },
      'sea-freight': { name: 'Sea Freight', count: 0, color: '#DC143C' },
      'land-transport': { name: 'Land Transport', count: 0, color: '#FFD700' },
      'door-to-door': { name: 'Door to Door', count: 0, color: '#1A1A1B' },
    };

    shipments.forEach(s => {
      if (types[s.serviceType as keyof typeof types]) {
        types[s.serviceType as keyof typeof types].count++;
      }
    });

    return Object.values(types).filter(t => t.count > 0);
  }, [shipments]);

  // Top destinations
  const topDestinations = useMemo(() => {
    const destinations: Record<string, number> = {};
    shipments.forEach(s => {
      const dest = s.destination.split(',')[0]; // Get city name
      destinations[dest] = (destinations[dest] || 0) + 1;
    });

    return Object.entries(destinations)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  }, [shipments]);

  // Recent activity
  const recentActivity = useMemo(() => {
    return shipments
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, 5);
  }, [shipments]);

  const statusIcons: Record<string, any> = {
    'pending': Clock,
    'in-transit': Truck,
    'customs': Package,
    'out-for-delivery': MapPin,
    'delivered': CheckCircle,
  };

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp size={12} />
            +12% from last month
          </p>
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
          <p className="text-xs text-blue-600 mt-1">Currently in transit</p>
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
          <p className="text-xs text-green-600 mt-1">98.5% on-time rate</p>
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
          <p className="text-xs text-yellow-600 mt-1">Awaiting pickup</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#003893] to-[#002a6b] p-6 rounded-xl shadow-lg text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="text-[#FFD700]" size={24} />
            </div>
            <span className="text-3xl font-bold">${(stats.revenue / 1000).toFixed(1)}K</span>
          </div>
          <h3 className="text-sm font-semibold text-white/80">Monthly Revenue</h3>
          <p className="text-xs text-[#FFD700] mt-1 flex items-center gap-1">
            <TrendingUp size={12} />
            +18% from last month
          </p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Shipments Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
        >
          <h3 className="text-lg font-bold text-[#1A1A1B] mb-4 flex items-center gap-2">
            <Calendar className="text-[#003893]" size={20} />
            Shipment Trends (6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorShipments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003893" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#003893" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC143C" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#DC143C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1B20" />
              <XAxis dataKey="name" stroke="#1A1A1B" />
              <YAxis stroke="#1A1A1B" />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="shipments" 
                stroke="#003893" 
                fillOpacity={1} 
                fill="url(#colorShipments)" 
                name="Total Shipments"
              />
              <Area 
                type="monotone" 
                dataKey="delivered" 
                stroke="#DC143C" 
                fillOpacity={1} 
                fill="url(#colorDelivered)" 
                name="Delivered"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Service Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
        >
          <h3 className="text-lg font-bold text-[#1A1A1B] mb-4 flex items-center gap-2">
            <Plane className="text-[#003893]" size={20} />
            Service Type Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
        >
          <h3 className="text-lg font-bold text-[#1A1A1B] mb-4 flex items-center gap-2">
            <Globe className="text-[#003893]" size={20} />
            Top Destinations
          </h3>
          <div className="space-y-4">
            {topDestinations.map((dest, index) => (
              <div key={dest.name} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#003893] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#1A1A1B]">{dest.name}</span>
                    <span className="text-sm text-[#1A1A1B]/60">{dest.value} shipments</span>
                  </div>
                  <div className="w-full bg-[#F5F7F8] rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#003893] to-[#002a6b] h-2 rounded-full"
                      style={{ width: `${(dest.value / topDestinations[0].value) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
        >
          <h3 className="text-lg font-bold text-[#1A1A1B] mb-4 flex items-center gap-2">
            <Clock className="text-[#003893]" size={20} />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((shipment) => {
              const StatusIcon = statusIcons[shipment.status] || Package;
              return (
                <div key={shipment.id} className="flex items-start gap-3 pb-4 border-b border-[#1A1A1B]/10 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-[#F5F7F8] rounded-lg flex items-center justify-center flex-shrink-0">
                    <StatusIcon className="text-[#003893]" size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1A1A1B] text-sm truncate">
                      {shipment.trackingId}
                    </p>
                    <p className="text-xs text-[#1A1A1B]/60 mt-1">
                      {shipment.destination}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-[#1A1A1B]/40">
                      {new Date(shipment.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
