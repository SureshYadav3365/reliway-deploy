import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiHeart, FiShoppingBag, FiCheck } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import RatingStars from './RatingStars';
import { formatPrice } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, cartItems } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const isAlreadyInCart = cartItems.some((item) => item.id === product.id);
  const inStock = product.stock > 0;
  const imageSrc =
    (product.images && product.images[0]) ||
    product.image ||
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      addToCart(product, 1);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        transform: isHovered ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* Top Image Container */}
      <div
        style={{
          position: 'relative',
          paddingTop: '80%', // 5:4 aspect ratio
          overflow: 'hidden',
          backgroundColor: '#f1f5f9',
        }}
      >
        <Link to={`/product/${product.id}`} style={{ position: 'absolute', inset: 0 }}>
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
        </Link>

        {/* Badges Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 2,
          }}
        >
          {product.originalPrice > product.price && (
            <span className="badge badge-discount">
              -{product.discount || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="badge badge-primary">
              New
            </span>
          )}
          {!inStock && (
            <span className="badge badge-out-of-stock">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button (Always Visible in Corner) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorited ? '#ef4444' : '#64748b',
            transition: 'all 0.2s ease',
            zIndex: 3,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isFavorited ? <FaHeart size={16} /> : <FiHeart size={16} />}
        </button>

        {/* Quick View Button (Reveals on Hover or Available on Mobile) */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'center',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            zIndex: 3,
            pointerEvents: isHovered ? 'auto' : 'none',
          }}
        >
          <button
            onClick={handleQuickViewClick}
            className="btn btn-secondary btn-sm"
            style={{
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(4px)',
              boxShadow: 'var(--shadow-md)',
              fontWeight: 600,
            }}
          >
            <FiEye size={15} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Category & Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {product.category}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
            {product.brand}
          </span>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.id}`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.96rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            lineHeight: 1.35,
            marginBottom: '8px',
            minHeight: '2.7em',
          }}
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div style={{ marginBottom: '12px' }}>
          <RatingStars rating={product.rating} reviewsCount={product.reviews} size={13} />
        </div>

        {/* Price & Action Row */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '8px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          {/* Price */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-light)',
                    textDecoration: 'line-through',
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600 }}>
                Save {formatPrice(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            title={inStock ? (isAlreadyInCart ? 'Add another to Cart' : 'Add to Cart') : 'Out of Stock'}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: !inStock ? '#f1f5f9' : isAlreadyInCart ? '#eff6ff' : 'var(--primary)',
              color: !inStock ? '#94a3b8' : isAlreadyInCart ? 'var(--primary)' : '#ffffff',
              border: isAlreadyInCart ? '1.5px solid var(--primary)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              flexShrink: 0,
              boxShadow: inStock && !isAlreadyInCart ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (inStock && !isAlreadyInCart) {
                e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (inStock && !isAlreadyInCart) {
                e.currentTarget.style.backgroundColor = 'var(--primary)';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {isAlreadyInCart ? <FiCheck size={18} /> : <FiShoppingBag size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
