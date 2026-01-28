require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const initialBlogs = [
    {
        title: 'Complete Guide to International Shipping from Nepal in 2026',
        excerpt: 'Everything you need to know about shipping cargo internationally from Nepal, including documentation, customs procedures, and cost-saving strategies for businesses and individuals.',
        content: 'Long form content for Guide to International Shipping...'.repeat(20),
        category: 'How-To Guides',
        author: 'Tejman Tamang',
        publishedAt: new Date('January 10, 2026'),
        readTime: '8 min read',
        image: 'cargo',
        featured: true,
        tags: ['nepal', 'shipping', 'guide']
    },
    {
        title: 'FCL vs LCL Shipping: Which Service is Right for Your Business?',
        excerpt: 'Learn the key differences between Full Container Load and Less than Container Load shipping to make the best decision for your cargo volume and budget.',
        content: 'Long form content for FCL vs LCL...'.repeat(20),
        category: 'Shipping Tips',
        author: 'Manoj Thapa',
        publishedAt: new Date('January 8, 2026'),
        readTime: '6 min read',
        image: 'containers',
        tags: ['fcl', 'lcl', 'business']
    },
    {
        title: 'New Customs Regulations for Nepal Imports in 2026',
        excerpt: 'Stay compliant with the latest customs regulations and documentation requirements for importing goods into Nepal, effective January 2026.',
        content: 'Long form content for Customs Regulations...'.repeat(20),
        category: 'Customs & Regulations',
        author: 'Priya Sharma',
        publishedAt: new Date('January 5, 2026'),
        readTime: '5 min read',
        image: 'customs',
        tags: ['customs', 'nepal', 'imports']
    },
    {
        title: 'How to Calculate Volumetric Weight for Air Freight',
        excerpt: 'Master the art of calculating dimensional weight for air shipments to avoid unexpected costs and optimize your shipping expenses.',
        content: 'Long form content for Volumetric Weight...'.repeat(20),
        category: 'How-To Guides',
        author: 'Rajesh Kumar',
        publishedAt: new Date('January 3, 2026'),
        readTime: '4 min read',
        image: 'air-cargo',
        tags: ['air-freight', 'weight', 'calculation']
    }
];

async function seedBlogs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing blogs
        await Blog.deleteMany({});
        console.log('Cleared existing blogs');

        // Insert initial blogs
        for (const blogData of initialBlogs) {
            await Blog.create(blogData);
        }
        console.log('Successfully seeded initial blogs');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding blogs:', error);
        process.exit(1);
    }
}

seedBlogs();
