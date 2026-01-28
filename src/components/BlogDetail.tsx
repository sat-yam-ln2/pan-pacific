import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import * as blogsService from '../services/blogs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Footer } from './Footer';

export function BlogDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<blogsService.BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!slug) return;

            setIsLoading(true);
            try {
                const result = await blogsService.getBlogBySlug(slug);
                if (result.success && result.data) {
                    setBlog(result.data);
                } else {
                    setError('Blog post not found');
                }
            } catch (err) {
                console.error('Failed to fetch blog:', err);
                setError('Failed to load blog post');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F5F7F8] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#003893]/20 border-t-[#003893] rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-[#1A1A1B]/60 font-semibold text-lg">Loading article...</p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <>
                <div className="min-h-screen bg-[#F5F7F8] flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto px-4">
                        <h1 className="text-4xl font-bold text-[#1A1A1B] mb-4">Blog Not Found</h1>
                        <p className="text-[#1A1A1B]/60 mb-8">{error || 'The blog post you\'re looking for doesn\'t exist.'}</p>
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#003893] text-white font-semibold rounded-lg hover:bg-[#002a6b] transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Blog
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-[#F5F7F8]">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-[#003893] to-[#002a6b] text-white py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-[200px] pb-[20px]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                            >
                                <ArrowLeft size={20} />
                                Back to Blog
                            </Link>

                            <div className="mb-4">
                                <span className="px-3 py-1 bg-[#FFD700] text-[#1A1A1B] text-sm font-semibold rounded-full">
                                    {blog.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>{blog.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{blog.readTime}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Image */}
                {blog.image && (blog.image.startsWith('/') || blog.image.startsWith('http')) && (
                    <section className="bg-white">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="rounded-2xl overflow-hidden border-2 border-[#1A1A1B]/10"
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-auto object-cover"
                                />
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Article Content */}
                <section className="py-12 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="max-w-none"
                        >
                            <div className="text-[#1A1A1B] leading-relaxed text-justify">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        p: ({ children }) => (
                                            <p className="mb-6 text-justify leading-relaxed">
                                                {children}
                                            </p>
                                        ),
                                        h2: ({ children }) => (
                                            <h2 className="text-2xl font-bold text-[#003893] mt-10 mb-4">
                                                {children}
                                            </h2>
                                        ),
                                        h3: ({ children }) => (
                                            <h3 className="text-xl font-bold text-[#003893] mt-8 mb-3">
                                                {children}
                                            </h3>
                                        ),
                                        ul: ({ children }) => (
                                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                                {children}
                                            </ul>
                                        ),
                                        ol: ({ children }) => (
                                            <ol className="list-decimal pl-6 mb-6 space-y-2">
                                                {children}
                                            </ol>
                                        ),
                                        li: ({ children }) => (
                                            <li className="leading-relaxed">
                                                {children}
                                            </li>
                                        ),
                                    }}
                                >
                                    {blog.content}
                                </ReactMarkdown>
                            </div>
                        </motion.article>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mt-12 pt-8 border-t-2 border-[#1A1A1B]/10"
                            >
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Tag size={20} className="text-[#003893]" />
                                    {blog.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-[#F5F7F8] text-[#1A1A1B] text-sm font-semibold rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Back to Blog Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-12 text-center"
                        >
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#003893] text-white font-semibold rounded-lg hover:bg-[#002a6b] transition-colors"
                            >
                                <ArrowLeft size={20} />
                                Back to All Articles
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
