import React, { useState, useMemo, useEffect, ChangeEvent } from 'react';
import * as blogsService from '../../services/blogs';
import { motion, AnimatePresence } from 'motion/react';
import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Eye,
    X,
    Calendar,
    User,
    Tag,
    Save,
    Loader2,
    ChevronLeft,
    ChevronRight,
    FileText,
    CheckCircle,
    AlertCircle,
    Image as ImageIcon,
    Clock,
    Star
} from 'lucide-react';

export function BlogManagement() {
    const [blogs, setBlogs] = useState<blogsService.BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<blogsService.BlogPost | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Shipping Tips',
        author: 'Admin',
        tags: '',
        image: 'cargo',
        readTime: '5 min read',
        featured: false,
        published: true
    });

    const categories = [
        'Shipping Tips',
        'Industry News',
        'How-To Guides',
        'Documentation',
        'Customs & Regulations'
    ];

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const result = await blogsService.getAllBlogs(currentPage, itemsPerPage, categoryFilter === 'All' ? undefined : categoryFilter, searchQuery);
            if (result.success && result.data) {
                setBlogs(result.data || []);
                setTotalItems(result.pagination?.total || 0);
            }
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, categoryFilter, searchQuery]);

    const handleCreateBlog = () => {
        setSelectedBlog(null);
        setIsEditMode(false);
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: 'Shipping Tips',
            author: 'Admin',
            tags: '',
            image: 'cargo',
            readTime: '5 min read',
            featured: false,
            published: true
        });
        setImagePreview(null);
        setShowModal(true);
    };

    const handleEditBlog = (blog: blogsService.BlogPost) => {
        setSelectedBlog(blog);
        setIsEditMode(true);
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            category: blog.category,
            author: blog.author,
            tags: blog.tags.join(', '),
            image: blog.image,
            readTime: blog.readTime,
            featured: blog.featured,
            published: blog.published
        });
        setImagePreview(null);
        setShowModal(true);
    };

    const handleSaveBlog = async () => {
        setIsSubmitting(true);
        try {
            const blogData = {
                ...formData,
                tags: formData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '')
            };

            const result = isEditMode && selectedBlog?._id
                ? await blogsService.updateBlog(selectedBlog._id, blogData)
                : await blogsService.createBlog(blogData);

            if (result.success) {
                setShowModal(false);
                fetchBlogs();
            }
        } catch (error) {
            console.error('Failed to save blog:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
        setUploadingImage(true);
        try {
            const result = await blogsService.uploadImage(file);
            if (result.success && result.data) {
                setFormData({ ...formData, image: result.data.imageUrl });
            }
        } catch (error) {
            console.error('Image upload failed:', error);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleDeleteBlog = async (id: string) => {
        setIsDeleting(id);
        try {
            await blogsService.deleteBlog(id);
            fetchBlogs();
        } catch (error) {
            console.error('Failed to delete blog:', error);
        } finally {
            setIsDeleting(null);
        }
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#1A1A1B]">Blog Management</h2>
                    <p className="text-[#1A1A1B]/60">Create and manage your logistics articles</p>
                </div>
                <button
                    onClick={handleCreateBlog}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#003893] text-white rounded-lg hover:bg-[#002a6b] transition-colors font-semibold"
                >
                    <Plus size={20} />
                    New Blog Post
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1B]/40" size={20} />
                    <input
                        type="text"
                        placeholder="Search by title or content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border-2 border-[#1A1A1B]/10 rounded-lg focus:border-[#003893] outline-none transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-[#1A1A1B]/40" size={20} />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 border-2 border-[#1A1A1B]/10 rounded-lg focus:border-[#003893] outline-none bg-white font-semibold cursor-pointer"
                    >
                        <option value="All">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Blog Posts Table */}
            <div className="bg-white rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#F5F7F8] border-b-2 border-[#1A1A1B]/5">
                            <tr>
                                <th className="px-6 py-4 font-bold text-[#1A1A1B]/60 text-sm uppercase tracking-wider">Title & Category</th>
                                <th className="px-6 py-4 font-bold text-[#1A1A1B]/60 text-sm uppercase tracking-wider">Author & Date</th>
                                <th className="px-6 py-4 font-bold text-[#1A1A1B]/60 text-sm uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-bold text-[#1A1A1B]/60 text-sm uppercase tracking-wider">Featured</th>
                                <th className="px-6 py-4 font-bold text-[#1A1A1B]/60 text-sm uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A1A1B]/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <Loader2 className="animate-spin inline-block text-[#003893]" size={40} />
                                        <p className="mt-4 text-[#1A1A1B]/60">Loading blog posts...</p>
                                    </td>
                                </tr>
                            ) : blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <FileText className="inline-block text-[#1A1A1B]/20 mb-4" size={60} />
                                        <p className="text-xl font-semibold text-[#1A1A1B]/40">No blog posts found</p>
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-[#F5F7F8]/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#003893]/10 rounded flex items-center justify-center text-[#003893]">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-[#1A1A1B] truncate max-w-[300px]">{blog.title}</p>
                                                    <span className="text-xs bg-[#FFD700]/20 text-[#1A1A1B] px-2 py-0.5 rounded-full font-semibold">
                                                        {blog.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-sm text-[#1A1A1B]/70">
                                                    <User size={14} />
                                                    <span>{blog.author}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-[#1A1A1B]/40">
                                                    <Calendar size={14} />
                                                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${blog.published
                                                ? 'bg-green-100 text-green-700 border-green-200'
                                                : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                }`}>
                                                {blog.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {blog.featured ? (
                                                <div className="flex items-center gap-1 text-[#FFD700]">
                                                    <Star size={18} fill="currentColor" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Top</span>
                                                </div>
                                            ) : (
                                                <span className="text-[#1A1A1B]/20">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEditBlog(blog)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => blog._id && handleDeleteBlog(blog._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                    disabled={isDeleting === blog._id}
                                                >
                                                    {isDeleting === blog._id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t-2 border-[#1A1A1B]/5 bg-[#F5F7F8]/30 flex items-center justify-between">
                        <p className="text-sm text-[#1A1A1B]/60 font-medium">
                            Showing <span className="text-[#1A1A1B]">{startIndex + 1}</span> to <span className="text-[#1A1A1B]">{Math.min(startIndex + itemsPerPage, totalItems)}</span> of <span className="text-[#1A1A1B]">{totalItems}</span> posts
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-2 border-2 border-[#1A1A1B]/10 rounded-lg hover:border-[#003893] hover:text-[#003893] disabled:opacity-30 disabled:hover:border-[#1A1A1B]/10 disabled:hover:text-[#1A1A1B] transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === page
                                            ? 'bg-[#003893] text-white shadow-lg shadow-[#003893]/20'
                                            : 'bg-white border-2 border-[#1A1A1B]/10 text-[#1A1A1B] hover:border-[#003893]'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 border-2 border-[#1A1A1B]/10 rounded-lg hover:border-[#003893] hover:text-[#003893] disabled:opacity-30 disabled:hover:border-[#1A1A1B]/10 disabled:hover:text-[#1A1A1B] transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[1000] flex items-start justify-center p-4 overflow-y-auto pt-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-[#1A1A1B]/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b-2 border-[#1A1A1B]/5 flex items-center justify-between bg-[#003893] text-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        {isEditMode ? <Edit size={20} /> : <Plus size={20} />}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
                                        <p className="text-white/60 text-xs uppercase tracking-widest leading-none mt-1">
                                            Pan Pacific Insights
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 overflow-y-auto space-y-8 flex-1 min-h-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left Column: Title and Content */}
                                    <div className="space-y-6 md:col-span-2 lg:col-span-1">
                                        <div>
                                            <label className="block text-sm font-bold text-[#1A1A1B] mb-2">Blog Title</label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 rounded-xl focus:border-[#003893] focus:ring-4 focus:ring-[#003893]/5 outline-none transition-all placeholder:text-[#1A1A1B]/30"
                                                placeholder="Mastering Logistics in 2026..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#1A1A1B] mb-2">Excerpt</label>
                                            <textarea
                                                value={formData.excerpt}
                                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 rounded-xl focus:border-[#003893] focus:ring-4 focus:ring-[#003893]/5 outline-none transition-all h-24 resize-none placeholder:text-[#1A1A1B]/30"
                                                placeholder="Brief summary of the article for the list view..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#1A1A1B] mb-2">Full Content (Markdown supported)</label>
                                            <textarea
                                                value={formData.content}
                                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 rounded-xl focus:border-[#003893] focus:ring-4 focus:ring-[#003893]/5 outline-none transition-all h-[500px] resize-y font-mono text-sm placeholder:text-[#1A1A1B]/30"
                                                placeholder="Write your article content here..."
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column: Metadata */}
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-[#1A1A1B] mb-2">Category</label>
                                                <select
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 rounded-xl focus:border-[#003893] outline-none bg-white cursor-pointer"
                                                >
                                                    {categories.map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-[#1A1A1B] mb-2">Read Time</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1B]/40" size={18} />
                                                    <input
                                                        type="text"
                                                        value={formData.readTime}
                                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 border-2 border-[#1A1A1B]/10 rounded-xl focus:border-[#003893] outline-none"
                                                        placeholder="5 min read"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-[#1A1A1B] mb-2">Author</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1B]/40" size={18} />
                                                <input
                                                    type="text"
                                                    value={formData.author}
                                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 border-2 border-[#1A1A1B]/10 rounded-xl focus:border-[#003893] outline-none"
                                                    placeholder="Author name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-[#1A1A1B] mb-2">Featured Image</label>
                                            <div className="space-y-4">
                                                {/* Image Preview */}
                                                {(imagePreview || formData.image) && (
                                                    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-[#1A1A1B]/5 group">
                                                        <img
                                                            src={imagePreview || (formData.image.startsWith('/') ? `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000'}${formData.image}` : formData.image)}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <button
                                                                onClick={() => {
                                                                    setFormData({ ...formData, image: '' });
                                                                    setImagePreview(null);
                                                                }}
                                                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                            >
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex gap-4">
                                                    <label className="flex-1 flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-[#1A1A1B]/10 rounded-xl hover:border-[#003893] hover:bg-[#003893]/5 cursor-pointer transition-all">
                                                        {uploadingImage ? (
                                                            <Loader2 className="animate-spin text-[#003893]" size={32} />
                                                        ) : (
                                                            <Plus className="text-[#1A1A1B]/30" size={32} />
                                                        )}
                                                        <span className="mt-2 text-sm font-bold text-[#1A1A1B]/60">
                                                            {uploadingImage ? 'Uploading...' : 'Upload Image'}
                                                        </span>
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            disabled={uploadingImage}
                                                        />
                                                    </label>
                                                    <div className="flex-1">
                                                        <label className="block text-xs font-bold text-[#1A1A1B]/40 mb-1 uppercase tracking-wider">Or Image URL</label>
                                                        <div className="relative">
                                                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1B]/40" size={18} />
                                                            <input
                                                                type="text"
                                                                value={formData.image}
                                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                                className="w-full pl-10 pr-4 py-3 border-2 border-[#1A1A1B]/10 rounded-xl focus:border-[#003893] outline-none text-sm"
                                                                placeholder="Paste URL or keyword..."
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-[#1A1A1B] mb-2">Tags (Comma separated)</label>
                                            <div className="relative">
                                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1B]/40" size={18} />
                                                <input
                                                    type="text"
                                                    value={formData.tags}
                                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 border-2 border-[#1A1A1B]/10 rounded-xl focus:border-[#003893] outline-none"
                                                    placeholder="logistics, shipping, Nepal"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-6 bg-[#F5F7F8] rounded-xl space-y-4">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.featured}
                                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-12 h-6 bg-[#1A1A1B]/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD700]"></div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Star size={18} className={formData.featured ? 'text-[#FFD700]' : 'text-[#1A1A1B]/30'} fill={formData.featured ? 'currentColor' : 'none'} />
                                                    <span className="text-sm font-bold text-[#1A1A1B]">Featured Post (Promote to top)</span>
                                                </div>
                                            </label>

                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.published}
                                                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-12 h-6 bg-[#1A1A1B]/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle size={18} className={formData.published ? 'text-green-500' : 'text-[#1A1A1B]/30'} />
                                                    <span className="text-sm font-bold text-[#1A1A1B]">Publish Immediately</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t-2 border-[#1A1A1B]/5 flex items-center justify-end gap-3 bg-[#F5F7F8]/50">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 border-2 border-[#1A1A1B]/10 text-[#1A1A1B] font-bold rounded-xl hover:bg-[#1A1A1B]/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveBlog}
                                    disabled={isSubmitting || !formData.title || !formData.content}
                                    className="px-8 py-3 bg-[#003893] text-white font-bold rounded-xl hover:bg-[#002a6b] disabled:bg-[#003893]/50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            {isEditMode ? 'Update Blog' : 'Create Blog'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
