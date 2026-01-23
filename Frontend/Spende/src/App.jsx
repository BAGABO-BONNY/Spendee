import React from 'react'
import { BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import DashboardLayout from './components/layouts/DashboardLayout';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <DashboardLayout>{children}</DashboardLayout> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signUp" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
          <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App