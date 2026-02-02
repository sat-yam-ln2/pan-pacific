
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pan-pacific';

async function createAdmin() {
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB:', uri);

        const count = await Admin.countDocuments();
        console.log(`📊 Current admin count: ${count}`);

        if (count === 0) {
            console.log('Creating default admin user...');
            const admin = new Admin({
                name: 'Admin User',
                email: 'admin2@panpacific.com',
                password: 'capitalcargo123$#$#',
                role: 'admin'
            });

            await admin.save();
            console.log('✅ Admin user created successfully');
            console.log('📧 admin@panpacific.com');
        } else {
            console.log('⚠️ Admin users already exist. Listing emails:');
            const admins = await Admin.find({}, 'email role');
            console.log(admins);

            // Reset password for the default admin just in case
            const defaultAdmin = await Admin.findOne({ email: 'admin@panpacific.com' });
            if (defaultAdmin) {
                console.log('Updating password for admin@panpacific.com...');
                defaultAdmin.password = 'capitalcargo123$';
                await defaultAdmin.save();
                console.log('✅ Password updated');
            }
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('👋 Disconnected');
    }
}

createAdmin();
