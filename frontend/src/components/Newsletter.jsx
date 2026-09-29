import React, { useState } from 'react';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setSubscribed(true);
    toast.success('Thank you for subscribing! Your 10% discount code is WELCOME10');
  };

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}
      className="section-padding"
    >
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '48px 24px',
            color: '#ffffff',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          {/* Subtle Decorative Background Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(37, 99, 235, 0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                color: '#60a5fa',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              <FiMail size={14} />
              <span>Stay In The Loop</span>
            </span>

            <h2
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                marginBottom: '12px',
                lineHeight: 1.2,
              }}
            >
              Subscribe & Unlock 10% Off
            </h2>

            <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '28px' }}>
              Join over 45,000+ happy shoppers. Get VIP access to exclusive drops, secret discount codes, and curated weekend sales.
            </p>

            {subscribed ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '12px 24px',
                  borderRadius: 'var(--radius-md)',
                  color: '#34d399',
                  fontWeight: 600,
                }}
              >
                <FiCheckCircle size={20} />
                <span>You are subscribed! Use coupon code <strong>WELCOME10</strong> at checkout.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  justifyContent: 'center',
                  maxWidth: '500px',
                  margin: '0 auto',
                }}
              >
                <div style={{ flex: '1 1 280px', position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid #334155',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      outline: 'none',
                      fontSize: '0.95rem',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={(e) => (e.target.style.borderColor = '#334155')}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ flex: '0 0 auto', padding: '14px 26px' }}
                >
                  Subscribe Now
                </button>
              </form>
            )}

            <div style={{ marginTop: '16px', fontSize: '0.78rem', color: '#64748b' }}>
              We respect your privacy. No spam ever. Unsubscribe with 1-click anytime.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
