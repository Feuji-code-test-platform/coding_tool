import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ExamPortal from './pages/ExamPortal';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main exam route with token parameter */}
        <Route path="/exam/:token" element={<ExamPortal />} />

        {/* Root redirect to error page */}
        <Route 
          path="/" 
          element={
            <div style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
              padding: '2rem'
            }}>
              <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Invalid Access</h1>
                <p>Please use the exam link provided in your email invitation.</p>
              </div>
            </div>
          } 
        />

        {/* Catch all invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
