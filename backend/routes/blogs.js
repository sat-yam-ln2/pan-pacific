const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET all blogs (public)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const category = req.query.category;
        const search = req.query.search;

        const query = { published: true };
        if (category && category !== 'All') {
            query.category = category;
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }

        const skipIdx = (page - 1) * limit;
        const blogs = await Blog.find(query)
            .sort({ publishedAt: -1 })
            .skip(skipIdx)
            .limit(limit);

        const total = await Blog.countDocuments(query);

        res.json({
            success: true,
            data: blogs,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET single blog by slug (public)
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, published: true });
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST new blog (admin - ideally should have middleware)
router.post('/', async (req, res) => {
    try {
        const blog = new Blog(req.body);
        const newBlog = await blog.save();
        res.status(201).json({ success: true, data: newBlog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT update blog
router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.json({ success: true, data: updatedBlog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE blog
router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
