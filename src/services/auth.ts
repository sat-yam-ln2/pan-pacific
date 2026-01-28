// Authentication Service for Pan Pacific Admin Panel
import { post, get } from './api';

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: string;
    lastLogin?: string;
}

export interface LoginResponse {
    token: string;
    admin: AdminUser;
}

export interface AuthResult {
    success: boolean;
    message?: string;
    data?: LoginResponse;
}

const TOKEN_KEY = 'adminToken';
const USER_KEY = 'adminUser';

// Login with email and password
export async function login(email: string, password: string): Promise<AuthResult> {
    const result = await post<LoginResponse>('/admin/login', { email, password }, false);

    if (result.success && result.data) {
        // Store token and user info
        localStorage.setItem(TOKEN_KEY, result.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(result.data.admin));
    }

    return result as AuthResult;
}

// Logout - clear stored credentials
export async function logout(): Promise<{ success: boolean }> {
    try {
        await post('/admin/logout', {}, true);
    } catch (error) {
        // Continue with logout even if API call fails
        console.log('Logout API call failed, clearing local storage anyway');
    }

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    return { success: true };
}

// Verify if current token is valid
export async function verifyToken(): Promise<{ success: boolean; admin?: AdminUser }> {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
        return { success: false };
    }

    const result = await get<{ admin: AdminUser }>('/admin/verify-token', true);

    if (result.success && result.data) {
        return { success: true, admin: result.data.admin };
    }

    // Token invalid - clear storage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    return { success: false };
}

// Get stored admin user
export function getStoredUser(): AdminUser | null {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
        try {
            return JSON.parse(userJson);
        } catch {
            return null;
        }
    }
    return null;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
}

// Get auth token
export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}
