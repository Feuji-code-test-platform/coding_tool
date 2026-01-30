import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import CreateAssessment from './pages/CreateAssessment';
import CreateAssessmentEnhanced from './pages/CreateAssessmentEnhanced';
import AssessmentDetails from './pages/AssessmentDetails';
import ResultsAnalytics from './pages/ResultsAnalytics';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('recruiter_token');
  const location = useLocation();

  if (!token) {
    console.log('No token found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Public Route Component (redirects to dashboard if already logged in)
function PublicRoute({ children }) {
  const token = localStorage.getItem('recruiter_token');

  if (token) {
    console.log('Already logged in, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  useEffect(() => {
    // Debug: Log authentication status on app load
    const token = localStorage.getItem('recruiter_token');
    console.log('App loaded. Auth token:', token ? 'Present ✓' : 'Not found ✗');
    
    // Optional: Validate token format
    if (token && !token.startsWith('mock-token-')) {
      console.warn('Invalid token format detected. Clearing...');
      localStorage.removeItem('recruiter_token');
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes - Only accessible when NOT logged in */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        {/* Protected Routes - Only accessible when logged in */}
        
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Assessment Creation - Enhanced Version with Multi-Step */}
        <Route
          path="/assessment/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateAssessmentEnhanced />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Assessment Creation - Simple Version (Backup) */}
        <Route
          path="/assessment/create-simple"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateAssessment />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Assessment Details */}
        <Route
          path="/assessment/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <AssessmentDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Results Analytics */}
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Layout>
                <ResultsAnalytics />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Recruiter Dashboard */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute>
              <Layout>
                <RecruiterDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Reports - Placeholder for future */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Layout>
                <div style={{ padding: '2rem' }}>
                  <h1>Reports</h1>
                  <p>Coming soon...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Support - Placeholder for future */}
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Layout>
                <div style={{ padding: '2rem' }}>
                  <h1>Support</h1>
                  <p>Coming soon...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Settings - Placeholder for future */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <div style={{ padding: '2rem' }}>
                  <h1>Settings</h1>
                  <p>Coming soon...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Root Route - Redirect based on auth status */}
        <Route
          path="/"
          element={
            localStorage.getItem('recruiter_token') ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;