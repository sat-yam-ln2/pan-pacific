const axios = require('axios');

async function testLogin() {
    try {
        const response = await axios.post('http://localhost:5000/api/admin/login', {
            email: 'admin@panpacific.com',
            password: 'capitalcargo123$'
        });

        console.log('✅ Login successful!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('❌ Login failed!');
        console.error('Status:', error.response?.status);
        console.error('Message:', error.response?.data);
    }
}

testLogin();
