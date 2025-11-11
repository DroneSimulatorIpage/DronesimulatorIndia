import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { MainLayout } from './components/layout/MainLayout';
import { useAuth } from './hooks/useAuth';

// Auth Pages
import { LoginMaster } from './pages/auth/LoginMaster';
import { LoginAdmin } from './pages/auth/LoginAdmin';

// Master Admin Pages
import { MasterDashboard } from './pages/master/Dashboard';
import { MasterUsers } from './pages/master/Users';
import { MasterUserDetail } from './pages/master/UserDetail';
import { MasterPlans } from './pages/master/Plans';
import { MasterProducts } from './pages/master/Products';
import { MasterAnnotations } from './pages/master/Annotations';
import { MasterEmployees } from './pages/master/Employees';
import { MasterIncome } from './pages/master/Income';
import { MasterUserMetrics } from './pages/master/UserMetrics';
import { MasterAnalytics } from './pages/master/Analytics';
import AdminInquiries from './pages/master/AdminInquiries';
import AdminFeedbacks from './pages/master/AdminFeedbacks';
import AdminContacts from './pages/master/AdminContacts';
import DownloadAdmin from './pages/master/AdminDownload';
// Admin Pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminUsers } from './pages/admin/Users';
import { AdminUserDetail } from './pages/admin/UserDetail';
import { AdminPlans } from './pages/admin/Plans';
import { AdminProducts } from './pages/admin/Products';
import { AdminDownloads } from './pages/admin/Downloads';
import { AdminAnnotations } from './pages/admin/Annotations';
import { AdminSearch } from './pages/admin/Search';
import { AdminUserMetrics } from './pages/admin/UserMetrics';
import { AdminAnalytics } from './pages/admin/Analytics';

function AdminDash() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="login-master" element={<LoginMaster />} />
        <Route path="login-admin" element={<LoginAdmin />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          } />

          {/* Master Admin Routes */}
          <Route path="master/dashboard" element={<ProtectedRoute requiredRole="master"><MasterDashboard /></ProtectedRoute>} />
          <Route path="master/users" element={<ProtectedRoute requiredRole="master"><MasterUsers /></ProtectedRoute>} />
          <Route path="master/users/:id" element={<ProtectedRoute requiredRole="master"><MasterUserDetail /></ProtectedRoute>} />
          <Route path="master/plans" element={<ProtectedRoute requiredRole="master"><MasterPlans /></ProtectedRoute>} />
          <Route path="master/products" element={<ProtectedRoute requiredRole="master"><MasterProducts /></ProtectedRoute>} />
          <Route path="master/annotations" element={<ProtectedRoute requiredRole="master"><MasterAnnotations /></ProtectedRoute>} />
          <Route path="master/employees" element={<ProtectedRoute requiredRole="master"><MasterEmployees /></ProtectedRoute>} />
          <Route path="master/income" element={<ProtectedRoute requiredRole="master"><MasterIncome /></ProtectedRoute>} />
          <Route path="master/metrics" element={<ProtectedRoute requiredRole="master"><MasterUserMetrics /></ProtectedRoute>} />
          <Route path="master/analytics" element={<ProtectedRoute requiredRole="master"><MasterAnalytics /></ProtectedRoute>} />
          <Route path="master/cont" element={<ProtectedRoute requiredRole="master"><AdminContacts /></ProtectedRoute>} />
          <Route path="master/inqui" element={<ProtectedRoute requiredRole="master"><AdminInquiries /></ProtectedRoute>} />
          <Route path="master/feed" element={<ProtectedRoute requiredRole="master"><AdminFeedbacks /></ProtectedRoute>} />
          <Route path="master/down" element={<ProtectedRoute requiredRole="master"><DownloadAdmin /></ProtectedRoute>} />
          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} />
          <Route path="admin/users/:id" element={<ProtectedRoute requiredRole="admin"><AdminUserDetail /></ProtectedRoute>} />
          <Route path="admin/plans" element={<ProtectedRoute requiredRole="admin"><AdminPlans /></ProtectedRoute>} />
          <Route path="admin/products" element={<ProtectedRoute requiredRole="admin"><AdminProducts /></ProtectedRoute>} />
          <Route path="admin/downloads" element={<ProtectedRoute requiredRole="admin"><AdminDownloads /></ProtectedRoute>} />
          <Route path="admin/annotations" element={<ProtectedRoute requiredRole="admin"><AdminAnnotations /></ProtectedRoute>} />
          <Route path="admin/search" element={<ProtectedRoute requiredRole="admin"><AdminSearch /></ProtectedRoute>} />
          <Route path="admin/metrics" element={<ProtectedRoute requiredRole="admin"><AdminUserMetrics /></ProtectedRoute>} />
          <Route path="admin/analytics" element={<ProtectedRoute requiredRole="admin"><AdminAnalytics /></ProtectedRoute>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="login-master" replace />} />
      </Routes>
    </AuthProvider>
  );
}

// Redirect based on role
const DashboardRedirect: React.FC = () => {
  const { user } = useAuth();

  if (user?.role === 'master') {
    return <Navigate to="master/dashboard" replace />;
  } else if (user?.role === 'admin') {
    return <Navigate to="admin/dashboard" replace />;
  }

  return <Navigate to="login-master" replace />;
};

export default AdminDash;
