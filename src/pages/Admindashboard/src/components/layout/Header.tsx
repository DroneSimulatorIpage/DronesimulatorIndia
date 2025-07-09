import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Menu, Bell, LogOut } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome back, {user?.name}
            </h1>
            <p className="text-sm text-gray-500">
              {user?.role === 'master' ? 'Master Administrator' : 'Administrator'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">


          <div className="flex items-center space-x-3">
            <img
              src="/images/smalllogo.png"
              alt={user?.name || 'User'}
              className="w-24 h-24 rounded-full object-cover"
            />

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-gray-600"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};