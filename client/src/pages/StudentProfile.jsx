import React, { useEffect, useState } from 'react';
import styles from './StudentProfile.module.css';
import defaultPic from '../assets/avatar.webp';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: '', department: '', year: '' });

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        if (!token) {
          setError('You are not logged in.');
          return;
        }

        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Failed to fetch student profile');
          return;
        }

        setStudent({ ...data.user, isVerified: true, isOnline: true });
        setForm({
          name: data.user.name,
          department: data.user.department,
          year: data.user.year
        });
      } catch (err) {
        setError('Server error. Please try again.');
      }
    };

    fetchStudentProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('studentToken');
      const res = await fetch('/api/auth/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to update profile');
        return;
      }

      setStudent(prev => ({ ...prev, ...form }));
      setIsEditing(false);
    } catch (err) {
      setError('Server error while saving.');
    }
  };

  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  if (!student) return <p style={{ textAlign: 'center' }}>Loading profile...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={student.profileImage || defaultPic}
            alt="Profile"
            className={styles.avatar}
          />
          {student.isOnline && (
            <span style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              width: '12px',
              height: '12px',
              backgroundColor: 'limegreen',
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 0 0 0 limegreen',
              animation: 'pulse 1.5s infinite'
            }}></span>
          )}
        </div>

        <h2 className={styles.name}>
          {form.name}
          {student.isVerified && (
            <span title="Verified" style={{ marginLeft: '8px', color: 'dodgerblue' }}>✔️</span>
          )}
        </h2>

        <p className={styles.email}>{student.email}</p>

        <div className={styles.info}>
          {isEditing ? (
            <>
              <p><strong>Name:</strong> <input name="name" value={form.name} onChange={handleInputChange} /></p>
              <p><strong>Department:</strong> <input name="department" value={form.department} onChange={handleInputChange} /></p>
              <p><strong>Year:</strong> <input name="year" value={form.year} onChange={handleInputChange} /></p>
            </>
          ) : (
            <>
              <p><strong>Department:</strong> {form.department}</p>
              <p><strong>Year:</strong> {form.year}</p>
            </>
          )}
        </div>

        <div style={{ marginTop: '15px' }}>
          <button onClick={handleEditToggle} className={styles.editBtn}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          {isEditing && (
            <button onClick={handleSave} className={styles.saveBtn}>
              Save Changes
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 limegreen;
          }
          70% {
            transform: scale(1.1);
            box-shadow: 0 0 0 6px rgba(50, 205, 50, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(50, 205, 50, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default StudentProfile;
