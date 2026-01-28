import { get, post, put, del } from './api';

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: 'super-admin' | 'admin' | 'manager' | 'staff';
    status: 'active' | 'inactive' | 'suspended';
    isActive?: boolean; // Backend uses isActive
    avatar?: string;
    createdDate?: string;
    lastLogin?: string;
    permissions?: string[];
}

export interface AdminListResponse {
    success: boolean;
    data: AdminUser[];
}

export interface AdminResponse {
    success: boolean;
    message?: string;
    data: AdminUser;
}

// Get all admins
export async function getAllAdmins() {
    return get<AdminListResponse>('/admin/users');
}

// Create new admin
export async function createAdmin(adminData: Partial<AdminUser> & { password?: string }) {
    return post<AdminResponse>('/admin/register', adminData);
}

// Update admin
export async function updateAdmin(id: string, updateData: Partial<AdminUser>) {
    // Map status back to isActive if needed by backend, though backend handles 'status' mapping in PUT
    return put<AdminResponse>(`/admin/users/${id}`, updateData);
}

// Delete admin
export async function deleteAdmin(id: string) {
    return del<{ success: boolean; message: string }>(`/admin/users/${id}`);
}

// Helper to map backend format to frontend format
export function mapAdminToFrontend(backendAdmin: any): AdminUser {
    return {
        id: backendAdmin._id || backendAdmin.id,
        name: backendAdmin.name,
        email: backendAdmin.email,
        phone: backendAdmin.phone || '',
        role: backendAdmin.role,
        status: backendAdmin.isActive ? 'active' : 'inactive', // Default mapping
        isActive: backendAdmin.isActive,
        avatar: backendAdmin.name ? backendAdmin.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U',
        createdDate: backendAdmin.createdAt ? new Date(backendAdmin.createdAt).toISOString().split('T')[0] : '',
        lastLogin: backendAdmin.lastLogin ? new Date(backendAdmin.lastLogin).toLocaleString() : 'Never',
        permissions: backendAdmin.role === 'super-admin' ? ['all'] : ['shipments']
    };
}
