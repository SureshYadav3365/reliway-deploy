import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiCheck,
  FiShoppingBag,
  FiZap,
  FiHeart,
  FiShare2,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiStar,
  FiArrowLeft,
} from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import RatingStars from '../components/RatingStars';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { QuickViewContext } from '../layouts/RootLayout';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useContext(QuickViewContext) || {};

  const product = products.find((p) => String(p.id) === String(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'specifications', 'reviews'

  // User review form state
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Marcus Vance',
      rating: 5,
      date: 'Sep 24, 2026',
      title: 'Exceptional build quality',
      comment: 'Arrived swiftly. The materials and finishes are truly top notch. Highly recommended!',
    },
    {
      id: 2,
      author: 'Elena Rostova',
      rating: 4.8,
      date: 'Sep 18, 2026',
      title: 'Worth every dollar',
      comment: 'Very pleased with the performance and design. Fits right into my daily lifestyle setup.',
    },
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setActiveTab('description');
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '16px' }}>
          Product Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          The item you are searching for might have been moved or is currently unavailable.
        </p>
        <Link to="/shop" className="btn btn-primary">
          <FiArrowLeft size={16} />
          <span>Back to Shop</span>
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const inStock = product.stock > 0;
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      toast.error('Please fill in your name and review comments.');
      return;
    }
    const newEntry = {
      id: Date.now(),
      author: newReviewAuthor.trim(),
      rating: Number(newReviewRating),
      date: 'Just now',
      title: 'Verified Customer Review',
      comment: newReviewComment.trim(),
    };
    setReviewsList([newEntry, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    toast.success('Thank you for submitting your product review!');
  };

  return (
    <div className="product-details-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb
        items={[
          { label: 'Shop', link: '/shop' },
          { label: product.category, link: `/shop?category=${encodeURIComponent(product.category)}` },
          { label: product.name },
        ]}
      />

      {/* Main Details Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          marginBottom: '60px',
        }}
      >
        {/* Gallery Section */}
        <div>
          {/* Big Featured Image */}
          <div
            style={{
              width: '100%',
              height: '460px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: '#f1f5f9',
              border: '1px solid var(--border-color)',
              marginBottom: '16px',
              position: 'relative',
            }}
          >
            <img
              src={images[selectedImage] || images[0]}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
            />
            {product.originalPrice > product.price && (
              <span
                className="badge badge-discount"
                style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '0.85rem' }}
              >
                -{product.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border:
                      selectedImage === idx
                        ? '2.5px solid var(--primary)'
                        : '1.5px solid var(--border-color)',
                    opacity: selectedImage === idx ? 1 : 0.65,
                    transition: 'all 0.2s',
                  }}
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information Panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Category & Brand Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {product.category}
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Brand: <strong>{product.brand}</strong>
              </span>
            </div>

            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-muted)',
                fontSize: '0.84rem',
              }}
            >
              <FiShare2 size={16} />
              <span>Share</span>
            </button>
          </div>

          {/* Product Title */}
          <h1
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '14px',
            }}
          >
            {product.name}
          </h1>

          {/* Ratings & Stock Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            <RatingStars rating={product.rating} reviewsCount={product.reviews} size={16} />
            <span style={{ color: '#cbd5e1' }}>|</span>
            <span
              className={inStock ? 'badge-stock' : 'badge-out-of-stock'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              {inStock ? <FiCheck size={13} /> : null}
              {inStock ? `${product.stock} Units in Stock` : 'Currently Sold Out'}
            </span>
          </div>

          {/* Price Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '14px',
              padding: '16px 20px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-xs)',
              marginBottom: '24px',
            }}
          >
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span
                  style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-light)',
                    textDecoration: 'line-through',
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="badge badge-discount">
                  Save {formatPrice(product.originalPrice - product.price)} ({product.discount}%)
                </span>
              </>
            )}
          </div>

          {/* Description Excerpt */}
          <p
            style={{
              fontSize: '0.98rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}
          >
            {product.description}
          </p>

          {/* Quantity Selector & Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Quantity:</span>
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
                    padding: '10px 16px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: quantity <= 1 ? '#cbd5e1' : 'var(--text-main)',
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    padding: '0 16px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    minWidth: '40px',
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                  disabled={quantity >= (product.stock || 99)}
                  style={{
                    padding: '10px 16px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: quantity >= (product.stock || 99) ? '#cbd5e1' : 'var(--text-main)',
                  }}
                >
                  +
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-color)',
                  backgroundColor: isFavorited ? '#fef2f2' : '#ffffff',
                  color: isFavorited ? '#ef4444' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                }}
              >
                {isFavorited ? <FaHeart size={16} /> : <FiHeart size={16} />}
                <span>{isFavorited ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Add to Cart & Buy Now Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="btn btn-primary btn-lg"
                style={{ opacity: inStock ? 1 : 0.6 }}
              >
                <FiShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className="btn btn-dark btn-lg"
                style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  opacity: inStock ? 1 : 0.6,
                }}
              >
                <FiZap size={20} color="#f59e0b" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Safe Shopping Guarantee Box */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '14px',
              padding: '18px',
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.84rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiTruck color="var(--primary)" size={18} />
              <span>Fast Track Delivery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiShield color="var(--primary)" size={18} />
              <span>Authentic Guarantee</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiRotateCcw color="var(--primary)" size={18} />
              <span>30 Days Free Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specifications, Reviews */}
      <div className="card" style={{ marginBottom: '60px' }}>
        {/* Tab Headers */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: '#fafbfc',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'description', label: 'Detailed Description' },
            { id: 'specifications', label: 'Technical Specifications' },
            { id: 'reviews', label: `Reviews (${reviewsList.length + (product.reviews || 0)})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 28px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.95rem',
                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                backgroundColor: activeTab === tab.id ? '#ffffff' : 'transparent',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div style={{ padding: '32px' }}>
          {activeTab === 'description' && (
            <div style={{ maxWidth: '800px', lineHeight: 1.7, color: 'var(--text-main)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '14px' }}>
                Product Overview
              </h3>
              <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                {product.description}
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                Crafted to exceed industry performance benchmarks, each unit undergoes meticulous inspection. Whether you're upgrading your daily gear or seeking the perfect gift, this piece offers the ideal balance of functionality, durability, and aesthetics.
              </p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div style={{ maxWidth: '750px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>
                Specifications & Features
              </h3>
              <div
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                }}
              >
                {product.specifications ? (
                  Object.entries(product.specifications).map(([key, val], idx) => (
                    <div
                      key={key}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '220px 1fr',
                        padding: '14px 20px',
                        backgroundColor: idx % 2 === 0 ? '#ffffff' : 'var(--bg-muted)',
                        borderBottom:
                          idx < Object.keys(product.specifications).length - 1
                            ? '1px solid var(--border-subtle)'
                            : 'none',
                        fontSize: '0.92rem',
                      }}
                    >
                      <strong style={{ color: 'var(--text-main)' }}>{key}</strong>
                      <span style={{ color: 'var(--text-muted)' }}>{val}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ padding: '20px', color: 'var(--text-muted)' }}>
                    Standard product specifications apply.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '40px',
                }}
              >
                {/* Left: Reviews List */}
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>
                    Customer Feedback
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {reviewsList.map((rev) => (
                      <div
                        key={rev.id}
                        style={{
                          padding: '20px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{rev.author}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{rev.date}</span>
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                          <RatingStars rating={rev.rating} showText={false} size={14} />
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '4px' }}>
                          {rev.title}
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Write a Review Form */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-muted)',
                    padding: '28px',
                    borderRadius: 'var(--radius-lg)',
                    height: 'fit-content',
                  }}
                >
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>
                    Write a Review
                  </h4>
                  <form onSubmit={handleAddReview}>
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="form-select"
                      >
                        <option value={5}>5 Stars - Excellent</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Average</option>
                        <option value={2}>2 Stars - Poor</option>
                        <option value={1}>1 Star - Terrible</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Review Comments</label>
                      <textarea
                        rows={4}
                        placeholder="Share your experience with this product..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="form-textarea"
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="section-header flex-between">
            <div>
              <span className="section-tag">Similar Products</span>
              <h2 className="heading-section">You Might Also Like</h2>
            </div>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="btn btn-secondary"
            >
              <span>View All {product.category}</span>
            </Link>
          </div>

          <div className="grid-4">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onQuickView={openQuickView}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
