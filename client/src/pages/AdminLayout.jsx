import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';


const handleLogout = () => {
  localStorage.removeItem('adminToken');
  window.location.href = '/admin/login';
};


const AdminLayout = () => {
  const { pathname } = useLocation();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <h2 style={logoStyle}>Admin Panel</h2>
        <nav style={navStyle}>
          <Link to="/admin/dashboard" style={getLinkStyle(pathname, '/admin/dashboard')}>Dashboard</Link>
          <Link to="/admin/students" style={getLinkStyle(pathname, '/admin/students')}>Student List</Link>
          <Link to="/admin/requests" style={getLinkStyle(pathname, '/admin/requests')}>Leave Requests</Link>
          <Link to="/admin/notices" style={getLinkStyle(pathname, '/admin/notices')}>Notices</Link>
          <Link to="/admin/testimonials" style={getLinkStyle(pathname, '/admin/testimonials')}>Testimonials</Link>
        </nav>
        <button onClick={handleLogout} style={logoutButton}>
            Logout
        </button>

      </aside>

      {/* Main Content */}
      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
};

const sidebarStyle = {
  width: '220px',
  background: '#5C6BC0',
  color: '#fff',
  padding: '30px 20px',
  boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '30px'
};

const navStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const getLinkStyle = (path, route) => ({
  color: path === route ? '#FFC107' : '#fff',
  fontWeight: path === route ? '600' : '400',
  textDecoration: 'none',
  padding: '8px 12px',
  borderRadius: '6px',
  backgroundColor: path === route ? '#ffffff22' : 'transparent',
  transition: 'all 0.3s ease'
});

const mainStyle = {
  flexGrow: 1,
  padding: '40px',
  backgroundColor: '#f5f5f5'
};

const logoutButton = {
  marginTop: '40px',
  padding: '10px 16px',
  backgroundColor: '#f44336',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};


export default AdminLayout;
