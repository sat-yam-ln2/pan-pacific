import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Package,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  Home,
  FileText,
  Plane,
  CheckCircle,
  Circle,
  AlertCircle,
  Anchor,
  Truck,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Footer } from './Footer';
import * as trackingService from '../services/tracking';
import type { Shipment } from '../services/shipments';

// Mock tracking data
const mockTrackingData: { [key: string]: any } = {
  'PPSL2024001234': {
    trackingId: 'PPSL2024001234',
    status: 'In Transit',
    statusCode: 'in_transit',
    origin: 'Kathmandu, Nepal',
    destination: 'Dubai, UAE',
    estimatedDelivery: '2026-01-20',
    serviceType: 'Air Freight Express',
    weight: '125 kg',
    dimensions: '120 x 80 x 100 cm',
    customer: {
      name: 'Rajesh Shrestha',
      email: 'rajesh.shrestha@example.com',
      phone: '+977 98XXXXXXXX',
      address: 'Thamel, Kathmandu 44600, Nepal'
    },
    package: {
      description: 'Electronics & Components',
      serviceType: 'Air Freight - Express',
      declaredValue: 'USD 5,500'
    },
    flight: {
      airline: 'Qatar Airways',
      flightNumber: 'QR 652',
      departure: 'Tribhuvan International Airport (TIA)',
      arrival: 'Hamad International Airport (DOH)',
      departureTime: '2026-01-16 14:30',
      arrivalTime: '2026-01-16 18:45'
    },
    timeline: [
      {
        status: 'Order Processed',
        statusCode: 'processed',
        location: 'Kathmandu, Nepal',
        date: '2026-01-14',
        time: '10:30 AM',
        description: 'Shipment details received and documentation prepared',
        completed: true
      },
      {
        status: 'Picked Up',
        statusCode: 'picked_up',
        location: 'Thamel, Kathmandu',
        date: '2026-01-15',
        time: '09:15 AM',
        description: 'Package collected from shipper location',
        completed: true
      },
      {
        status: 'At Origin Warehouse',
        statusCode: 'warehouse',
        location: 'TIA Cargo Terminal',
        date: '2026-01-15',
        time: '02:30 PM',
        description: 'Arrived at origin warehouse for processing',
        completed: true
      },
      {
        status: 'In Transit',
        statusCode: 'in_transit',
        location: 'En Route to Dubai',
        date: '2026-01-16',
        time: '02:30 PM',
        description: 'Shipment departed on QR 652 to Doha with connection to Dubai',
        completed: false,
        current: true
      },
      {
        status: 'Customs Clearance',
        statusCode: 'customs',
        location: 'Dubai, UAE',
        date: '2026-01-18',
        time: 'Estimated',
        description: 'Customs documentation and clearance procedures',
        completed: false
      },
      {
        status: 'Out for Delivery',
        statusCode: 'out_for_delivery',
        location: 'Dubai, UAE',
        date: '2026-01-20',
        time: 'Estimated',
        description: 'Package out for final delivery',
        completed: false
      },
      {
        status: 'Delivered',
        statusCode: 'delivered',
        location: 'Dubai, UAE',
        date: '2026-01-20',
        time: 'Estimated',
        description: 'Successfully delivered to recipient',
        completed: false
      }
    ]
  },
  'PPSL2024005678': {
    trackingId: 'PPSL2024005678',
    status: 'Delivered',
    statusCode: 'delivered',
    origin: 'Shanghai, China',
    destination: 'Kathmandu, Nepal',
    estimatedDelivery: '2026-01-10',
    serviceType: 'Sea Freight FCL',
    weight: '18,500 kg',
    dimensions: '40ft Container',
    customer: {
      name: 'Nepal Trading Co.',
      email: 'info@nepaltrading.com',
      phone: '+977 14XXXXXX',
      address: 'New Baneshwor, Kathmandu, Nepal'
    },
    package: {
      description: 'Industrial Machinery Parts',
      serviceType: 'Sea Freight - FCL 40ft',
      declaredValue: 'USD 45,000'
    },
    timeline: [
      {
        status: 'Booking Confirmed',
        statusCode: 'processed',
        location: 'Shanghai, China',
        date: '2025-12-05',
        time: '11:00 AM',
        description: 'Booking confirmed with shipping line',
        completed: true
      },
      {
        status: 'Container Loaded',
        statusCode: 'picked_up',
        location: 'Shanghai Port',
        date: '2025-12-12',
        time: '03:45 PM',
        description: 'Container loaded onto vessel',
        completed: true
      },
      {
        status: 'Departed Port',
        statusCode: 'in_transit',
        location: 'Shanghai, China',
        date: '2025-12-15',
        time: '06:00 AM',
        description: 'Vessel departed from Shanghai Port',
        completed: true
      },
      {
        status: 'In Transit',
        statusCode: 'in_transit',
        location: 'Indian Ocean',
        date: '2025-12-28',
        time: '12:00 PM',
        description: 'Shipment en route via sea freight',
        completed: true
      },
      {
        status: 'Arrived at Port',
        statusCode: 'arrived',
        location: 'Kolkata Port, India',
        date: '2026-01-05',
        time: '08:30 AM',
        description: 'Container arrived at transshipment port',
        completed: true
      },
      {
        status: 'Customs Cleared',
        statusCode: 'customs',
        location: 'Birgunj, Nepal',
        date: '2026-01-08',
        time: '02:15 PM',
        description: 'Customs clearance completed',
        completed: true
      },
      {
        status: 'Delivered',
        statusCode: 'delivered',
        location: 'Kathmandu, Nepal',
        date: '2026-01-10',
        time: '11:20 AM',
        description: 'Container successfully delivered to consignee',
        completed: true,
        current: true
      }
    ]
  }
};

const statusConfig: { [key: string]: { color: string; bgColor: string; icon: any } } = {
  processed: { color: '#FFD700', bgColor: '#FFD700/10', icon: FileText },
  picked_up: { color: '#003893', bgColor: '#003893/10', icon: Package },
  warehouse: { color: '#003893', bgColor: '#003893/10', icon: Home },
  in_transit: { color: '#8B5CF6', bgColor: '#8B5CF6/10', icon: Plane },
  customs: { color: '#F59E0B', bgColor: '#F59E0B/10', icon: FileText },
  arrived: { color: '#10B981', bgColor: '#10B981/10', icon: Anchor },
  out_for_delivery: { color: '#F97316', bgColor: '#F97316/10', icon: Truck },
  delivered: { color: '#10B981', bgColor: '#10B981/10', icon: CheckCircle },
  failed: { color: '#DC143C', bgColor: '#DC143C/10', icon: AlertCircle }
};

export function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTrack = async () => {
    setIsLoading(true);
    setError(false);
    setTrackingData(null);

    try {
      // Try real API first
      const result = await trackingService.trackShipment(trackingNumber.toUpperCase());

      if (result.success && result.data) {
        // Map backend data to display format
        const mappedData = trackingService.mapTrackingToDisplay(result.data);
        setTrackingData(mappedData);
        setError(false);
      } else {
        // Fallback to mock data for demo purposes
        const mockData = mockTrackingData[trackingNumber.toUpperCase()];
        if (mockData) {
          setTrackingData(mockData);
          setError(false);
        } else {
          setError(true);
          setTrackingData(null);
        }
      }
    } catch (err) {
      // Fallback to mock data if API fails
      const mockData = mockTrackingData[trackingNumber.toUpperCase()];
      if (mockData) {
        setTrackingData(mockData);
        setError(false);
      } else {
        setError(true);
        setTrackingData(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

  return (
    <div className="relative bg-[#F5F7F8] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-48 pb-20 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-[#1A1A1B] opacity-20" />
              <span className="text-[#1A1A1B] text-sm tracking-[0.2em] uppercase font-mono opacity-40">
                Shipment Tracking
              </span>
              <div className="w-12 h-px bg-[#1A1A1B] opacity-20" />
            </div>

            <h1 className="text-5xl lg:text-7xl text-[#1A1A1B] tracking-tight mb-6" style={{ fontWeight: 700 }}>
              Track Your
              <br />
              <span className="opacity-40">Shipment</span>
            </h1>

            <p className="text-lg text-[#1A1A1B] opacity-60 leading-relaxed max-w-2xl mx-auto">
              Enter your tracking number below to get real-time updates on your shipment's location and delivery status.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="relative pb-12 px-6 lg:px-20">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 lg:p-12 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A1A1B] opacity-40" />
                <input
                  type="text"
                  placeholder="Enter your tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-4 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B] font-mono"
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={!trackingNumber.trim() || isLoading}
                className="px-8 py-4 bg-[#003893] text-white hover:bg-[#002670] disabled:bg-[#1A1A1B]/20 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                style={{ fontWeight: 600 }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Tracking...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Track</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1A1A1B]/10">
              <p className="text-sm text-[#1A1A1B] opacity-40 mb-2 font-mono">Try these example tracking IDs:</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(mockTrackingData).map((id) => (
                  <button
                    key={id}
                    onClick={() => setTrackingNumber(id)}
                    className="text-xs font-mono text-[#003893] hover:text-[#DC143C] transition-colors px-3 py-1 border border-[#003893]/20 hover:border-[#DC143C]/20"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative py-12 px-6 lg:px-20"
          >
            <div className="max-w-[800px] mx-auto">
              <div className="bg-white p-12 text-center">
                <AlertCircle className="w-16 h-16 text-[#DC143C] mx-auto mb-6" strokeWidth={1.5} />
                <h3 className="text-2xl text-[#1A1A1B] mb-4" style={{ fontWeight: 700 }}>
                  Shipment Not Found
                </h3>
                <p className="text-[#1A1A1B] opacity-60 mb-8">
                  We couldn't find a shipment with tracking number <span className="font-mono text-[#DC143C]">{trackingNumber}</span>.
                  <br />
                  Please check the tracking number and try again.
                </p>
                <button
                  onClick={() => {
                    setError(false);
                    setTrackingNumber('');
                  }}
                  className="px-8 py-3 bg-[#003893] text-white hover:bg-[#002670] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Try Again
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Tracking Results */}
      <AnimatePresence>
        {trackingData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <section className="relative py-12 px-6 lg:px-20">
              <div className="max-w-[1400px] mx-auto">
                {/* Shipment Summary Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-8 lg:p-12 mb-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <Package className="w-6 h-6 text-[#003893]" />
                        <span className="text-sm text-[#1A1A1B] opacity-40 tracking-[0.15em] uppercase font-mono">
                          Tracking ID
                        </span>
                      </div>
                      <h2 className="text-3xl lg:text-4xl text-[#1A1A1B] mb-6 font-mono" style={{ fontWeight: 700 }}>
                        {trackingData.trackingId}
                      </h2>

                      <div className="flex items-center gap-4 mb-8">
                        <div
                          className="px-4 py-2 text-sm font-mono"
                          style={{
                            backgroundColor: statusConfig[trackingData.statusCode]?.bgColor.replace('/10', '').replace('/', '') + '1A',
                            color: statusConfig[trackingData.statusCode]?.color
                          }}
                        >
                          {trackingData.status}
                        </div>
                        <span className="text-[#1A1A1B] opacity-40">•</span>
                        <span className="text-[#1A1A1B] opacity-60 text-sm">{trackingData.serviceType}</span>
                      </div>

                      <div className="flex items-center gap-4 text-lg mb-4">
                        <span className="text-[#1A1A1B]" style={{ fontWeight: 600 }}>{trackingData.origin}</span>
                        <ArrowRight className="w-5 h-5 text-[#FFD700]" />
                        <span className="text-[#1A1A1B]" style={{ fontWeight: 600 }}>{trackingData.destination}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[#1A1A1B] opacity-60">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          Estimated Delivery: <span style={{ fontWeight: 600 }}>{new Date(trackingData.estimatedDelivery).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#F5F7F8] p-6 min-w-[280px]">
                      <h3 className="text-sm text-[#1A1A1B] opacity-40 tracking-[0.15em] uppercase font-mono mb-4">
                        Package Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-[#1A1A1B] opacity-40 mb-1">Weight</p>
                          <p className="text-[#1A1A1B]" style={{ fontWeight: 600 }}>{trackingData.weight}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#1A1A1B] opacity-40 mb-1">Dimensions</p>
                          <p className="text-[#1A1A1B]" style={{ fontWeight: 600 }}>{trackingData.dimensions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                  {/* Customer Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white p-8"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <User className="w-5 h-5 text-[#003893]" />
                      <h3 className="text-sm text-[#1A1A1B] opacity-40 tracking-[0.15em] uppercase font-mono">
                        Customer Information
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-[#1A1A1B] opacity-40 mb-1">Name</p>
                        <p className="text-[#1A1A1B]" style={{ fontWeight: 600 }}>{trackingData.customer.name}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-3 h-3 text-[#1A1A1B] opacity-40" />
                          <p className="text-xs text-[#1A1A1B] opacity-40">Email</p>
                        </div>
                        <p className="text-sm text-[#1A1A1B] opacity-70">{trackingData.customer.email}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Phone className="w-3 h-3 text-[#1A1A1B] opacity-40" />
                          <p className="text-xs text-[#1A1A1B] opacity-40">Phone</p>
                        </div>
                        <p className="text-sm text-[#1A1A1B] opacity-70">{trackingData.customer.phone}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Home className="w-3 h-3 text-[#1A1A1B] opacity-40" />
                          <p className="text-xs text-[#1A1A1B] opacity-40">Address</p>
                        </div>
                        <p className="text-sm text-[#1A1A1B] opacity-70">{trackingData.customer.address}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Package Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white p-8"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <Package className="w-5 h-5 text-[#003893]" />
                      <h3 className="text-sm text-[#1A1A1B] opacity-40 tracking-[0.15em] uppercase font-mono">
                        Package Description
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-[#1A1A1B] opacity-40 mb-1">Contents</p>
                        <p className="text-[#1A1A1B]" style={{ fontWeight: 600 }}>{trackingData.package.description}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#1A1A1B] opacity-40 mb-1">Service Type</p>
                        <p className="text-sm text-[#1A1A1B] opacity-70">{trackingData.package.serviceType}</p>
                      </div>
                      {trackingData.package.declaredValue && (
                        <div>
                          <p className="text-xs text-[#1A1A1B] opacity-40 mb-1">Declared Value</p>
                          <p className="text-sm text-[#1A1A1B] opacity-70">{trackingData.package.declaredValue}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Flight Details */}
                  {trackingData.flight && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="bg-white p-8"
                    >
                      <div className="flex items-center gap-2 mb-6">
                        <Plane className="w-5 h-5 text-[#003893]" />
                        <h3 className="text-sm text-[#1A1A1B] opacity-40 tracking-[0.15em] uppercase font-mono">
                          Flight Details
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-[#1A1A1B] opacity-40 mb-1">Airline / Flight</p>
                          <p className="text-[#1A1A1B]" style={{ fontWeight: 600 }}>
                            {trackingData.flight.airline} {trackingData.flight.flightNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#1A1A1B] opacity-40 mb-1">Departure</p>
                          <p className="text-sm text-[#1A1A1B] opacity-70 mb-1">{trackingData.flight.departure}</p>
                          <p className="text-xs text-[#1A1A1B] opacity-50">{trackingData.flight.departureTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#1A1A1B] opacity-40 mb-1">Arrival</p>
                          <p className="text-sm text-[#1A1A1B] opacity-70 mb-1">{trackingData.flight.arrival}</p>
                          <p className="text-xs text-[#1A1A1B] opacity-50">{trackingData.flight.arrivalTime}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Tracking Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white p-8 lg:p-12"
                >
                  <div className="flex items-center gap-2 mb-10">
                    <Clock className="w-5 h-5 text-[#003893]" />
                    <h3 className="text-sm text-[#1A1A1B] opacity-40 tracking-[0.15em] uppercase font-mono">
                      Shipment Timeline
                    </h3>
                  </div>

                  <div className="relative">
                    {trackingData.timeline.map((event: any, index: number) => {
                      const StatusIcon = statusConfig[event.statusCode]?.icon || Circle;
                      const isLast = index === trackingData.timeline.length - 1;

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          className="relative flex gap-6 pb-12 last:pb-0"
                        >
                          {/* Timeline Line */}
                          {!isLast && (
                            <div
                              className="absolute left-6 top-12 w-px h-full"
                              style={{
                                backgroundColor: event.completed ? statusConfig[event.statusCode]?.color : '#1A1A1B20'
                              }}
                            />
                          )}

                          {/* Status Icon */}
                          <div
                            className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${event.current ? 'ring-4 ring-offset-4' : ''
                              }`}
                            style={{
                              backgroundColor: event.completed || event.current
                                ? statusConfig[event.statusCode]?.color
                                : '#F5F7F8',
                              ringColor: event.current ? statusConfig[event.statusCode]?.color + '40' : 'transparent'
                            }}
                          >
                            <StatusIcon
                              className={`w-6 h-6 ${event.completed || event.current ? 'text-white' : 'text-[#1A1A1B] opacity-20'
                                }`}
                              strokeWidth={2}
                            />
                          </div>

                          {/* Event Details */}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                              <h4
                                className="text-xl text-[#1A1A1B] tracking-tight"
                                style={{
                                  fontWeight: event.current ? 700 : 600,
                                  opacity: event.completed || event.current ? 1 : 0.4
                                }}
                              >
                                {event.status}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-[#1A1A1B] opacity-60 font-mono">
                                <Calendar className="w-4 h-4" />
                                <span>{event.date}</span>
                                <span>•</span>
                                <span>{event.time}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-[#1A1A1B] opacity-40" />
                              <p className="text-sm text-[#1A1A1B] opacity-60">{event.location}</p>
                            </div>

                            <p
                              className="text-[#1A1A1B] leading-relaxed"
                              style={{ opacity: event.completed || event.current ? 0.7 : 0.4 }}
                            >
                              {event.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State (no search yet) */}
      {!trackingData && !error && !isLoading && (
        <section className="relative py-20 px-6 lg:px-20">
          <div className="max-w-[800px] mx-auto text-center">
            <Package className="w-20 h-20 text-[#1A1A1B] opacity-10 mx-auto mb-6" />
            <p className="text-[#1A1A1B] opacity-40">
              Enter a tracking number above to view shipment details
            </p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
