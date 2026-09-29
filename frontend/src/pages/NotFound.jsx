import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiArrowLeft, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div
      className="container"
      style={{
        padding: '100px 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(5rem, 15vw, 8rem)',
          fontWeight: 900,
          lineHeight: 1,
          background: 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
        }}
      >
        404
      </div>

      <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, marginBottom: '12px' }}>
        Oops! Page Not Found
      </h1>

      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '1.05rem',
          maxWidth: '520px',
          lineHeight: 1.6,
          marginBottom: '36px',
        }}
      >
        The page you are trying to reach doesn't exist, has been removed, or is temporarily unavailable. Let's get you back on track!
      </p>

      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary btn-lg">
          <FiHome size={18} />
          <span>Back to Homepage</span>
        </Link>
        <Link to="/shop" className="btn btn-secondary btn-lg">
          <FiShoppingBag size={18} />
          <span>Browse Shop</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
