import { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { User, UserRole, AuthState } from '../types/auth';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      const response = await fetch('https://gk72ytx1i3.execute-api.ap-south-1.amazonaws.com/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.error('Login failed with status:', response.status);
        return false;
      }

      const data = await response.json();
      console.log('Login API Response:', data);

      // Corrected structure based on your API response
      if (data?.message === 'Login successful' && data?.user?.token) {
  // ✅ Store all fields exactly as received from API
  sessionStorage.setItem('admin_email', data.user.email);
  sessionStorage.setItem('admin_name', data.user.name);
  sessionStorage.setItem('admin_role', data.user.role);
  sessionStorage.setItem('admin_status', data.user.status);
  sessionStorage.setItem('admin_joinDate', data.user.joinDate);
  sessionStorage.setItem('admin_lastLogin', data.user.lastLogin);
  sessionStorage.setItem('drone_auth_token', data.user.token);

  // ✅ Optionally, store entire user object as JSON
  sessionStorage.setItem('drone_auth_user', JSON.stringify(data.user));

  setUser({
    id: `${role}-1`, // you can keep this internal
    name: data.user.name,
    email: data.user.email,
    role,
    avatar:
      'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  });

  setIsAuthenticated(true);

  return true;
}
 else {
        console.warn('Login failed: Invalid message or user object');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('drone_auth_user');
    localStorage.removeItem('drone_auth_token');
    sessionStorage.removeItem('drone_auth_user');
    sessionStorage.removeItem('drone_auth_token');
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('drone_auth_user') || localStorage.getItem('drone_auth_user');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('drone_auth_user');
        sessionStorage.removeItem('drone_auth_user');
      }
    }
  }, []);

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};

export { AuthContext };
