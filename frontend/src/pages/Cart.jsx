import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
  FiArrowLeft,
  FiShield,
  FiTruck,
} from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatCurrency';

const Cart = () => {
  const {
    cartItems,
    subtotal,
    discount,
    delivery,
    tax,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container" style={{ paddingBottom: '80px' }}>
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

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
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <FiShoppingBag size={36} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>
            Your Cart is Currently Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px', maxWidth: '400px' }}>
            Looks like you haven't added anything to your cart yet. Explore our featured arrivals and start saving today!
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            <span>Start Shopping</span>
            <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

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
          <h1 className="heading-section">Shopping Cart</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Review your selected items and adjust quantities before proceeding to checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
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
          <span>Clear All Items</span>
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '32px',
          alignItems: 'flex-start',
        }}
        className="cart-grid"
      >
        {/* Left: Items Table / List */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'var(--bg-subtle)',
              borderBottom: '1px solid var(--border-color)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--text-main)',
            }}
          >
            Cart Items ({cartItems.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '20px',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
                className="cart-item-row"
              >
                {/* Product Thumbnail */}
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: 'var(--radius-md)',
                      objectFit: 'cover',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-muted)',
                    }}
                  />
                </Link>

                {/* Product Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.category} • {item.brand}
                  </span>
                  <Link
                    to={`/product/${item.id}`}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </Link>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1rem' }}>
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice > item.price && (
                      <span
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-light)',
                          textDecoration: 'line-through',
                        }}
                      >
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* +/- buttons */}
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
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                      }}
                    >
                      -
                    </button>
                    <span
                      style={{
                        padding: '0 8px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        minWidth: '24px',
                        textAlign: 'center',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal for item */}
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      color: 'var(--text-main)',
                      minWidth: '80px',
                      textAlign: 'right',
                    }}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-light)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--danger)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-light)')}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom helper row */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'var(--bg-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--primary)',
                fontWeight: 600,
                fontSize: '0.92rem',
              }}
            >
              <FiArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="card" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span style={{ color: 'var(--success)' }}>Discount Savings</span>
                <span style={{ fontWeight: 600, color: 'var(--success)' }}>
                  -{formatPrice(discount)}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Delivery Fee</span>
              <span style={{ fontWeight: 600 }}>
                {delivery === 0 ? (
                  <span style={{ color: 'var(--success)' }}>FREE</span>
                ) : (
                  formatPrice(delivery)
                )}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Estimated Tax (5%)</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(tax)}</span>
            </div>

            <div
              style={{
                height: '1px',
                backgroundColor: 'var(--border-color)',
                margin: '8px 0',
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: 800,
              }}
            >
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>{formatPrice(total)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginBottom: '16px' }}
          >
            <span>Proceed to Checkout</span>
            <FiArrowRight size={18} />
          </button>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '14px',
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiTruck color="var(--primary)" size={16} />
              <span>Free express delivery on orders over $50</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiShield color="var(--primary)" size={16} />
              <span>Guaranteed safe checkout & fraud protection</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
          .cart-item-row {
            grid-template-columns: 70px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
