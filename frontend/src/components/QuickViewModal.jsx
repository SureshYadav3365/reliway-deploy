import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiHeart, FiShoppingBag, FiCheck, FiArrowRight } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import RatingStars from './RatingStars';
import { formatPrice } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          padding: '28px',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            transition: 'background-color 0.2s',
            zIndex: 10,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-muted)')}
        >
          <FiX size={20} />
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Images Section */}
          <div>
            <div
              style={{
                width: '100%',
                height: '340px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-muted)',
                marginBottom: '12px',
              }}
            >
              <img
                src={images[selectedImage] || images[0]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.3s ease',
                }}
              />
            </div>

            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border:
                        selectedImage === idx
                          ? '2px solid var(--primary)'
                          : '1px solid var(--border-color)',
                      opacity: selectedImage === idx ? 1 : 0.7,
                      transition: 'all 0.2s',
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {product.category}
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {product.brand}
              </span>
            </div>

            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: '10px',
              }}
            >
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <RatingStars rating={product.rating} reviewsCount={product.reviews} />
              <span
                className={inStock ? 'badge-stock' : 'badge-out-of-stock'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                {inStock ? <FiCheck size={12} /> : null}
                {inStock ? `${product.stock} In Stock` : 'Out of Stock'}
              </span>
            </div>

            {/* Price Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px',
              }}
            >
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span
                    style={{
                      fontSize: '1.05rem',
                      color: 'var(--text-light)',
                      textDecoration: 'line-through',
                    }}
                  >
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="badge badge-discount">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}
            >
              {product.description}
            </p>

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#fff',
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  style={{
                    padding: '8px 14px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: quantity <= 1 ? '#cbd5e1' : 'var(--text-main)',
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    padding: '0 12px',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    minWidth: '32px',
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                  disabled={quantity >= (product.stock || 99)}
                  style={{
                    padding: '8px 14px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: quantity >= (product.stock || 99) ? '#cbd5e1' : 'var(--text-main)',
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="btn btn-primary"
                style={{ flex: 1, padding: '12px 18px', opacity: inStock ? 1 : 0.6 }}
              >
                <FiShoppingBag size={18} />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isFavorited ? '#ef4444' : 'var(--text-muted)',
                  backgroundColor: isFavorited ? '#fef2f2' : '#ffffff',
                  transition: 'all 0.2s',
                }}
              >
                {isFavorited ? <FaHeart size={18} /> : <FiHeart size={18} />}
              </button>
            </div>

            {/* View Full Details Link */}
            <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                }}
              >
                <span>View Full Product Specifications & Reviews</span>
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
