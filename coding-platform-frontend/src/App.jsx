import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import CreateAssessmentEnhanced from './pages/CreateAssessmentEnhanced';
import AssessmentDetails from './pages/AssessmentDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  // Simple auth check - in production, use proper auth context
  const isAuthenticated = localStorage.getItem('recruiter_token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/assessment/create" element={<CreateAssessmentEnhanced />} />
                  <Route path="/assessment/:id" element={<AssessmentDetails />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
