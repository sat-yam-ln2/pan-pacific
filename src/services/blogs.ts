// Blog Service for Pan Pacific Admin Panel
import { get, post, put, del, ApiResponse } from './api';

export interface BlogPost {
    _id?: string;
    id?: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: string;
    author: string;
    tags: string[];
    image: string;
    readTime: string;
    featured: boolean;
    published: boolean;
    publishedAt: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface BlogListResponse {
    success: boolean;
    data: BlogPost[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

// Get all blogs with pagination and filtering
export async function getAllBlogs(page: number = 1, limit: number = 9, category?: string, search?: string) {
    let url = `/blogs?page=${page}&limit=${limit}`;
    if (category && category !== 'All') url += `&category=${category}`;
    if (search) url += `&search=${search}`;
    return get<BlogPost[]>(url, false); // false because public blogs don't need auth
}

// Get single blog by slug
export async function getBlogBySlug(slug: string) {
    return get<BlogPost>(`/blogs/${slug}`, false);
}

// Admin Create Blog
export async function createBlog(blogData: Partial<BlogPost>) {
    return post<{ success: boolean; data: BlogPost }>('/blogs', blogData);
}

// Admin Update Blog
export async function updateBlog(id: string, blogData: Partial<BlogPost>) {
    return put<{ success: boolean; data: BlogPost }>(`/blogs/${id}`, blogData);
}

// Admin Delete Blog
export async function deleteBlog(id: string) {
    return del<{ success: boolean; message: string }>(`/blogs/${id}`);
}

// Upload image for blog post
export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const response = await fetch(`${apiBaseUrl}/blogs/upload`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
    });

    const result = await response.json();
    return result as ApiResponse<{ imageUrl: string }>;
}
