import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiLock, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const err = {};
    if (!formData.fullName.trim()) {
      err.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 3) {
      err.fullName = 'Full name must be at least 3 characters.';
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      err.phone = 'Please enter your phone number.';
    } else if (cleanPhone.length < 10) {
      err.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.password) {
      err.password = 'Please provide a password.';
    } else if (formData.password.length < 6) {
      err.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      err.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      err.confirmPassword = 'Passwords do not match.';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      const res = register({
        fullName: formData.fullName,
        phone: formData.phone,
        password: formData.password,
      });

      setIsLoading(false);
      if (res.success) {
        navigate('/account');
      } else {
        setErrors({ general: res.message });
      }
    }, 400);
  };

  return (
    <div className="register-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Create Account' }]} />

      <div
        className="card"
        style={{
          maxWidth: '480px',
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
            Join ShopEase
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', marginBottom: '8px' }}>
            Create Your Account
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Get personalized recommendations, real-time tracking, and exclusive discounts.
          </p>
        </div>

        {errors.general && (
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
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <div style={{ position: 'relative' }}>
              <FiUser
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                name="fullName"
                placeholder="e.g. Jordan Miller"
                value={formData.fullName}
                onChange={handleChange}
                className={`form-input ${errors.fullName ? 'is-invalid' : ''}`}
                style={{ paddingLeft: '38px' }}
              />
            </div>
            {errors.fullName && <div className="form-error">{errors.fullName}</div>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <div style={{ position: 'relative' }}>
              <FiPhone
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                style={{ paddingLeft: '38px' }}
              />
            </div>
            {errors.phone && <div className="form-error">{errors.phone}</div>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password * (min 6 characters)</label>
            <div style={{ position: 'relative' }}>
              <FiLock
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'is-invalid' : ''}`}
                style={{ paddingLeft: '38px' }}
              />
            </div>
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Confirm Password *</label>
            <div style={{ position: 'relative' }}>
              <FiLock
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                style={{ paddingLeft: '38px' }}
              />
            </div>
            {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginBottom: '20px' }}
          >
            {isLoading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
