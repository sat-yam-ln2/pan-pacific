import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Calendar,
  MapPin,
  Plane,
  Ship,
  Truck,
  Home,
  FileText,
  Save,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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

interface OrderManagementProps {
  shipments: Shipment[];
  onUpdateShipments: (shipments: Shipment[]) => void;
}

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

export function OrderManagement({ shipments, onUpdateShipments }: OrderManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Filter and search
  const filteredShipments = useMemo(() => {
    let filtered = [...shipments];

    if (searchQuery) {
      filtered = filtered.filter(shipment =>
        shipment.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.destination.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(shipment => shipment.status === statusFilter);
    }

    if (serviceFilter !== 'all') {
      filtered = filtered.filter(shipment => shipment.serviceType === serviceFilter);
    }

    return filtered;
  }, [shipments, searchQuery, statusFilter, serviceFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShipments = filteredShipments.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handleCreateShipment = () => {
    setSelectedShipment(null);
    setIsEditMode(false);
    setShowCreateModal(true);
  };

  const handleEditShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsEditMode(true);
    setShowCreateModal(true);
  };

  const handleViewShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setShowDetailModal(true);
  };

  const handleDeleteShipment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      onUpdateShipments(shipments.filter(s => s.id !== id));
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#1A1A1B]">Order Management</h2>
          <p className="text-[#1A1A1B]/60 mt-1">
            Manage and track all shipments
          </p>
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

      {/* Controls Bar */}
      <div className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm">
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
                        <ServiceIcon size={16} className="text-[#003893]" />
                        <span className="text-sm text-[#1A1A1B]">
                          {shipment.serviceType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1A1B]/70">
                      {new Date(shipment.createdDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewShipment(shipment)}
                          className="p-2 text-[#003893] hover:bg-[#003893]/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEditShipment(shipment)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteShipment(shipment.id)}
                          className="p-2 text-[#DC143C] hover:bg-red-50 rounded-lg transition-colors"
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
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t-2 border-[#1A1A1B]/10 flex items-center justify-between">
            <p className="text-sm text-[#1A1A1B]/60">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredShipments.length)} of {filteredShipments.length} shipments
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border-2 border-[#1A1A1B]/20 rounded-lg hover:bg-[#F5F7F8] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-4 py-2 text-sm font-semibold text-[#1A1A1B]">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border-2 border-[#1A1A1B]/20 rounded-lg hover:bg-[#F5F7F8] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredShipments.length === 0 && (
        <div className="bg-white rounded-xl border-2 border-[#1A1A1B]/10 p-12 text-center">
          <FileText className="mx-auto text-[#1A1A1B]/20 mb-4" size={64} />
          <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">No shipments found</h3>
          <p className="text-[#1A1A1B]/60">Try adjusting your filters or create a new shipment</p>
        </div>
      )}
    </div>
  );
}
