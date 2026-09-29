import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiPercent, FiClock, FiTag, FiArrowRight, FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { QuickViewContext } from '../layouts/RootLayout';

const Offers = () => {
  const { openQuickView } = useContext(QuickViewContext) || {};

  const saleProducts = products.filter((p) => p.isSpecialOffer || p.discount >= 15);
  const megaDeals = products.filter((p) => p.discount >= 25);

  const promoCoupons = [
    {
      code: 'EASE40',
      discount: '40% OFF',
      minSpend: 'On orders over $150',
      category: 'Electronics & Audio',
      expires: 'Ends this Sunday',
      color: '#2563eb',
    },
    {
      code: 'SAVE25',
      discount: '25% OFF',
      minSpend: 'On orders over $75',
      category: 'Fashion & Footwear',
      expires: 'Limited to first 500 orders',
      color: '#ea580c',
    },
    {
      code: 'FREESHIP',
      discount: 'Free Express Delivery',
      minSpend: 'No minimum order amount',
      category: 'Sitewide Valid',
      expires: 'Valid all week',
      color: '#10b981',
    },
  ];

  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code ${code} copied! Apply at checkout.`);
  };

  return (
    <div className="offers-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Exclusive Offers & Deals' }]} />

      {/* Main Promotional Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 36px',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '48px',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div style={{ maxWidth: '640px', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: '4px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <FiPercent size={14} />
            <span>Limited Time Mega Clearance</span>
          </div>

          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            Spring Flash Sale Up to 40% OFF
          </h1>

          <p style={{ color: '#c7d2fe', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '28px' }}>
            Snag best-selling activewear, noise-canceling headphones, and designer home essentials before discounted inventory runs out.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/shop?sort=price-low" className="btn btn-primary btn-lg">
              <span>Shop All Sale Items</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Coupon Codes Cards */}
      <div style={{ marginBottom: '56px' }}>
        <div className="section-header">
          <span className="section-tag">
            <FiTag size={13} />
            <span>Promo Coupons</span>
          </span>
          <h2 className="heading-section">Active Discount Vouchers</h2>
          <p className="section-subtitle">
            Copy any promo code below and apply during checkout for instant savings.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {promoCoupons.map((coupon, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: '24px',
                borderLeft: `5px solid ${coupon.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: coupon.color }}>
                    {coupon.discount}
                  </span>
                  <span className="badge badge-primary">{coupon.category}</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  {coupon.minSpend}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '18px' }}>
                  <FiClock size={12} />
                  <span>{coupon.expires}</span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--bg-muted)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px dashed #cbd5e1',
                }}
              >
                <code style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.08em', color: 'var(--text-main)' }}>
                  {coupon.code}
                </code>
                <button
                  onClick={() => copyCoupon(coupon.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                  }}
                >
                  <FiCopy size={13} />
                  <span>Copy Code</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mega Clearance Products (25%+ OFF) */}
      <div style={{ marginBottom: '56px' }}>
        <div className="section-header flex-between">
          <div>
            <span className="section-tag" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
              Mega Drops
            </span>
            <h2 className="heading-section">Deep Discounts (25%+ OFF)</h2>
          </div>
          <Link to="/shop" className="btn btn-secondary">
            <span>Explore All</span>
            <FiArrowRight size={16} />
          </Link>
        </div>

        <div className="grid-4">
          {megaDeals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>
      </div>

      {/* All Sale Products */}
      <div>
        <div className="section-header flex-between">
          <div>
            <span className="section-tag">Featured Bargains</span>
            <h2 className="heading-section">All Discounted Products</h2>
          </div>
        </div>

        <div className="grid-4">
          {saleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
