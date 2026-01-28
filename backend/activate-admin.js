const mongoose = require('mongoose');
const Admin = require('./models/Admin');

async function activateAdmin() {
    try {
        await mongoose.connect('mongodb://localhost:27017/pan-pacific');
        console.log('✅ Connected to MongoDB');

        const result = await Admin.updateOne(
            { email: 'admin@panpacific.com' },
            { $set: { isActive: true } }
        );

        console.log('📝 Update result:', result);

        const admin = await Admin.findOne({ email: 'admin@panpacific.com' });
        console.log('✅ Admin isActive now:', admin.isActive);
        console.log('📧 Email:', admin.email);
        console.log('👤 Role:', admin.role);

        await mongoose.disconnect();
        console.log('👋 Disconnected');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

activateAdmin();
