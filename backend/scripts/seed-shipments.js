const mongoose = require('mongoose');
const Shipment = require('../models/Shipment');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pan-pacific';

const LOCATIONS = ['New York, USA', 'London, UK', 'Tokyo, Japan', 'Shanghai, China', 'Dubai, UAE', 'Hamburg, Germany', 'Sydney, Australia', 'Mumbai, India', 'Singapore', 'Los Angeles, USA'];
const STATUSES = ['processing', 'picked-up', 'in-transit', 'out-for-delivery', 'delivered', 'failed-delivery', 'returned', 'cancelled'];
const SERVICE_TYPES = ['standard', 'express', 'overnight', 'international', 'freight'];
const DESCRIPTIONS = ['Electronics', 'Automotive Parts', 'Textiles', 'Documents', 'Medical Supplies', 'Furniture', 'Perishable Goods', 'Machinery'];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomShipment(index) {
    const origin = getRandomElement(LOCATIONS);
    let destination = getRandomElement(LOCATIONS);
    while (destination === origin) {
        destination = getRandomElement(LOCATIONS);
    }

    const status = getRandomElement(STATUSES);
    const serviceType = getRandomElement(SERVICE_TYPES);

    // Create realistic dates
    const now = new Date();
    const createdDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Up to 30 days ago
    const estimatedDelivery = new Date(createdDate.getTime() + (Math.random() * 10 + 2) * 24 * 60 * 60 * 1000); // 2-12 days after creation

    const events = [
        {
            status: 'processing',
            description: 'Order received and processing started',
            location: origin,
            timestamp: createdDate,
            completed: true
        }
    ];

    if (status !== 'processing') {
        events.push({
            status: 'picked-up',
            description: 'Picked up by carrier',
            location: 'Distribution Center, ' + origin,
            timestamp: new Date(createdDate.getTime() + 24 * 60 * 60 * 1000),
            completed: true
        });
    }

    if (['in-transit', 'out-for-delivery', 'delivered'].includes(status)) {
        events.push({
            status: 'in-transit',
            description: 'Package in transit',
            location: 'International Hub',
            timestamp: new Date(createdDate.getTime() + 48 * 60 * 60 * 1000),
            completed: true
        });
    }

    if (status === 'delivered') {
        events.push({
            status: 'delivered',
            description: 'Delivered to recipient',
            location: destination,
            timestamp: estimatedDelivery < now ? estimatedDelivery : now,
            completed: true
        });
    }

    return {
        trackingId: `CC${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`,
        status: status,
        serviceType: serviceType,
        customerInfo: {
            name: `Customer ${index}`,
            email: `customer${index}@example.com`,
            phone: `+1-555-01${index.toString().padStart(2, '0')}`,
            address: `${Math.floor(Math.random() * 1000)} Main St, ${destination}`
        },
        shipmentDetails: {
            origin: origin,
            destination: destination,
            weight: Math.floor(Math.random() * 50) + 1,
            dimensions: {
                length: Math.floor(Math.random() * 50) + 10,
                width: Math.floor(Math.random() * 40) + 10,
                height: Math.floor(Math.random() * 30) + 5
            },
            serviceType: serviceType,
            description: getRandomElement(DESCRIPTIONS),
            estimatedDelivery: estimatedDelivery
        },
        events: events,
        estimatedDelivery: estimatedDelivery,
        createdAt: createdDate,
        updatedAt: now
    };
}

async function seedShipments() {
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB:', uri);

        // Clear existing shipments? Maybe optional, but good for clean slate if requested 'fill up'
        const count = await Shipment.countDocuments();
        console.log(`Current shipment count: ${count}`);

        if (count > 0) {
            console.log('Clearing existing shipments...');
            await Shipment.deleteMany({});
        }

        console.log('Generating 50 random shipments...');
        const shipments = [];
        for (let i = 1; i <= 50; i++) {
            shipments.push(generateRandomShipment(i));
        }

        await Shipment.insertMany(shipments);
        console.log('✅ Successfully seeded 50 shipments!');

    } catch (error) {
        console.error('❌ Error seeding shipments:', error);
    } finally {
        await mongoose.disconnect();
        console.log('👋 Disconnected');
    }
}

seedShipments();
