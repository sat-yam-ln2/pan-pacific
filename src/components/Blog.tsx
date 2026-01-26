import React, { useState } from 'react';
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

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Complete Guide to International Shipping from Nepal in 2026',
    excerpt: 'Everything you need to know about shipping cargo internationally from Nepal, including documentation, customs procedures, and cost-saving strategies for businesses and individuals.',
    category: 'How-To Guides',
    author: 'Tejman Tamang',
    date: 'January 10, 2026',
    readTime: '8 min read',
    image: 'cargo container',
    featured: true
  },
  {
    id: 2,
    title: 'FCL vs LCL Shipping: Which Service is Right for Your Business?',
    excerpt: 'Learn the key differences between Full Container Load and Less than Container Load shipping to make the best decision for your cargo volume and budget.',
    category: 'Shipping Tips',
    author: 'Manoj Thapa',
    date: 'January 8, 2026',
    readTime: '6 min read',
    image: 'shipping containers'
  },
  {
    id: 3,
    title: 'New Customs Regulations for Nepal Imports in 2026',
    excerpt: 'Stay compliant with the latest customs regulations and documentation requirements for importing goods into Nepal, effective January 2026.',
    category: 'Customs & Regulations',
    author: 'Priya Sharma',
    date: 'January 5, 2026',
    readTime: '5 min read',
    image: 'customs office'
  },
  {
    id: 4,
    title: 'How to Calculate Volumetric Weight for Air Freight',
    excerpt: 'Master the art of calculating dimensional weight for air shipments to avoid unexpected costs and optimize your shipping expenses.',
    category: 'How-To Guides',
    author: 'Rajesh Kumar',
    date: 'January 3, 2026',
    readTime: '4 min read',
    image: 'air cargo'
  },
  {
    id: 5,
    title: 'Top 5 Packing Tips for Fragile International Shipments',
    excerpt: 'Protect your valuable and delicate items during international transit with these professional packing techniques used by logistics experts.',
    category: 'Shipping Tips',
    author: 'Sita Gurung',
    date: 'December 28, 2025',
    readTime: '7 min read',
    image: 'packing materials'
  },
  {
    id: 6,
    title: 'Understanding Incoterms: DDP vs DDU Explained',
    excerpt: 'A comprehensive breakdown of Delivered Duty Paid and Delivered Duty Unpaid terms to help you choose the right shipping arrangement.',
    category: 'Documentation',
    author: 'Manoj Thapa',
    date: 'December 25, 2025',
    readTime: '6 min read',
    image: 'business document'
  },
  {
    id: 7,
    title: 'Nepal-China Trade Corridor: Opportunities for Logistics Growth',
    excerpt: 'Explore the expanding trade relationship between Nepal and China and how it\'s creating new opportunities for freight forwarding businesses.',
    category: 'Industry News',
    author: 'Anil Rai',
    date: 'December 22, 2025',
    readTime: '9 min read',
    image: 'himalayan road'
  },
  {
    id: 8,
    title: 'Required Documents for Sea Freight Export from Nepal',
    excerpt: 'Complete checklist of essential documentation needed for smooth sea freight exports, including Bill of Lading, Commercial Invoice, and certificates.',
    category: 'Documentation',
    author: 'Tejman Tamang',
    date: 'December 20, 2025',
    readTime: '5 min read',
    image: 'shipping documents'
  },
  {
    id: 9,
    title: 'Break Bulk Cargo: Handling Oversized Shipments Successfully',
    excerpt: 'Learn best practices for shipping machinery, equipment, and other oversized cargo that won\'t fit in standard containers.',
    category: 'How-To Guides',
    author: 'Deepak Thakur',
    date: 'December 18, 2025',
    readTime: '8 min read',
    image: 'heavy machinery'
  },
  {
    id: 10,
    title: 'How to Choose the Right Freight Insurance Coverage',
    excerpt: 'Protect your cargo investment with the right insurance policy. This guide covers coverage types, costs, and claim procedures.',
    category: 'Shipping Tips',
    author: 'Priya Sharma',
    date: 'December 15, 2025',
    readTime: '6 min read',
    image: 'insurance document'
  },
  {
    id: 11,
    title: 'Import Duty Calculator: Understanding Nepal\'s Tariff Structure',
    excerpt: 'Navigate Nepal\'s customs duty system with confidence. Learn how import duties are calculated and strategies to minimize costs.',
    category: 'Customs & Regulations',
    author: 'Rajesh Kumar',
    date: 'December 12, 2025',
    readTime: '7 min read',
    image: 'calculator finance'
  },
  {
    id: 12,
    title: 'Sustainable Shipping: Eco-Friendly Logistics Solutions',
    excerpt: 'Discover how Pan Pacific is reducing carbon emissions through optimized routing, consolidated shipments, and green logistics practices.',
    category: 'Industry News',
    author: 'Sita Gurung',
    date: 'December 10, 2025',
    readTime: '5 min read',
    image: 'green environment'
  },
  {
    id: 13,
    title: 'Air Freight vs Sea Freight: Cost and Time Comparison',
    excerpt: 'Make informed shipping decisions by understanding the trade-offs between speed and cost for different freight methods.',
    category: 'Shipping Tips',
    author: 'Manoj Thapa',
    date: 'December 8, 2025',
    readTime: '6 min read',
    image: 'airplane ship'
  },
  {
    id: 14,
    title: 'Certificate of Origin: When and How to Obtain It',
    excerpt: 'Essential guide to obtaining a Certificate of Origin for your exports, including requirements for different destination countries.',
    category: 'Documentation',
    author: 'Anil Rai',
    date: 'December 5, 2025',
    readTime: '4 min read',
    image: 'official certificate'
  },
  {
    id: 15,
    title: 'Prohibited and Restricted Items for International Shipping',
    excerpt: 'Comprehensive list of items that cannot be shipped internationally or require special permits and documentation.',
    category: 'Customs & Regulations',
    author: 'Tejman Tamang',
    date: 'December 3, 2025',
    readTime: '8 min read',
    image: 'warning sign'
  },
  {
    id: 16,
    title: 'The Future of Logistics: Technology Trends Shaping 2026',
    excerpt: 'Explore emerging technologies like blockchain, AI tracking, and automated warehousing transforming the logistics industry.',
    category: 'Industry News',
    author: 'Deepak Thakur',
    date: 'December 1, 2025',
    readTime: '10 min read',
    image: 'technology digital'
  }
];

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

  const filteredPosts = blogPosts.filter(post => 
    activeCategory === 'All' || post.category === activeCategory
  );

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = regularPosts.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
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
                  <div className="relative h-64 md:h-full min-h-[400px] bg-gradient-to-br from-[#003893] to-[#002a6b] flex items-center justify-center">
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-[#DC143C] text-white text-sm font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="text-white/20 text-6xl font-bold text-center px-8">
                      {featuredPost.image}
                    </div>
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
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>

                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#003893] hover:bg-[#002a6b] text-white font-semibold rounded-lg transition-colors w-fit">
                      Read Full Article
                      <ArrowRight size={18} />
                    </button>
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
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeCategory === category
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
            {currentPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-[#1A1A1B]/60">
                  No posts found in this category
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl overflow-hidden border-2 border-[#1A1A1B]/10 hover:border-[#003893]/30 transition-all group"
                    >
                      {/* Post Image */}
                      <div className="relative h-48 bg-gradient-to-br from-[#003893] to-[#002a6b] flex items-center justify-center overflow-hidden">
                        <div className="text-white/20 text-4xl font-bold text-center px-4">
                          {post.image}
                        </div>
                        <div className="absolute top-3 left-3">
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
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>

                        <button className="inline-flex items-center gap-2 text-[#003893] hover:text-[#002a6b] font-semibold transition-colors">
                          Read More
                          <ArrowRight size={16} />
                        </button>
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
                      className={`p-2 rounded-lg border-2 transition-all ${
                        currentPage === 1
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
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          currentPage === page
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
                      className={`p-2 rounded-lg border-2 transition-all ${
                        currentPage === totalPages
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
                    Showing {startIndex + 1}-{Math.min(endIndex, regularPosts.length)} of {regularPosts.length} posts
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
