const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

async function verifyBlogs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB\n');

        const blogs = await Blog.find({ published: true });
        console.log(`✅ Total published blogs: ${blogs.length}\n`);

        blogs.forEach((blog, index) => {
            console.log(`${index + 1}. ${blog.title}`);
            console.log(`   Category: ${blog.category}`);
            console.log(`   Featured: ${blog.featured ? 'Yes ⭐' : 'No'}`);
            console.log(`   Image: ${blog.image}`);
            console.log(`   Read Time: ${blog.readTime}`);
            console.log('');
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

verifyBlogs();
