import React, { useState, useMemo } from 'react';
import * as shipmentsService from '../../services/shipments';
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
  ChevronRight,
  Users,
  Package
} from 'lucide-react';

interface Shipment {
  id: string;
  trackingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
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
  onRefresh?: () => void;
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

export function OrderManagement({ shipments, onUpdateShipments, onRefresh }: OrderManagementProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    origin: '',
    destination: '',
    serviceType: 'standard',
    packageDetails: '',
    weight: '',
    dimensions: '',
    status: 'processing',
    estimatedDelivery: '',
    currentLocation: '',
    statusDescription: ''
  });

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
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
      origin: '',
      destination: '',
      serviceType: 'standard',
      packageDetails: '',
      weight: '',
      dimensions: '',
      status: 'processing',
      estimatedDelivery: '',
      currentLocation: '',
      statusDescription: ''
    });
    setShowCreateModal(true);
  };

  const handleEditShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsEditMode(true);
    setFormData({
      customerName: shipment.customerName,
      customerEmail: shipment.customerEmail,
      customerPhone: shipment.customerPhone,
      customerAddress: shipment.customerAddress || '',
      origin: shipment.origin,
      destination: shipment.destination,
      serviceType: shipment.serviceType,
      packageDetails: shipment.packageDetails,
      weight: shipment.weight.replace(' kg', ''),
      dimensions: shipment.dimensions.replace(' cm', ''),
      status: shipment.status,
      estimatedDelivery: shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toISOString().split('T')[0] : '',
      currentLocation: shipment.events && shipment.events.length > 0 ? shipment.events[shipment.events.length - 1].location : '',
      statusDescription: ''
    });
    setShowCreateModal(true);
  };

  const handleSaveShipment = async () => {
    setIsSubmitting(true);
    try {
      const shipmentData = {
        ...formData,
        // If editing, preserve ID/TrackingID if needed by backend mapper, 
        // but typically mapper uses args. We'll rely on service mapper.
        trackingId: selectedShipment?.trackingId
      };

      // Map frontend data to backend format
      const backendData = shipmentsService.mapShipmentToBackend(shipmentData);

      let result;
      if (isEditMode && selectedShipment) {
        result = await shipmentsService.updateShipment(selectedShipment.trackingId, backendData);
      } else {
        result = await shipmentsService.createShipment(backendData);
      }

      if (result.success && result.data) {
        // Refresh list
        if (onRefresh) onRefresh();
        setShowCreateModal(false);
      } else {
        alert('Failed to save shipment: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving shipment:', error);
      alert('Failed to save shipment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setShowDetailModal(true);
  };

  const handleDeleteShipment = async (id: string, trackingId: string) => {
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      setIsDeleting(id);
      try {
        const result = await shipmentsService.deleteShipment(trackingId);
        if (result.success) {
          onUpdateShipments(shipments.filter(s => s.id !== id && s.trackingId !== trackingId));
          if (onRefresh) onRefresh();
        } else {
          alert('Failed to delete shipment: ' + (result.message || 'Unknown error'));
        }
      } catch (error) {
        alert('Failed to delete shipment');
      } finally {
        setIsDeleting(null);
      }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setServiceFilter(e.target.value)}
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
                          onClick={() => handleDeleteShipment(shipment.id, shipment.trackingId)}
                          disabled={isDeleting === shipment.id}
                          className="p-2 text-[#DC143C] hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {isDeleting === shipment.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
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
      {/* Create/Edit Modal */}
      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b-2 border-[#1A1A1B]/10 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-xl font-bold text-[#1A1A1B]">
                  {isEditMode ? 'Edit Shipment' : 'Create New Shipment'}
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-[#F5F7F8] rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Information */}
                <div>
                  <h4 className="text-lg font-bold text-[#003893] mb-4 flex items-center gap-2">
                    <Users size={20} /> Customer Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Name</label>
                      <input
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.customerName}
                        onChange={(e: any) => setFormData({ ...formData, customerName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Email</label>
                      <input
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.customerEmail}
                        onChange={(e: any) => setFormData({ ...formData, customerEmail: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Phone</label>
                      <input
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.customerPhone}
                        onChange={(e: any) => setFormData({ ...formData, customerPhone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Address</label>
                      <input
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.customerAddress}
                        onChange={(e: any) => setFormData({ ...formData, customerAddress: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipment Details */}
                <div>
                  <h4 className="text-lg font-bold text-[#003893] mb-4 flex items-center gap-2">
                    <Package size={20} /> Shipment Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Origin</label>
                      <input
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.origin}
                        onChange={(e: any) => setFormData({ ...formData, origin: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Destination</label>
                      <input
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.destination}
                        onChange={(e: any) => setFormData({ ...formData, destination: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Service Type</label>
                      <select
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.serviceType}
                        onChange={(e: any) => setFormData({ ...formData, serviceType: e.target.value })}
                      >
                        <option value="standard">Standard</option>
                        <option value="express">Express</option>
                        <option value="overnight">Overnight</option>
                        <option value="international">International</option>
                        <option value="freight">Freight</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Status</label>
                      <select
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.status}
                        onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="processing">Processing</option>
                        <option value="picked-up">Picked Up</option>
                        <option value="in-transit">In Transit</option>
                        <option value="out-for-delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Weight (kg)</label>
                      <input
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.weight}
                        onChange={(e: any) => setFormData({ ...formData, weight: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Estimated Delivery</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.estimatedDelivery}
                        onChange={(e: any) => setFormData({ ...formData, estimatedDelivery: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Description</label>
                      <input
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        value={formData.packageDetails}
                        onChange={(e: any) => setFormData({ ...formData, packageDetails: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline Update */}
                {isEditMode && (
                  <div>
                    <h4 className="text-lg font-bold text-[#003893] mb-4 flex items-center gap-2">
                      <MapPin size={20} /> Update Tracking Status
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Current Location</label>
                        <input
                          className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                          value={formData.currentLocation}
                          onChange={(e: any) => setFormData({ ...formData, currentLocation: e.target.value })}
                          placeholder="e.g. Distribution Center, London"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">Update Note</label>
                        <input
                          className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                          value={formData.statusDescription}
                          onChange={(e: any) => setFormData({ ...formData, statusDescription: e.target.value })}
                          placeholder="e.g. Cleared customs and in transit"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t-2 border-[#1A1A1B]/10 flex gap-3 sticky bottom-0 bg-white">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-[#1A1A1B]/20 text-[#1A1A1B] hover:bg-[#F5F7F8] rounded-lg transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveShipment}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-[#003893] hover:bg-[#002a6b] text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                  Save Shipment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedShipment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b-2 border-[#1A1A1B]/10 flex items-center justify-between bg-white">
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1B]">Shipment Details</h3>
                  <p className="text-sm font-mono text-[#003893]">{selectedShipment.trackingId}</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-[#F5F7F8] rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column: Info Card */}
                  <div className="md:col-span-1 space-y-6">
                    <div className="bg-[#F5F7F8] p-4 rounded-xl space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${statusColors[selectedShipment.status]}`}>
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-[#1A1A1B]/60 font-semibold uppercase">Status</p>
                          <p className="font-bold text-[#1A1A1B] uppercase">{selectedShipment.status.replace('-', ' ')}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-[#1A1A1B]/10">
                        <p className="text-xs text-[#1A1A1B]/60 font-semibold uppercase">Customer</p>
                        <p className="font-bold text-[#1A1A1B]">{selectedShipment.customerName}</p>
                        <p className="text-sm text-[#1A1A1B]/60">{selectedShipment.customerEmail}</p>
                      </div>
                      <div className="pt-4 border-t border-[#1A1A1B]/10">
                        <p className="text-xs text-[#1A1A1B]/60 font-semibold uppercase">Service</p>
                        <p className="font-bold text-[#1A1A1B]">{selectedShipment.serviceType.replace('-', ' ').toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-[#1A1A1B]/10 p-4 rounded-xl">
                      <h4 className="font-bold text-[#1A1A1B] mb-3 flex items-center gap-2">
                        <Calendar size={18} /> Schedule
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-[#1A1A1B]/60 uppercase">Created Date</p>
                          <p className="text-sm font-semibold">{selectedShipment.createdDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#1A1A1B]/60 uppercase">Est. Delivery</p>
                          <p className="text-sm font-semibold">{selectedShipment.estimatedDelivery || '--'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Timeline */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-white border-2 border-[#1A1A1B]/10 p-6 rounded-xl">
                      <h4 className="font-bold text-[#1A1A1B] mb-6 flex items-center gap-2">
                        <MapPin size={18} /> Shipment Timeline
                      </h4>
                      <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-[#1A1A1B]/10">
                        {selectedShipment.events && selectedShipment.events.length > 0 ? (
                          [...selectedShipment.events].reverse().map((event: any, i: number) => (
                            <div key={i} className="relative pl-10">
                              <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#003893] ring-4 ring-white" />
                              <div className="bg-[#F5F7F8] p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-bold text-[#003893] uppercase">{event.status.replace('-', ' ')}</span>
                                  <span className="text-xs text-[#1A1A1B]/40">{event.date}</span>
                                </div>
                                <p className="text-sm font-semibold text-[#1A1A1B]">{event.location}</p>
                                <p className="text-sm text-[#1A1A1B]/70 mt-1">{event.description}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-[#1A1A1B]/40">
                            No timeline events recorded yet.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t-2 border-[#1A1A1B]/10 bg-[#F5F7F8]">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-full px-4 py-2 bg-[#1A1A1B] text-white rounded-lg font-bold hover:bg-[#1A1A1B]/80 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
