// Public Tracking Service for Pan Pacific Shipping
import { get } from './api';
import type { Shipment } from './shipments';

export interface TrackingResult {
    success: boolean;
    data?: Shipment;
    message?: string;
}

// Track a shipment by tracking ID (public - no auth required)
export async function trackShipment(trackingId: string): Promise<TrackingResult> {
    const result = await get<Shipment>(`/track/${trackingId}`, false);
    return result as TrackingResult;
}

// Track multiple shipments (public - no auth required)
export async function trackMultipleShipments(trackingIds: string[]) {
    const { post } = await import('./api');
    return post<{ shipments: Shipment[] }>('/track/batch', { trackingIds }, false);
}

// Map backend tracking data to frontend display format
export function mapTrackingToDisplay(shipment: Shipment) {
    const statusMapping: { [key: string]: string } = {
        'processing': 'Order Processed',
        'picked-up': 'Picked Up',
        'in-transit': 'In Transit',
        'out-for-delivery': 'Out for Delivery',
        'delivered': 'Delivered',
        'failed-delivery': 'Delivery Failed',
        'returned': 'Returned',
        'cancelled': 'Cancelled',
    };

    const statusCodeMapping: { [key: string]: string } = {
        'processing': 'processed',
        'picked-up': 'picked_up',
        'in-transit': 'in_transit',
        'out-for-delivery': 'out_for_delivery',
        'delivered': 'delivered',
        'failed-delivery': 'failed',
        'returned': 'failed',
        'cancelled': 'failed',
    };

    // Get current status index to determine completed steps
    const statusOrder = ['processing', 'picked-up', 'in-transit', 'out-for-delivery', 'delivered'];
    const currentStatusIndex = statusOrder.indexOf(shipment.status);

    return {
        trackingId: shipment.trackingId,
        status: statusMapping[shipment.status] || shipment.status,
        statusCode: statusCodeMapping[shipment.status] || shipment.status,
        origin: shipment.shipmentDetails?.origin || '',
        destination: shipment.shipmentDetails?.destination || '',
        estimatedDelivery: shipment.estimatedDelivery
            ? new Date(shipment.estimatedDelivery).toISOString().split('T')[0]
            : '',
        serviceType: getServiceTypeDisplay(shipment.serviceType || shipment.shipmentDetails?.serviceType),
        customer: {
            name: shipment.customerInfo?.name || '',
            email: shipment.customerInfo?.email || '',
            phone: shipment.customerInfo?.phone || '',
            address: shipment.customerInfo?.address || '',
        },
        package: {
            description: shipment.shipmentDetails?.description || '',
            weight: shipment.shipmentDetails?.weight ? `${shipment.shipmentDetails.weight} kg` : '',
            serviceType: getServiceTypeDisplay(shipment.serviceType || shipment.shipmentDetails?.serviceType),
            declaredValue: shipment.shipmentDetails?.value ? `USD ${shipment.shipmentDetails.value}` : '',
        },
        flightDetails: shipment.shipmentDetails?.flightDetails ? {
            flightNumber: shipment.shipmentDetails.flightDetails,
            departure: shipment.shipmentDetails.origin,
            arrival: shipment.shipmentDetails.destination,
        } : undefined,
        timeline: (shipment.events || []).map((event, index) => {
            const eventDate = event.timestamp ? new Date(event.timestamp) : new Date();
            const isLatest = index === (shipment.events || []).length - 1;
            return {
                status: event.status,
                statusCode: statusCodeMapping[event.status.toLowerCase().replace(/ /g, '-')] || 'processed',
                location: event.location,
                date: eventDate.toISOString().split('T')[0],
                time: eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                description: event.description,
                completed: event.completed || !isLatest,
                current: isLatest,
            };
        }).reverse(), // Reverse so newest appears at the top
    };
}

function getServiceTypeDisplay(type: string): string {
    const mapping: { [key: string]: string } = {
        'standard': 'Standard Shipping',
        'express': 'Air Freight Express',
        'overnight': 'Overnight Delivery',
        'international': 'International Freight',
        'freight': 'Sea Freight',
    };
    return mapping[type] || type || 'Standard Shipping';
}
