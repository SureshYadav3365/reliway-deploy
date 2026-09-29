import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiAward,
  FiCheckCircle,
  FiPercent,
  FiTrendingUp,
  FiStar,
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import RatingStars from '../components/RatingStars';
import Newsletter from '../components/Newsletter';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { customerReviews } from '../data/reviews';
import { QuickViewContext } from '../layouts/RootLayout';

const Home = () => {
  const navigate = useNavigate();
  const { openQuickView } = useContext(QuickViewContext) || {};

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 8);
  const specialOffers = products.filter((p) => p.isSpecialOffer && p.discount >= 20).slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 50%, #e2e8f0 100%)',
          overflow: 'hidden',
          padding: '60px 0 80px',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        {/* Soft Background Accents */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(37, 99, 235, 0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(249, 115, 22, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div style={{ maxWidth: '620px', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  color: 'var(--primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '20px',
                }}
              >
                <FiStar size={16} />
                <span>Next Generation Shopping Platform</span>
              </div>

              <h1
                className="heading-hero"
                style={{
                  marginBottom: '20px',
                  color: '#0f172a',
                }}
              >
                Elevate Everyday Living with{' '}
                <span className="text-gradient">Premium Essentials</span>.
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '32px',
                }}
              >
                Discover precision audio gear, smart wearables, curated designer apparel, and handcrafted home comfort — all with guaranteed authenticity and lightning-fast delivery.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
                <Link to="/shop" className="btn btn-primary btn-lg">
                  <FiShoppingBag size={20} />
                  <span>Shop Now</span>
                </Link>
                <Link to="/categories" className="btn btn-secondary btn-lg">
                  <span>Explore Categories</span>
                  <FiArrowRight size={18} />
                </Link>
              </div>

              {/* Trust Badges */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(226, 232, 240, 0.8)',
                  fontSize: '0.86rem',
                  color: 'var(--text-muted)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiTruck size={17} color="var(--primary)" />
                  <span>Free Express Shipping</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiAward size={17} color="var(--primary)" />
                  <span>100% Genuine Brands</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiShield size={17} color="var(--primary)" />
                  <span>Buyer Protection</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-xl)',
                  backgroundColor: '#fff',
                  border: '1px solid var(--border-color)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80"
                  alt="Modern Shopping Lifestyle"
                  style={{
                    width: '100%',
                    height: '460px',
                    objectFit: 'cover',
                  }}
                />

                {/* Floating Promo Overlay Card */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 800 }}>
                      Limited Time Drop
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      Sony XM5 & Apple Watch Series
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Starting at $139.99 with instant checkout
                    </div>
                  </div>
                  <Link
                    to="/shop?category=Electronics"
                    className="btn btn-primary btn-sm"
                    style={{ flexShrink: 0 }}
                  >
                    View Drop
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <span className="section-tag">Browse by Department</span>
              <h2 className="heading-section">Top Product Categories</h2>
              <p className="section-subtitle">
                Explore handpicked collections across tech, fashion, wellness, and home decor.
              </p>
            </div>
            <Link to="/categories" className="btn btn-secondary">
              <span>View All Categories</span>
              <FiArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '18px',
            }}
          >
            {categories.slice(0, 6).map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.slug)}`)}
                className="card"
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '240px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1, color: '#ffffff' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {cat.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    {cat.itemCount}+ Products
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <span className="section-tag">Handpicked Selection</span>
              <h2 className="heading-section">Featured Products</h2>
              <p className="section-subtitle">
                Premium quality picks rated 4.7+ stars by shoppers worldwide.
              </p>
            </div>
            <Link to="/shop" className="btn btn-secondary">
              <span>View All</span>
              <FiArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={openQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROMOTIONAL BANNER */}
      <section className="section-padding">
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #4338ca 100%)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              alignItems: 'center',
            }}
          >
            <div style={{ padding: '48px 36px', color: '#ffffff' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                <FiPercent size={14} />
                <span>Special Spring Deal</span>
              </span>

              <h2
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: '16px',
                }}
              >
                Up to 30% Off Sound & Wearables
              </h2>

              <p style={{ color: '#dbeafe', fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px', maxWidth: '480px' }}>
                Immerse yourself in concert-grade active noise cancellation and pro athletic tracking. Valid while supplies last.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link
                  to="/shop?category=Electronics"
                  className="btn btn-secondary btn-lg"
                  style={{ backgroundColor: '#ffffff', color: '#1e3a8a', fontWeight: 700 }}
                >
                  Explore Electronics
                </Link>
                <Link
                  to="/offers"
                  className="btn btn-outline btn-lg"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.6)', color: '#ffffff' }}
                >
                  All Offers
                </Link>
              </div>
            </div>

            <div style={{ height: '360px', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
                alt="Headphones & Sound Promo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLING PRODUCTS */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <span className="section-tag">
                <FiTrendingUp size={14} />
                <span>Customer Favorites</span>
              </span>
              <h2 className="heading-section">Best Selling Products</h2>
              <p className="section-subtitle">
                The most coveted items with the highest repeat orders this month.
              </p>
            </div>
            <Link to="/shop?sort=popular" className="btn btn-secondary">
              <span>View All Best Sellers</span>
              <FiArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-4">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={openQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEW ARRIVALS */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <span className="section-tag">Fresh In Stock</span>
              <h2 className="heading-section">New Arrivals</h2>
              <p className="section-subtitle">
                Just dropped into our inventory. Be the first to snag the latest trends.
              </p>
            </div>
            <Link to="/shop?sort=newest" className="btn btn-secondary">
              <span>View All New</span>
              <FiArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-4">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={openQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. SPECIAL OFFERS SECTION */}
      {specialOffers.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: '#fff7ed', borderTop: '1px solid #fed7aa', borderBottom: '1px solid #fed7aa' }}>
          <div className="container">
            <div className="section-header flex-between">
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    backgroundColor: '#ea580c',
                    color: '#ffffff',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  <FiPercent size={14} />
                  <span>Flash Discounts (20%+ OFF)</span>
                </span>
                <h2 className="heading-section" style={{ color: '#7c2d12' }}>
                  Limited Time Mega Deals
                </h2>
                <p className="section-subtitle" style={{ color: '#9a3412' }}>
                  Grab these limited-stock deals before discounts expire tonight.
                </p>
              </div>
              <Link to="/offers" className="btn btn-dark">
                <span>View All Deals</span>
                <FiArrowRight size={16} />
              </Link>
            </div>

            <div className="grid-4">
              {specialOffers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={openQuickView}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CUSTOMER REVIEWS */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
            <span className="section-tag">Loved by Customers</span>
            <h2 className="heading-section">What Our Shoppers Say</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Real feedback from verified purchasers who trust ShopEase for quality and swift delivery.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {customerReviews.map((review) => (
              <div
                key={review.id}
                className="card"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <RatingStars rating={review.rating} showText={false} size={15} />
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      {review.date}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                    "{review.title}"
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {review.comment}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                  <img
                    src={review.avatar}
                    alt={review.name}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                      {review.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FiCheckCircle size={12} />
                      <span>{review.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER SECTION */}
      <Newsletter />
    </div>
  );
};

export default Home;
