// Shipments Service for Pan Pacific Admin Panel
import { get, post, put, del } from './api';

// Shipment types matching backend schema
export interface TrackingEvent {
    id?: string;
    _id?: string;
    status: string;
    description: string;
    location: string;
    timestamp: string;
    completed?: boolean;
}

export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface ShipmentDetails {
    origin: string;
    destination: string;
    weight: number;
    actualWeight?: number;
    volumetricWeight?: number;
    numberOfPackages?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
    serviceType: 'standard' | 'express' | 'overnight' | 'international' | 'freight';
    description: string;
    flightDetails?: string;
    value?: number;
}

export interface Shipment {
    _id?: string;
    id?: string;
    trackingId: string;
    serviceType: 'standard' | 'express' | 'overnight' | 'international' | 'freight';
    customerInfo: CustomerInfo;
    shipmentDetails: ShipmentDetails;
    status: 'processing' | 'picked-up' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'failed-delivery' | 'returned' | 'cancelled';
    events: TrackingEvent[];
    estimatedDelivery: string;
    actualDelivery?: string;
    lastUpdated?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ShipmentListResponse {
    shipments: Shipment[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// Get all shipments with pagination
export async function getAllShipments(page: number = 1, limit: number = 20) {
    return get<ShipmentListResponse>(`/shipments?page=${page}&limit=${limit}`);
}

// Get shipment by ID or tracking ID
export async function getShipmentById(id: string) {
    return get<Shipment>(`/shipments/${id}`);
}

// Create new shipment
export async function createShipment(shipmentData: Partial<Shipment>) {
    return post<Shipment>('/shipments', shipmentData);
}

// Update shipment
export async function updateShipment(id: string, updateData: Partial<Shipment>) {
    return put<Shipment>(`/shipments/${id}`, updateData);
}

// Update shipment status with new tracking event
export async function updateShipmentStatus(
    id: string,
    status: string,
    description: string,
    location: string
) {
    return put<Shipment>(`/shipments/${id}/status`, {
        status,
        description,
        location,
    });
}

// Add tracking event to shipment
export async function addTrackingEvent(
    id: string,
    status: string,
    description: string,
    location: string
) {
    return post<Shipment>(`/shipments/${id}/events`, {
        status,
        description,
        location,
    });
}

// Delete shipment
export async function deleteShipment(id: string) {
    return del<{ message: string }>(`/shipments/${id}`);
}

// Helper to convert backend shipment to frontend format
export function mapShipmentToFrontend(shipment: Shipment) {
    return {
        id: shipment._id || shipment.id || shipment.trackingId,
        trackingId: shipment.trackingId,
        customerName: shipment.customerInfo?.name || '',
        customerEmail: shipment.customerInfo?.email || '',
        customerPhone: shipment.customerInfo?.phone || '',
        customerAddress: shipment.customerInfo?.address || '',
        origin: shipment.shipmentDetails?.origin || '',
        destination: shipment.shipmentDetails?.destination || '',
        status: shipment.status,
        serviceType: mapServiceType(shipment.serviceType || shipment.shipmentDetails?.serviceType),
        packageDetails: shipment.shipmentDetails?.description || '',
        weight: shipment.shipmentDetails?.weight?.toString() || '0',
        dimensions: shipment.shipmentDetails?.dimensions
            ? `${shipment.shipmentDetails.dimensions.length}x${shipment.shipmentDetails.dimensions.width}x${shipment.shipmentDetails.dimensions.height} cm`
            : '',
        createdDate: shipment.createdAt ? new Date(shipment.createdAt).toISOString().split('T')[0] : '',
        lastUpdated: shipment.lastUpdated || shipment.updatedAt || '',
        estimatedDelivery: shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toISOString().split('T')[0] : '',
        events: (shipment.events || []).map(event => ({
            date: event.timestamp ? new Date(event.timestamp).toLocaleString() : '',
            status: event.status,
            location: event.location,
            description: event.description,
        })),
    };
}

// Map backend service type to frontend format
function mapServiceType(type: string): 'air-freight' | 'sea-freight' | 'land-transport' | 'door-to-door' {
    const mapping: { [key: string]: 'air-freight' | 'sea-freight' | 'land-transport' | 'door-to-door' } = {
        'express': 'air-freight',
        'overnight': 'air-freight',
        'international': 'sea-freight',
        'freight': 'sea-freight',
        'standard': 'land-transport',
    };
    return mapping[type] || 'door-to-door';
}

// Map frontend format to backend format for creating/updating
export function mapShipmentToBackend(frontendData: any): Partial<Shipment> {
    const serviceTypeMapping: { [key: string]: 'standard' | 'express' | 'overnight' | 'international' | 'freight' } = {
        'air-freight': 'express',
        'sea-freight': 'international',
        'land-transport': 'standard',
        'door-to-door': 'standard',
    };

    // Parse dimensions if string provided (e.g. "50x40x30 cm")
    let dimensions = undefined;
    if (frontendData.dimensions) {
        const parts = frontendData.dimensions.replace(' cm', '').split('x').map((p: string) => parseFloat(p.trim()));
        if (parts.length === 3 && parts.every((p: number) => !isNaN(p))) {
            dimensions = {
                length: parts[0],
                width: parts[1],
                height: parts[2]
            };
        }
    }

    const backendData: Partial<Shipment> = {
        trackingId: frontendData.trackingId,
        serviceType: serviceTypeMapping[frontendData.serviceType] || 'standard',
        customerInfo: {
            name: frontendData.customerName,
            email: frontendData.customerEmail,
            phone: frontendData.customerPhone,
            address: frontendData.customerAddress || frontendData.destination,
        },
        shipmentDetails: {
            origin: frontendData.origin,
            destination: frontendData.destination,
            weight: parseFloat(frontendData.weight) || 0,
            serviceType: serviceTypeMapping[frontendData.serviceType] || 'standard',
            description: frontendData.packageDetails || 'Package',
            dimensions: dimensions
        },
        status: frontendData.status || 'processing',
    };

    if (frontendData.estimatedDelivery && frontendData.estimatedDelivery.trim() !== '') {
        backendData.estimatedDelivery = frontendData.estimatedDelivery;
    }

    // Include timeline update fields if they exist
    if (frontendData.currentLocation) {
        (backendData as any).currentLocation = frontendData.currentLocation;
    }
    if (frontendData.statusDescription) {
        (backendData as any).statusDescription = frontendData.statusDescription;
    }

    return backendData;
}
