// src/components/AdminHome.jsx
import React from 'react';

const AdminHome = () => {
  const username = localStorage.getItem('username'); // Assuming the username is stored in localStorage during login

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>This is your admin dashboard.</p>
    </div>
  );
};

export default AdminHome;
