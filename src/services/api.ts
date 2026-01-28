// API Configuration for Pan Pacific Shipping & Logistics
// Centralized API service with base URL configuration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
    return localStorage.getItem('adminToken');
};

// Helper function to build headers
const getHeaders = (includeAuth: boolean = true): HeadersInit => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

// Generic API response structure
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

// Generic API request handler
export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth: boolean = true
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...getHeaders(includeAuth),
                ...options.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || 'Request failed',
                error: data.error,
            };
        }

        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Network error',
        };
    }
}

// GET request helper
export async function get<T>(endpoint: string, includeAuth: boolean = true) {
    return apiRequest<T>(endpoint, { method: 'GET' }, includeAuth);
}

// POST request helper
export async function post<T>(endpoint: string, body: any, includeAuth: boolean = true) {
    return apiRequest<T>(
        endpoint,
        {
            method: 'POST',
            body: JSON.stringify(body),
        },
        includeAuth
    );
}

// PUT request helper
export async function put<T>(endpoint: string, body: any, includeAuth: boolean = true) {
    return apiRequest<T>(
        endpoint,
        {
            method: 'PUT',
            body: JSON.stringify(body),
        },
        includeAuth
    );
}

// DELETE request helper
export async function del<T>(endpoint: string, includeAuth: boolean = true) {
    return apiRequest<T>(endpoint, { method: 'DELETE' }, includeAuth);
}

export { API_BASE_URL, getAuthToken };
