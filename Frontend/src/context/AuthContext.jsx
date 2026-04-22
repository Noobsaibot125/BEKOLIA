import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bekolia_token');
    const email = localStorage.getItem('bekolia_admin_email');
    if (token) {
      setIsAuthenticated(true);
      setAdminEmail(email || '');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('bekolia_token', res.data.token);
    localStorage.setItem('bekolia_admin_email', res.data.email);
    setIsAuthenticated(true);
    setAdminEmail(res.data.email);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('bekolia_token');
    localStorage.removeItem('bekolia_admin_email');
    setIsAuthenticated(false);
    setAdminEmail('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminEmail, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
