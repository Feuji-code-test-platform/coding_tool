import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileCode, Mail, Lock, AlertCircle } from 'lucide-react';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Mock authentication - accepts any valid email/password
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate mock token
      const mockToken = 'mock-token-' + Date.now();
      
      // Store token
      localStorage.setItem('recruiter_token', mockToken);
      
      // Store user info (optional)
      localStorage.setItem('recruiter_email', formData.email);
      
      console.log('Login successful, token stored:', mockToken);
      
      // Force navigation to dashboard
      window.location.href = '/dashboard';
      
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-container">
            <FileCode size={32} color="#ff6b35" />
            <h1 className="logo-text">CodeHire</h1>
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to manage your assessments</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="you@company.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Quick login hint for testing */}
          <div className="test-hint">
            <p style={{ fontSize: '0.875rem', color: '#718096', marginTop: '1rem', textAlign: 'center' }}>
              💡 Testing: Use any email and password to login
            </p>
          </div>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>

      <div className="auth-decoration">
        <div className="decoration-pattern"></div>
      </div>
    </div>
  );
}

export default Login;