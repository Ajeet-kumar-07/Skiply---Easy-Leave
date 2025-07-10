import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import StudentAvatar from './StudentAvatar';

const Navbar = () => {
  const [studentOpen, setStudentOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const studentRef = useRef(null);
  const adminRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (studentRef.current && !studentRef.current.contains(e.target)) {
        setStudentOpen(false);
      }
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setAdminOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>Skiply</Link>
      <div className={styles.links}>
        <StudentAvatar />

        {/* Student Dropdown */}
        <div className={styles.dropdownWrapper} ref={studentRef}>
          <span className={styles.dropdownTrigger}>
            <span
              onClick={() => navigate('/student/dashboard')}
              style={{ marginRight: '6px', cursor: 'pointer' }}
            >
              Student
            </span>
            <span
              onClick={() => setStudentOpen(prev => !prev)}
              style={{
                cursor: 'pointer',
                fontSize: '20px',
                display: 'inline-block',
                transform: studentOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            >
              ▾
            </span>
          </span>
          {studentOpen && (
            <div className={styles.dropdown}>
              <Link to="/student/login" onClick={() => setStudentOpen(false)}>Login</Link>
              <Link to="/student/register" onClick={() => setStudentOpen(false)}>Register</Link>
              <Link to="/student/profile" onClick={() => setStudentOpen(false)}>Profile</Link>
              <Link to="/student/status" onClick={() => setStudentOpen(false)}>Leave Status</Link>
              <Link to="/student/leave-history" onClick={() => setStudentOpen(false)}>Leave History</Link>
            </div>
          )}
        </div>

        {/* Admin Dropdown */}
        <div className={styles.dropdownWrapper} ref={adminRef}>
          <span className={styles.dropdownTrigger}>
            <span
              onClick={() => navigate('/admin/dashboard')}
              style={{ marginRight: '6px', cursor: 'pointer' }}
            >
              Admin
            </span>
            <span
              onClick={() => setAdminOpen(prev => !prev)}
              style={{
                cursor: 'pointer',
                fontSize: '20px',
                display: 'inline-block',
                transform: adminOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            >
              ▾
            </span>
          </span>
          {adminOpen && (
            <div className={styles.dropdown}>
              <Link to="/admin/login" onClick={() => setAdminOpen(false)}>Login</Link>
              <Link to="/admin/register" onClick={() => setAdminOpen(false)}>Register</Link>
              <Link to="/admin/dashboard" onClick={() => setAdminOpen(false)}>Dashboard</Link>
              <Link to="/admin/students" onClick={() => setAdminOpen(false)}>Student List</Link>
              <Link to="/admin/requests" onClick={() => setAdminOpen(false)}>Leave Requests</Link>
              <Link to="/admin/notices" onClick={() => setAdminOpen(false)}>Notices</Link>
              <Link to="/admin/testimonials" onClick={() => setAdminOpen(false)}>Testimonials</Link>
              <Link to="/admin/logout" onClick={() => setAdminOpen(false)}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
