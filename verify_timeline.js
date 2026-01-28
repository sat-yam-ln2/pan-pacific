
async function verifyTimelineFixes() {
    const baseURL = 'http://localhost:5000/api/shipments';

    try {
        console.log('Fetching shipments...');
        const allShipmentsResponse = await fetch(baseURL);
        const data = await allShipmentsResponse.json();
        const shipments = data.data || [];

        if (shipments.length === 0) {
            console.log('No shipments found to test.');
            return;
        }

        // Find a shipment with some events if possible
        const testShipment = shipments.find(s => s.events && s.events.length > 0) || shipments[0];
        const trackingId = testShipment.trackingId;
        const events = testShipment.events || [];
        const initialEventCount = events.length;

        console.log(`Testing with Shipment: ${trackingId}, Initial Events: ${initialEventCount}`);

        // 1. Test Duplicate Prevention (Update with same data)
        console.log('Step 1: Updating with SAME data (should not add event)...');
        const samePayload = {
            status: testShipment.status,
            currentLocation: events.length > 0 ? events[events.length - 1].location : 'New York',
            statusDescription: events.length > 0 ? events[events.length - 1].description : 'Initial status'
        };

        const sameResponse = await fetch(`${baseURL}/${trackingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(samePayload)
        });
        const sameData = await sameResponse.json();
        const afterSameCount = sameData.data.events ? sameData.data.events.length : 0;
        console.log('Event count after same-data update:', afterSameCount);

        if (afterSameCount === initialEventCount || (initialEventCount === 0 && afterSameCount === 1)) {
            // If initial was 0, it might have added one if the payload felt "new", 
            // but subsequently it shouldn't add more.
            console.log('✅ Duplicate prevention logic looks good (or initial was empty)!');
        } else {
            console.log('❌ FAILED: Duplicate event added. Count went from', initialEventCount, 'to', afterSameCount);
        }

        // 2. Test New Event Addition
        console.log('Step 2: Updating with NEW location (should add event)...');
        const newPayload = {
            ...samePayload,
            currentLocation: 'Dubai Hub ' + Date.now(),
            statusDescription: 'In transit to destination'
        };

        const newResponse = await fetch(`${baseURL}/${trackingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPayload)
        });
        const newData = await newResponse.json();
        const afterNewCount = newData.data.events ? newData.data.events.length : 0;
        console.log('Event count after new-data update:', afterNewCount);

        if (afterNewCount === afterSameCount + 1) {
            console.log('✅ New event addition working!');
        } else {
            console.log('❌ FAILED: New event not added correctly. Count went from', afterSameCount, 'to', afterNewCount);
        }

    } catch (error) {
        console.error('Error during verification:', error.message);
    }
}

verifyTimelineFixes();
