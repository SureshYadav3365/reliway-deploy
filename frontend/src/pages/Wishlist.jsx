import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiHeart,
  FiShoppingBag,
  FiTrash2,
  FiArrowRight,
  FiCheck,
} from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import RatingStars from '../components/RatingStars';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatCurrency';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page container" style={{ paddingBottom: '80px' }}>
        <Breadcrumb items={[{ label: 'My Wishlist' }]} />

        <div
          className="card"
          style={{
            maxWidth: '560px',
            margin: '40px auto',
            padding: '60px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#fef2f2',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <FiHeart size={36} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px', maxWidth: '400px' }}>
            Save items that catch your eye! Tap the heart icon on any product card while browsing to assemble your dream lineup.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            <span>Explore Products</span>
            <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'My Wishlist' }]} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h1 className="heading-section">My Wishlist</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        <button
          onClick={clearWishlist}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--danger)',
            fontSize: '0.88rem',
            fontWeight: 600,
          }}
        >
          <FiTrash2 size={15} />
          <span>Clear Wishlist</span>
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {wishlistItems.map((item) => {
          const inStock = item.stock > 0;
          return (
            <div
              key={item.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Image Preview */}
              <div
                style={{
                  position: 'relative',
                  paddingTop: '75%',
                  overflow: 'hidden',
                  backgroundColor: '#f1f5f9',
                }}
              >
                <Link to={`/product/${item.id}`} style={{ position: 'absolute', inset: 0 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Link>

                {/* Remove button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  title="Remove from wishlist"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: 'var(--danger)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <FiTrash2 size={15} />
                </button>
              </div>

              {/* Details & Move to Cart */}
              <div
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  {item.category} • {item.brand}
                </span>

                <Link
                  to={`/product/${item.id}`}
                  style={{
                    fontSize: '0.98rem',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: 'var(--text-main)',
                    marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.name}
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <RatingStars rating={item.rating || 4.7} reviewsCount={item.reviews} size={13} />
                  <span
                    className={inStock ? 'badge-stock' : 'badge-out-of-stock'}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    {inStock ? <FiCheck size={11} /> : null}
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice > item.price && (
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Move to Cart Button */}
                <button
                  onClick={() => moveToCart(item)}
                  disabled={!inStock}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    marginTop: 'auto',
                    opacity: inStock ? 1 : 0.6,
                  }}
                >
                  <FiShoppingBag size={16} />
                  <span>{inStock ? 'Move to Cart' : 'Currently Unavailable'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
