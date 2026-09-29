import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiCheckCircle,
  FiShoppingBag,
  FiTruck,
  FiCreditCard,
  FiDollarSign,
  FiShield,
  FiArrowRight,
  FiArrowLeft,
  FiPackage,
} from 'react-icons/fi';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatCurrency';

const Checkout = () => {
  const { cartItems, subtotal, discount, delivery, tax, total, clearCart } = useCart();
  const { currentUser, placeOrder } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || 'Alex Johnson',
    phone: currentUser?.phone || '9876543210',
    address: currentUser?.address || '742 Evergreen Terrace, Apt 4B',
    city: currentUser?.city || 'Springfield',
    state: currentUser?.state || 'Oregon',
    pincode: currentUser?.pincode || '97477',
  });

  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'cod'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!formData.address.trim()) errors.address = 'Street address is required.';
    if (!formData.city.trim()) errors.city = 'City is required.';
    if (!formData.state.trim()) errors.state = 'State is required.';
    if (!formData.pincode.trim()) errors.pincode = 'Postal code / pincode is required.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0 && !placedOrder) {
      toast.error('Your cart is empty. Please add products before checking out.');
      navigate('/shop');
      return;
    }

    if (!validateForm()) {
      toast.error('Please complete all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate swift frontend payment verification
    setTimeout(() => {
      const newOrder = placeOrder({
        items: cartItems,
        shippingAddress: formData,
        paymentMethod: paymentMethod,
        pricing: { subtotal, discount, delivery, tax, total },
      });

      // Clear cart
      clearCart();

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Fallback gracefully
      }

      setPlacedOrder(newOrder);
      setIsSubmitting(false);
      toast.success(`Order ${newOrder.id} placed successfully!`);
    }, 800);
  };

  // ORDER CONFIRMATION SCREEN
  if (placedOrder) {
    return (
      <div className="checkout-page container" style={{ paddingBottom: '80px' }}>
        <Breadcrumb items={[{ label: 'Checkout', link: '/checkout' }, { label: 'Order Confirmation' }]} />

        <div
          className="card"
          style={{
            maxWidth: '680px',
            margin: '30px auto',
            padding: '48px 32px',
            textAlign: 'center',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: 'var(--success-light)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 0 0 10px rgba(16, 185, 129, 0.12)',
            }}
          >
            <FiCheckCircle size={44} />
          </div>

          <span
            style={{
              fontSize: '0.84rem',
              fontWeight: 700,
              color: 'var(--success)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Order Confirmed!
          </span>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>
            Thank You For Your Order
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '28px' }}>
            We've received your order <strong>#{placedOrder.id}</strong>. A confirmation SMS and email have been dispatched to <strong>{placedOrder.shippingAddress.phone}</strong>.
          </p>

          {/* Order Details Brief Box */}
          <div
            style={{
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              textAlign: 'left',
              marginBottom: '32px',
              border: '1px solid var(--border-color)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Order ID</div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{placedOrder.id}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Amount</div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary)' }}>
                  {formatPrice(placedOrder.pricing.total)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Payment Method</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{placedOrder.paymentMethod}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Estimated Delivery</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--success)' }}>
                  3-4 Business Days
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                Delivering to:
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                <strong>{placedOrder.shippingAddress.fullName}</strong> — {placedOrder.shippingAddress.address}, {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state} {placedOrder.shippingAddress.pincode}
              </div>
            </div>
          </div>

          {/* Action Navigation */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={`/orders/${placedOrder.id}`} className="btn btn-primary btn-lg">
              <FiPackage size={18} />
              <span>Track Order Live</span>
            </Link>
            <Link to="/shop" className="btn btn-secondary btn-lg">
              <span>Continue Shopping</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no order placed yet
  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '12px' }}>
          Your Cart is Empty
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Add items to your cart before proceeding to checkout.
        </p>
        <Link to="/shop" className="btn btn-primary">
          <FiArrowLeft size={16} />
          <span>Browse Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Cart', link: '/cart' }, { label: 'Checkout' }]} />

      <h1 className="heading-section" style={{ marginBottom: '8px' }}>
        Secure Checkout
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '32px' }}>
        Complete your delivery details and choose your preferred payment option.
      </p>

      <form onSubmit={handlePlaceOrder}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '36px',
            alignItems: 'flex-start',
          }}
          className="checkout-grid"
        >
          {/* LEFT COLUMN: Customer Info + Payment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Step 1: Customer Information */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  1
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Shipping & Delivery Details</h2>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                }}
              >
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Johnson"
                    className={`form-input ${formErrors.fullName ? 'is-invalid' : ''}`}
                  />
                  {formErrors.fullName && <div className="form-error">{formErrors.fullName}</div>}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210"
                    className={`form-input ${formErrors.phone ? 'is-invalid' : ''}`}
                  />
                  {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
                </div>
              </div>

              {/* Address */}
              <div className="form-group">
                <label className="form-label">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House / Apartment no, Street Name"
                  className={`form-input ${formErrors.address ? 'is-invalid' : ''}`}
                />
                {formErrors.address && <div className="form-error">{formErrors.address}</div>}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '16px',
                }}
              >
                {/* City */}
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className={`form-input ${formErrors.city ? 'is-invalid' : ''}`}
                  />
                  {formErrors.city && <div className="form-error">{formErrors.city}</div>}
                </div>

                {/* State */}
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className={`form-input ${formErrors.state ? 'is-invalid' : ''}`}
                  />
                  {formErrors.state && <div className="form-error">{formErrors.state}</div>}
                </div>

                {/* Pincode */}
                <div className="form-group">
                  <label className="form-label">Pincode / Zip *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    className={`form-input ${formErrors.pincode ? 'is-invalid' : ''}`}
                  />
                  {formErrors.pincode && <div className="form-error">{formErrors.pincode}</div>}
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  2
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Choose Payment Method</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Online Payment Option */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'online' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: paymentMethod === 'online' ? 'var(--primary-light)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        Online Payment (Prepaid Mock)
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Credit/Debit Card, UPI, Netbanking, Apple Pay
                      </div>
                    </div>
                  </div>
                  <FiCreditCard size={22} color="var(--primary)" />
                </label>

                {/* Cash on Delivery Option */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'cod' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: paymentMethod === 'cod' ? 'var(--primary-light)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        Cash on Delivery (COD)
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Pay in cash or digital scan when your package arrives
                      </div>
                    </div>
                  </div>
                  <FiDollarSign size={22} color="var(--success)" />
                </label>
              </div>

              <div
                style={{
                  marginTop: '20px',
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-muted)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <FiShield size={16} color="var(--primary)" />
                <span>Frontend demonstration checkout. No actual bank charges will occur.</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Step 2: Order Summary */}
          <div className="card" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
              Order Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Items mini list */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxHeight: '260px',
                overflowY: 'auto',
                marginBottom: '20px',
                paddingRight: '6px',
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.88rem',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      border: '1px solid var(--border-color)',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.name}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, flexShrink: 0 }}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '16px',
                marginBottom: '20px',
                fontSize: '0.9rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span>{delivery === 0 ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : formatPrice(delivery)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div
                style={{
                  height: '1px',
                  backgroundColor: 'var(--border-color)',
                  margin: '4px 0',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                }}
              >
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginBottom: '14px' }}
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order • {formatPrice(total)}</span>
                  <FiArrowRight size={18} />
                </>
              )}
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: 'var(--text-light)',
              }}
            >
              <FiShield size={14} color="var(--success)" />
              <span>30-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </form>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
