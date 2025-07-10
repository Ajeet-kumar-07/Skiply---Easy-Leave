import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../assets/css/StudentDashboards.module.css';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('studentInfo');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      window.location.href = '/student/login';
    }
  }, []);

  if (!user) return null;

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Welcome, {user.name} 👋</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Department:</strong> {user.department}</p>
      <p><strong>Year:</strong> {user.year}</p>

      <div className={styles.grid}>
        <motion.a
          href="/student/apply"
          className={styles.card}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          ✍️ Apply Leave
        </motion.a>
        <motion.a
          href="/student/status"
          className={styles.card}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          📄 Leave Status
        </motion.a>
      </div>

      <motion.button
        onClick={() => {
          localStorage.removeItem('studentToken');
          localStorage.removeItem('studentInfo');
          window.location.href = '/student/login';
        }}
        className={styles.motionBtn}
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        🚪 Logout
      </motion.button>
    </motion.div>
  );
};

export default StudentDashboard;
