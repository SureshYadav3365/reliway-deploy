import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiShoppingBag,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiHeadphones,
} from 'react-icons/fi';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcApplePay,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        borderTop: '1px solid #1e293b',
        fontSize: '0.9rem',
      }}
    >
      {/* Top Value Propositions Ribbon */}
      <div
        style={{
          borderBottom: '1px solid #1e293b',
          backgroundColor: '#0b1120',
          padding: '28px 0',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(37, 99, 235, 0.15)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FiTruck size={22} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>Free Express Delivery</h4>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>On all domestic orders over $50</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FiShield size={22} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>100% Secure Checkout</h4>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>256-bit SSL encrypted payments</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(249, 115, 22, 0.15)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FiRotateCcw size={22} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>30-Day Easy Returns</h4>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Money-back satisfaction guarantee</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(168, 85, 247, 0.15)',
                  color: '#a855f7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FiHeadphones size={22} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>24/7 Dedicated Support</h4>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Live chat & phone assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container" style={{ padding: '60px 20px 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '36px',
            marginBottom: '48px',
          }}
        >
          {/* Col 1: Brand & Bio */}
          <div style={{ maxWidth: '320px' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <FiShoppingBag size={20} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                Shop<span style={{ color: 'var(--primary)' }}>Ease</span>
              </span>
            </Link>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px', color: '#94a3b8' }}>
              Your premium destination for carefully curated tech, fashion, lifestyle, and home collections. Crafted for effortless shopping.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: <FaFacebookF size={14} />, href: 'https://facebook.com', label: 'Facebook' },
                { icon: <FaTwitter size={14} />, href: 'https://twitter.com', label: 'Twitter' },
                { icon: <FaInstagram size={14} />, href: 'https://instagram.com', label: 'Instagram' },
                { icon: <FaLinkedinIn size={14} />, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: <FaYoutube size={14} />, href: 'https://youtube.com', label: 'YouTube' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    color: '#cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1e293b';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4
              style={{
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '18px',
                letterSpacing: '0.02em',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <Link to="/" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Home</Link>
              </li>
              <li>
                <Link to="/shop" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Shop All Products</Link>
              </li>
              <li>
                <Link to="/categories" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Categories</Link>
              </li>
              <li>
                <Link to="/offers" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Deals & Offers</Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>About ShopEase</Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div>
            <h4
              style={{
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '18px',
                letterSpacing: '0.02em',
              }}
            >
              Customer Care
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <Link to="/account" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>My Account</Link>
              </li>
              <li>
                <Link to="/orders" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Track My Order</Link>
              </li>
              <li>
                <Link to="/cart" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Shopping Cart</Link>
              </li>
              <li>
                <Link to="/wishlist" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Wishlist</Link>
              </li>
              <li>
                <span style={{ color: '#94a3b8' }}>Shipping Policy</span>
              </li>
              <li>
                <span style={{ color: '#94a3b8' }}>Returns & Exchanges</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4
              style={{
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '18px',
                letterSpacing: '0.02em',
              }}
            >
              Contact Us
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <FiMapPin size={18} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>100 Marketplace Blvd, Suite 400, San Francisco, CA 94105</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiPhone size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>+1 (800) 456-7890</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiMail size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>support@shopease.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiClock size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>Mon – Fri: 8:00 AM – 8:00 PM EST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div
          style={{
            borderTop: '1px solid #1e293b',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
          }}
        >
          <div>
            © {new Date().getFullYear()} ShopEase Inc. All rights reserved. Built for seamless shopping.
          </div>

          {/* Payment Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', color: '#cbd5e1' }}>
            <FaCcVisa title="Visa" />
            <FaCcMastercard title="Mastercard" />
            <FaCcAmex title="American Express" />
            <FaCcPaypal title="PayPal" />
            <FaCcApplePay title="Apple Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
