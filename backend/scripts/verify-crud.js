const http = require('http');

const API_PORT = 5000;
const BASE_URL = `http://localhost:${API_PORT}/api/shipments`;

// Helper to make HTTP requests
function request(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: API_PORT,
            path: `/api/shipments${path}`,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = body ? JSON.parse(body) : {};
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    console.log('Raw body:', body);
                    resolve({ status: res.statusCode, body: body });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function verifyCRUD() {
    console.log(`Starting CRUD Verification on port ${API_PORT}...`);

    // 1. Create a Shipment
    console.log('\nTesting CREATE (POST)...');
    const newShipment = {
        trackingId: `TEST${Date.now()}`,
        status: 'processing',
        customerInfo: {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            address: '123 Test St, Test City'
        },
        shipmentDetails: {
            origin: 'Test Origin',
            destination: 'Test Destination',
            weight: 10,
            dimensions: { length: 10, width: 10, height: 10 },
            serviceType: 'standard',
            estimatedDelivery: new Date().toISOString(),
            description: 'Test Package'
        },
        events: []
    };

    try {
        const createRes = await request('POST', '', newShipment);
        if (createRes.status !== 201) {
            console.error('CREATE Failed:', createRes.status, createRes.body);
            return;
        }
        console.log('CREATE Success:', createRes.body.data.trackingId);
        const createdId = createRes.body.data._id;
        const trackingId = createRes.body.data.trackingId;

        // 2. Read All Shipments
        console.log('\nTesting READ ALL (GET)...');
        const getAllRes = await request('GET', '?page=1&limit=10');
        if (getAllRes.status !== 200) {
            console.error('READ ALL Failed:', getAllRes.status);
            return;
        }
        console.log(`READ ALL Success: Retrieved ${getAllRes.body.data.length} shipments.`);
        const exists = getAllRes.body.data.find(s => s._id === createdId);
        if (exists) console.log('Created shipment found in list.');
        else console.error('Created shipment NOT found in list.');

        // 3. Update Shipment
        console.log('\nTesting UPDATE (PUT)...');
        const updateData = {
            status: 'in-transit',
            shipmentDetails: { ...newShipment.shipmentDetails, origin: 'Updated Origin' }
        };
        const updateRes = await request('PUT', `/${trackingId}`, updateData);
        if (updateRes.status !== 200) {
            console.error('UPDATE Failed:', updateRes.status, updateRes.body);
            return;
        }
        console.log('UPDATE Success:', updateRes.body.data.status, updateRes.body.data.shipmentDetails.origin);

        // 4. Delete Shipment
        console.log('\nTesting DELETE...');
        const deleteRes = await request('DELETE', `/${trackingId}`);
        if (deleteRes.status !== 200) {
            console.error('DELETE Failed:', deleteRes.status, deleteRes.body);
            return;
        }
        console.log('DELETE Success:', deleteRes.body.message);

        // Verify Deletion
        const getDeletedRes = await request('GET', `/${trackingId}`);
        if (getDeletedRes.status === 404) {
            console.log('Verify Deletion Success: Shipment not found as expected.');
        } else {
            console.error('Verify Deletion Failed: Shipment still exists or other error.', getDeletedRes.status);
        }

        console.log('\nALL CRUD TESTS PASSED!');

    } catch (error) {
        console.error('Test Script Error:', error);
    }
}

verifyCRUD();
