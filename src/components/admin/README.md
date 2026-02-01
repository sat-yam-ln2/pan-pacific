# Pan Pacific Admin Panel

A comprehensive admin panel for managing shipments, data, and administrative users for Pan Pacific Shipping & Logistics Services Pvt. Ltd.

## Components Overview

### UnifiedAdminPanel.tsx
Main admin wrapper component that handles:
- Authentication (login/logout)
- Routing between admin sections
- Shared state management for shipments
- Admin user session

**Route:** `/admin/*`

**Login Credentials:**
- Email: `admin@pslnepal.com`
- Password: `admin123`

### AdminNav.tsx
Navigation component featuring:
- Top header with admin user info and logout
- Desktop sidebar navigation
- Mobile responsive menu
- Breadcrumb navigation

**Navigation Links:**
- Dashboard (`/admin`)
- Order Management (`/admin/orders`)
- Data Tools (`/admin/data-tools`)
- Admin Management (`/admin/users`)

### AdminDashboard.tsx
Main dashboard with:
- Statistics cards (Total, Active, Delivered, Pending shipments, Revenue)
- Monthly shipment trends chart
- Service type distribution (pie chart)
- Top destinations
- Recent activity feed

### OrderManagement.tsx
Shipment/order management featuring:
- Searchable and filterable shipments table
- Status and service type filters
- Create, edit, view, and delete shipments
- CSV export functionality
- Pagination
- Real-time updates

### DataTools.tsx
Data import/export utilities:
- Import from JSON/CSV files
- Export to JSON/CSV formats
- Create full backups
- Database statistics
- Reset to sample data
- Clear all data

### AdminManagement.tsx
Admin user management with:
- Admin user cards with role-based badges
- Create/edit admin users
- Role assignment (Super Admin, Admin, Manager, Staff)
- User status management (Active, Inactive, Suspended)
- Permission management
- Search and filter by role/status
- Super Admin protection (cannot delete)

**Default Admin Users:**
- Manoj Thapa (Super Admin)
- Admin User (Admin)
- Sita Shrestha (Manager)
- Ram Gurung (Staff)
- Kabita Rai (Staff - Inactive)

## Color Theme

All components follow the Pan Pacific brand colors:

- **Pacific Navy** (`#003893`) - Primary color, buttons, headers
- **Nepal Crimson** (`#DC143C`) - Accent color, super admin badges
- **Himalayan Mist** (`#F5F7F8`) - Backgrounds, cards
- **Slate Charcoal** (`#1A1A1B`) - Text, headings
- **Golden Sun** (`#FFD700`) - Highlights, special elements

## Features

✅ Fully responsive design (mobile, tablet, desktop)
✅ Consistent UI across all pages
✅ Real-time data updates
✅ Role-based access control
✅ Data import/export capabilities
✅ Advanced filtering and search
✅ Beautiful charts and visualizations
✅ Motion animations with Framer Motion
✅ Authentication system
✅ CRUD operations for all entities

## Usage

### Accessing the Admin Panel

Navigate to `/admin` in your browser. You'll be presented with the login screen.

### Navigation

- Use the sidebar (desktop) or hamburger menu (mobile) to navigate between sections
- Click on any navigation item to switch views
- Your session persists across page navigation

### Managing Shipments

1. Go to **Order Management**
2. Use search and filters to find specific shipments
3. Click **Add New Shipment** to create orders
4. Use action buttons (View, Edit, Delete) on each row
5. Export data using the **Export CSV** button

### Managing Admins

1. Go to **Admin Management**
2. View all admin users with their roles and status
3. Click **Add New Admin** to create new users
4. Edit existing admins or toggle their status
5. Super Admins cannot be deleted (protected)

### Data Tools

1. Go to **Data Tools**
2. Upload JSON/CSV files to import data
3. Export in various formats
4. Create backups for safekeeping
5. Reset to sample data or clear all data

## Technical Stack

- **React** - UI framework
- **React Router** - Navigation
- **Motion (Framer Motion)** - Animations
- **Recharts** - Charts and graphs
- **Lucide React** - Icons
- **Tailwind CSS** - Styling

## File Structure

```
/components/admin/
├── UnifiedAdminPanel.tsx    # Main admin wrapper
├── AdminNav.tsx             # Navigation component
├── AdminDashboard.tsx       # Dashboard with stats
├── OrderManagement.tsx      # Shipment CRUD
├── DataTools.tsx            # Import/Export tools
├── AdminManagement.tsx      # Admin user management
└── README.md               # This file
```

## Future Enhancements

- [ ] Real database integration (Supabase/Firebase)
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] PDF invoice generation
- [ ] Real-time tracking updates
- [ ] Multi-language support
- [ ] Audit logs
- [ ] Two-factor authentication
