import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPhone, FiLock, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phone.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(phone, password);
      setIsLoading(false);
      if (res.success) {
        navigate('/account');
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setPhone('9876543210');
    setPassword('password123');
    setErrorMsg('');
  };

  return (
    <div className="login-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Sign In' }]} />

      <div
        className="card"
        style={{
          maxWidth: '460px',
          margin: '30px auto',
          padding: '40px 32px',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Welcome Back
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', marginBottom: '8px' }}>
            Sign In to ShopEase
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Access your orders, saved wishlist items, and personal preferences.
          </p>
        </div>

        {/* Demo Account Quick-Fill Helper Box */}
        <div
          style={{
            backgroundColor: 'var(--primary-light)',
            border: '1px solid #bfdbfe',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            marginBottom: '20px',
            fontSize: '0.82rem',
            color: '#1e40af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <strong>Demo Account:</strong> 9876543210 / password123
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            style={{
              color: 'var(--primary)',
              fontWeight: 700,
              textDecoration: 'underline',
              fontSize: '0.82rem',
            }}
          >
            Fill Demo
          </button>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: 'var(--danger-light)',
              color: 'var(--danger)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              marginBottom: '18px',
              fontWeight: 500,
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Phone Field */}
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div style={{ position: 'relative' }}>
              <FiPhone
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="tel"
                placeholder="Enter 10-digit phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px' }}
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', cursor: 'pointer' }} onClick={() => toast('Use password123 for demo login')}>
                Forgot password?
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <FiLock
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px' }}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginBottom: '20px' }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
