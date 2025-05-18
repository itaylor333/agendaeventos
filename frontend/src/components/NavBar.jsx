import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();           // chama função do contexto
    navigate('/login'); // redireciona
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {!user && <Link to="/login">Login</Link>}
      {user?.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}