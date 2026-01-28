import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as adminService from '../../services/admin';
import {
  Users,
  UserPlus,
  Search,
  Edit,
  Trash2,
  Shield,
  ShieldCheck,
  ShieldOff,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  Eye,
  EyeOff,
  X,
  Save,
  Loader2,
  Lock,
  Unlock
} from 'lucide-react';

interface AdminManagementProps {
  admins: adminService.AdminUser[];
  onUpdateAdmins: (admins: adminService.AdminUser[]) => void;
  onRefresh?: () => void;
}

const roleColors = {
  'super-admin': 'bg-[#DC143C] text-white border-[#DC143C]',
  'admin': 'bg-[#003893] text-white border-[#003893]',
  'manager': 'bg-purple-600 text-white border-purple-600',
  'staff': 'bg-gray-600 text-white border-gray-600'
};

const statusColors = {
  'active': 'bg-green-100 text-green-800 border-green-300',
  'inactive': 'bg-gray-100 text-gray-800 border-gray-300',
  'suspended': 'bg-red-100 text-red-800 border-red-300'
};

export function AdminManagement({ admins, onUpdateAdmins, onRefresh }: AdminManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<adminService.AdminUser | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'staff' as adminService.AdminUser['role'],
    password: '',
    confirmPassword: ''
  });

  // Filter admins
  const filteredAdmins = useMemo(() => {
    let filtered = [...admins];

    if (searchQuery) {
      filtered = filtered.filter(admin =>
        admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (admin.phone && admin.phone.includes(searchQuery))
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(admin => admin.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(admin => admin.status === statusFilter);
    }

    return filtered;
  }, [admins, searchQuery, roleFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = admins.length;
    const active = admins.filter(a => a.status === 'active').length;
    const superAdmins = admins.filter(a => a.role === 'super-admin').length;
    const suspended = admins.filter(a => a.status === 'suspended').length;

    return { total, active, superAdmins, suspended };
  }, [admins]);

  // Handlers
  const handleCreateAdmin = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'staff',
      password: '',
      confirmPassword: ''
    });
    setSelectedAdmin(null);
    setError('');
    setShowCreateModal(true);
  };

  const handleEditAdmin = (admin: adminService.AdminUser) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone || '',
      role: admin.role,
      password: '',
      confirmPassword: ''
    });
    setError('');
    setShowEditModal(true);
  };

  const handleSaveAdmin = async () => {
    setError('');

    // Validation
    if (!formData.name || !formData.email) {
      setError('Name and Email are required.');
      return;
    }

    if (!showEditModal) {
      if (!formData.password) {
        setError('Password is required for new users.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (selectedAdmin) {
        // Edit existing admin
        const updateData: Partial<adminService.AdminUser> = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role
        };

        const result = await adminService.updateAdmin(selectedAdmin.id, updateData);
        if (result.success) {
          if (onRefresh) onRefresh();
          setShowEditModal(false);
        } else {
          setError('Failed to update admin.');
        }
      } else {
        // Create new admin
        const result = await adminService.createAdmin({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          password: formData.password
        });

        if (result.success) {
          if (onRefresh) onRefresh();
          setShowCreateModal(false);
        } else {
          setError(result.message || 'Failed to create admin.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    const admin = admins.find(a => a.id === id);
    if (admin?.role === 'super-admin') {
      alert('Cannot delete super admin accounts');
      return;
    }
    if (window.confirm('Are you sure you want to delete this admin user?')) {
      try {
        const result = await adminService.deleteAdmin(id);
        if (result.success) {
          if (onRefresh) onRefresh();
        } else {
          alert('Failed to delete admin: ' + result.message);
        }
      } catch (err) {
        alert('Error deleting admin');
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const result = await adminService.updateAdmin(id, { status: newStatus as any });
      if (result.success) {
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super-admin': return ShieldCheck;
      case 'admin': return Shield;
      case 'manager': return ShieldOff;
      default: return Users;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#1A1A1B]">Admin Management</h2>
          <p className="text-[#1A1A1B]/60 mt-1">
            Manage administrator accounts and permissions
          </p>
        </div>
        <button
          onClick={handleCreateAdmin}
          className="px-4 py-2 bg-[#003893] hover:bg-[#002a6b] text-white rounded-lg transition-colors flex items-center gap-2 font-semibold"
        >
          <UserPlus size={18} />
          Add New Admin
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#003893]/10 rounded-lg flex items-center justify-center">
              <Users className="text-[#003893]" size={24} />
            </div>
            <span className="text-3xl font-bold text-[#1A1A1B]">{stats.total}</span>
          </div>
          <h3 className="text-sm font-semibold text-[#1A1A1B]/60">Total Admins</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="text-green-600" size={24} />
            </div>
            <span className="text-3xl font-bold text-[#1A1A1B]">{stats.active}</span>
          </div>
          <h3 className="text-sm font-semibold text-[#1A1A1B]/60">Active Users</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#DC143C]/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-[#DC143C]" size={24} />
            </div>
            <span className="text-3xl font-bold text-[#1A1A1B]">{stats.superAdmins}</span>
          </div>
          <h3 className="text-sm font-semibold text-[#1A1A1B]/60">Super Admins</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <UserX className="text-red-600" size={24} />
            </div>
            <span className="text-3xl font-bold text-[#1A1A1B]">{stats.suspended}</span>
          </div>
          <h3 className="text-sm font-semibold text-[#1A1A1B]/60">Suspended</h3>
        </motion.div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1B]/40" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
          >
            <option value="all">All Roles</option>
            <option value="super-admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Admins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdmins.length > 0 ? (
          filteredAdmins.map((admin, index) => {
            const RoleIcon = getRoleIcon(admin.role);
            return (
              <motion.div
                key={admin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#003893] to-[#002a6b] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {admin.avatar || 'U'}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A1B]">{admin.name}</h3>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${roleColors[admin.role]}`}>
                        {admin.role.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <RoleIcon className="text-[#FFD700]" size={24} />
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#1A1A1B]/70">
                    <Mail size={16} className="text-[#003893]" />
                    <span className="truncate">{admin.email}</span>
                  </div>
                  {admin.phone && (
                    <div className="flex items-center gap-2 text-sm text-[#1A1A1B]/70">
                      <Phone size={16} className="text-[#003893]" />
                      <span>{admin.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-[#1A1A1B]/70">
                    <Calendar size={16} className="text-[#003893]" />
                    <span>Last login: {admin.lastLogin}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border-2 ${statusColors[admin.status]}`}>
                    {admin.status.toUpperCase()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-[#1A1A1B]/10">
                  <button
                    onClick={() => handleEditAdmin(admin)}
                    className="flex-1 px-3 py-2 bg-[#003893] hover:bg-[#002a6b] text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(admin.id, admin.status)}
                    className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-semibold ${admin.status === 'active'
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    disabled={admin.role === 'super-admin'}
                  >
                    {admin.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                    {admin.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                  {admin.role !== 'super-admin' && (
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="px-3 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-xl border-2 border-[#1A1A1B]/10 p-12 text-center">
            <Users className="mx-auto text-[#1A1A1B]/20 mb-4" size={64} />
            <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">No admins found</h3>
            <p className="text-[#1A1A1B]/60">Try adjusting your filters or create a new admin</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(showCreateModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6 border-b-2 border-[#1A1A1B]/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#1A1A1B]">
                  {showEditModal ? 'Edit Admin User' : 'Create New Admin'}
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                  }}
                  className="p-2 hover:bg-[#F5F7F8] rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                    placeholder="email@pslnepal.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                    placeholder="+977 XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as adminService.AdminUser['role'] })}
                    className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                  >
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                </div>

                {!showEditModal && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1B]/40 hover:text-[#1A1A1B]"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1B] mb-2">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-[#1A1A1B]/20 rounded-lg focus:outline-none focus:border-[#003893]"
                        placeholder="Confirm password"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="p-6 border-t-2 border-[#1A1A1B]/10 flex gap-3">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                  }}
                  className="flex-1 px-4 py-2 border-2 border-[#1A1A1B]/20 text-[#1A1A1B] hover:bg-[#F5F7F8] rounded-lg transition-colors font-semibold"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAdmin}
                  className="flex-1 px-4 py-2 bg-[#003893] hover:bg-[#002a6b] text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {showEditModal ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
