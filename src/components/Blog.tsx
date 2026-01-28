import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router';
import { Footer } from './Footer';
import * as blogsService from '../services/blogs';

const categories = [
  'All',
  'Shipping Tips',
  'Industry News',
  'How-To Guides',
  'Documentation',
  'Customs & Regulations'
];

const POSTS_PER_PAGE = 9;

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<blogsService.BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const result = await blogsService.getAllBlogs(
          currentPage,
          POSTS_PER_PAGE,
          activeCategory === 'All' ? undefined : activeCategory
        );
        if (result.success && result.data) {
          setPosts(result.data || []);
          setTotalItems(result.pagination?.total || 0);
        }
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage, activeCategory]);

  const featuredPost = posts.find((post: blogsService.BlogPost) => post.featured);
  const regularPosts = featuredPost && activeCategory === 'All'
    ? posts.filter((post: blogsService.BlogPost) => post._id !== featuredPost._id)
    : posts;

  const totalPages = Math.ceil(totalItems / POSTS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen bg-[#F5F7F8]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#003893] to-[#002a6b] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[200px] pr-[32px] pb-[20px] pl-[32px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Logistics Insights & News
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Expert tips, industry updates, and comprehensive guides for international shipping
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && activeCategory === 'All' && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#F5F7F8] to-white rounded-2xl overflow-hidden border-2 border-[#1A1A1B]/10 hover:border-[#003893]/30 transition-all"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Featured Image */}
                  <div className="relative h-64 md:h-full min-h-[400px] bg-gradient-to-br from-[#003893] to-[#002a6b] flex items-center justify-center overflow-hidden">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-4 py-2 bg-[#DC143C] text-white text-sm font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                    {featuredPost.image.startsWith('/') || featuredPost.image.startsWith('http') ? (
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white/20 text-6xl font-bold text-center px-8">
                        {featuredPost.image}
                      </div>
                    )}
                  </div>

                  {/* Featured Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-[#FFD700]/20 text-[#1A1A1B] text-sm font-semibold rounded-full">
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1B] mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-[#1A1A1B]/70 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-[#1A1A1B]/60">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#003893] hover:bg-[#002a6b] text-white font-semibold rounded-lg transition-colors w-fit"
                    >
                      Read Full Article
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="bg-white border-y-2 border-[#1A1A1B]/10 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4 gap-3 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeCategory === category
                    ? 'bg-[#003893] text-white'
                    : 'bg-[#F5F7F8] text-[#1A1A1B] hover:bg-[#003893]/10'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Post Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-[#003893]/20 border-t-[#003893] rounded-full animate-spin"></div>
                <p className="mt-4 text-[#1A1A1B]/60 font-semibold text-lg">Loading amazing insights...</p>
              </div>
            ) : regularPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-[#1A1A1B]/60">
                  No posts found in this category
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post: blogsService.BlogPost, index: number) => (
                    <motion.article
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl overflow-hidden border-2 border-[#1A1A1B]/10 hover:border-[#003893]/30 transition-all group"
                    >
                      {/* Post Image */}
                      <div className="relative h-48 bg-gradient-to-br from-[#003893] to-[#002a6b] flex items-center justify-center overflow-hidden">
                        {post.image.startsWith('/') || post.image.startsWith('http') ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-white/20 text-4xl font-bold text-center px-4">
                            {post.image}
                          </div>
                        )}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-3 py-1 bg-[#FFD700] text-[#1A1A1B] text-xs font-semibold rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#1A1A1B] mb-3 group-hover:text-[#003893] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[#1A1A1B]/70 mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-col gap-2 mb-4 text-xs text-[#1A1A1B]/60">
                          <div className="flex items-center gap-2">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} />
                              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-[#003893] hover:text-[#002a6b] font-semibold transition-colors"
                        >
                          Read More
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg border-2 transition-all ${currentPage === 1
                        ? 'border-[#1A1A1B]/10 text-[#1A1A1B]/30 cursor-not-allowed'
                        : 'border-[#003893] text-[#003893] hover:bg-[#003893] hover:text-white'
                        }`}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${currentPage === page
                          ? 'bg-[#003893] text-white'
                          : 'bg-white border-2 border-[#1A1A1B]/10 text-[#1A1A1B] hover:border-[#003893]'
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg border-2 transition-all ${currentPage === totalPages
                        ? 'border-[#1A1A1B]/10 text-[#1A1A1B]/30 cursor-not-allowed'
                        : 'border-[#003893] text-[#003893] hover:bg-[#003893] hover:text-white'
                        }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}

                {/* Pagination Info */}
                {totalPages > 1 && (
                  <div className="mt-6 text-center text-sm text-[#1A1A1B]/60">
                    Showing {(currentPage - 1) * POSTS_PER_PAGE + 1}-{Math.min(currentPage * POSTS_PER_PAGE, totalItems)} of {totalItems} posts
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#003893] to-[#002a6b] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Ship Your Cargo?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Get a free quote or speak with our logistics experts today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="px-8 py-4 bg-[#DC143C] hover:bg-[#a00f2d] text-white font-semibold rounded-lg transition-colors"
              >
                Get Free Quote
              </Link>
              <Link
                to="/tracking"
                className="px-8 py-4 bg-white hover:bg-[#F5F7F8] text-[#003893] font-semibold rounded-lg transition-colors"
              >
                Track Shipment
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
