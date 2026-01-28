const { storageAdapter } = require('../data/storageConfig');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkData() {
    try {
        console.log('Connecting to database...');
        await storageAdapter.init();

        console.log('Fetching shipments...');
        const helpers = storageAdapter.getHelpers();
        const result = await helpers.getAllShipments({ limit: 1 });

        console.log('Result Success:', !!result);
        console.log('Data Count:', result.data.length);
        if (result.data.length > 0) {
            console.log('First Shipment Sample:');
            console.log(JSON.stringify(result.data[0], null, 2));
        } else {
            console.log('No shipments found!');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error checking data:', error);
        process.exit(1);
    }
}

checkData();
