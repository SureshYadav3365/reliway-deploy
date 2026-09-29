import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiAward,
  FiShield,
  FiTruck,
  FiSmile,
  FiUsers,
  FiCheckCircle,
  FiHeart,
  FiArrowRight,
} from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';

const About = () => {
  return (
    <div className="about-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'About Us' }]} />

      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px' }}>
        <span className="section-tag" style={{ margin: '0 auto 14px' }}>
          Our Story & Philosophy
        </span>
        <h1 className="heading-section" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
          Crafting The Future of Everyday E-Commerce
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          ShopEase was founded with one clear mission: to eliminate the friction of modern online shopping by delivering curated premium essentials, radical price transparency, and world-class customer service.
        </p>
      </div>

      {/* Visual Showcase Banner */}
      <div
        style={{
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
          marginBottom: '70px',
          maxHeight: '440px',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80"
          alt="ShopEase Team & Vision"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Mission & Vision Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px',
          marginBottom: '70px',
        }}
      >
        <div className="card" style={{ padding: '36px' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <FiAward size={24} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>
            Our Mission
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem' }}>
            To empower individuals and households around the world with uncompromising product quality. We partner directly with verified global brands and artisanal creators, avoiding unnecessary distributor markups so that exceptional craftsmanship remains accessible.
          </p>
        </div>

        <div className="card" style={{ padding: '36px' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              backgroundColor: '#ecfdf5',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <FiSmile size={24} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>
            Customer Obsession
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem' }}>
            Every touchpoint — from lightning-fast search algorithms to human-assisted 24/7 customer care and straightforward 30-day returns — is built around a single standard: ensuring our customers feel delighted, valued, and completely secure.
          </p>
        </div>
      </div>

      {/* Why ShopEase Pillars */}
      <div style={{ marginBottom: '70px' }}>
        <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
          <span className="section-tag">The ShopEase Difference</span>
          <h2 className="heading-section">Why Millions Choose ShopEase</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We rethink every step of the retail journey to prioritize consumer trust.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            {
              icon: <FiShield size={24} />,
              title: '100% Guaranteed Authenticity',
              desc: 'Every item is sourced through certified brand channels with original manufacturer serial warranties.',
            },
            {
              icon: <FiTruck size={24} />,
              title: 'Next-Day Express Dispatch',
              desc: 'Nationwide fulfillment nodes ensure that 88% of orders reach consumer doorsteps in 48 hours or less.',
            },
            {
              icon: <FiUsers size={24} />,
              title: 'Customer-Centric Care',
              desc: 'Real customer support specialists available around the clock via live chat and phone to assist your order.',
            },
            {
              icon: <FiHeart size={24} />,
              title: 'Eco-Conscious Packaging',
              desc: '100% recyclable, biodegradable packing materials designed to reduce plastics in our global ecosystems.',
            },
          ].map((pillar, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: '28px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                {pillar.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                {pillar.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 32px',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>
          Ready to experience hassle-free shopping?
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 28px' }}>
          Join thousands of satisfied customers and discover today’s top trending deals with free delivery.
        </p>
        <Link to="/shop" className="btn btn-primary btn-lg">
          <span>Explore Product Catalog</span>
          <FiArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default About;
