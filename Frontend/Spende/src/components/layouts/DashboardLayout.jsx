import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {
  LuLayoutDashboard,
  LuTrendingUp,
  LuTrendingDown,
  LuLogOut,
  LuMenu,
  LuX,
} from 'react-icons/lu';
import logo from '../../assets/logo (2).png';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LuLayoutDashboard },
    { path: '/income', label: 'Income', icon: LuTrendingUp },
    { path: '/expense', label: 'Expense', icon: LuTrendingDown },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full bg-linear-to-b from-white to-gray-50">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-linear-to-r from-primary to-primary-dark">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Spendee Logo" className="h-30 w-30 object-contain drop-shadow-lg" />
              <h1 className="text-2xl font-bold text-white tracking-tight">SPENDEE</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <LuX size={24} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 mt-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-linear-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30 scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
                  }`}
                >
                  <Icon size={22} className={isActive(item.path) ? 'text-white' : 'text-gray-600'} />
                  <span className="font-semibold text-base">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-3 mb-4 p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              {user?.profileImageUrl ? (
                <img
                  src={`http://localhost:5000${user.profileImageUrl}`}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                  {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.fullName || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-semibold hover:scale-102"
            >
              <LuLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200 lg:hidden sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LuMenu size={24} />
            </button>
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Spendee Logo" className="h-11 w-11 object-contain drop-shadow-md" />
              <h1 className="text-xl font-bold bg-linear-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                SPENDEE
              </h1>
            </div>
            <div className="w-6" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
