import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import Studentregister from './pages/studentregister'

function AppAuth() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/studentregister" element={<Studentregister />} />
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
         
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default AppAuth