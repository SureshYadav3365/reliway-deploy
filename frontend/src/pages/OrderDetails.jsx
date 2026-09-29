import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiCheck,
  FiPackage,
  FiTruck,
  FiMapPin,
  FiClock,
  FiCreditCard,
  FiArrowLeft,
  FiCheckCircle,
  FiShoppingBag,
} from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import { ORDER_STATUS_STEPS } from '../data/mockOrders';
import { formatPrice } from '../utils/formatCurrency';

const OrderDetails = () => {
  const { id } = useParams();
  const { getOrderById } = useAuth();

  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '12px' }}>
          Order Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          We could not locate an order matching ID #{id}.
        </p>
        <Link to="/orders" className="btn btn-primary">
          <FiArrowLeft size={16} />
          <span>Back to All Orders</span>
        </Link>
      </div>
    );
  }

  // Determine current step index in ORDER_STATUS_STEPS
  const currentStepIndex = ORDER_STATUS_STEPS.indexOf(order.status) !== -1
    ? ORDER_STATUS_STEPS.indexOf(order.status)
    : (order.currentStep || 0);

  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="order-details-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb
        items={[
          { label: 'My Orders', link: '/orders' },
          { label: `Order #${order.id}` },
        ]}
      />

      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="heading-section" style={{ margin: 0 }}>
              Order #{order.id}
            </h1>
            <span
              className="badge badge-primary"
              style={{ padding: '4px 12px', fontSize: '0.82rem' }}
            >
              {order.status}
            </span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
            Placed on <strong>{formattedDate}</strong>
          </div>
        </div>

        <Link to="/orders" className="btn btn-secondary btn-sm">
          <FiArrowLeft size={14} />
          <span>Back to Orders</span>
        </Link>
      </div>

      {/* ORDER TRACKING TIMELINE */}
      <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '28px' }}>
          Live Order Tracking Status
        </h2>

        {/* Timeline Bar (Desktop & Tablet Horizontal Steps) */}
        <div className="timeline-horizontal" style={{ position: 'relative', marginBottom: '40px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${ORDER_STATUS_STEPS.length}, 1fr)`,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {ORDER_STATUS_STEPS.map((stepName, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={stepName}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Step Bubble Icon */}
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted ? 'var(--primary)' : '#ffffff',
                      color: isCompleted ? '#ffffff' : '#94a3b8',
                      border: isCompleted ? 'none' : '2px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      boxShadow: isCurrent ? '0 0 0 6px var(--primary-glow)' : 'none',
                      transition: 'all 0.3s',
                      marginBottom: '10px',
                    }}
                  >
                    {isCompleted ? <FiCheck size={18} /> : idx + 1}
                  </div>

                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: isCompleted ? 700 : 500,
                      color: isCompleted ? 'var(--text-main)' : 'var(--text-light)',
                    }}
                  >
                    {stepName}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Timeline Connector Line */}
          <div
            style={{
              position: 'absolute',
              top: '19px',
              left: '5%',
              right: '5%',
              height: '3px',
              backgroundColor: '#e2e8f0',
              zIndex: 1,
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: 'var(--primary)',
                width: `${(currentStepIndex / (ORDER_STATUS_STEPS.length - 1)) * 100}%`,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>

        {/* Detailed Timeline Milestone Log */}
        {order.trackingHistory && (
          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              Tracking History Milestones
            </h3>

            {order.trackingHistory.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  fontSize: '0.88rem',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: idx <= currentStepIndex ? 'var(--primary)' : '#cbd5e1',
                    marginTop: '5px',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <strong style={{ color: 'var(--text-main)' }}>{item.title}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.time}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
                    {item.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Order Details Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '32px',
          alignItems: 'flex-start',
        }}
        className="order-info-grid"
      >
        {/* Left: Items List */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>
            Purchased Products ({order.items.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '20px',
                  borderBottom: idx < order.items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-muted)',
                    }}
                  />
                  <div>
                    <Link
                      to={`/product/${item.id}`}
                      style={{
                        fontWeight: 700,
                        fontSize: '0.96rem',
                        color: 'var(--text-main)',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      {item.name}
                    </Link>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                      Quantity: <strong>{item.quantity}</strong> × {formatPrice(item.price)}
                    </div>
                  </div>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Payment & Delivery Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Shipping Address Box */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', fontWeight: 700 }}>
              <FiMapPin size={18} color="var(--primary)" />
              <span>Delivery Address</span>
            </div>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
              <strong>{order.shippingAddress.fullName}</strong>
              <br />
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
              <br />
              <span style={{ color: 'var(--text-muted)' }}>Phone: {order.shippingAddress.phone}</span>
            </div>
          </div>

          {/* Payment & Receipt Summary Box */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 700 }}>
              <FiCreditCard size={18} color="var(--primary)" />
              <span>Payment & Receipt</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Method:</span>
                <strong>{order.paymentMethod}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <span className="badge badge-success">{order.paymentStatus}</span>
              </div>
              <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
                <span>{formatPrice(order.pricing.subtotal)}</span>
              </div>
              {order.pricing.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                  <span>Discount:</span>
                  <span>-{formatPrice(order.pricing.discount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery:</span>
                <span>{order.pricing.delivery === 0 ? 'FREE' : formatPrice(order.pricing.delivery)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Taxes:</span>
                <span>{formatPrice(order.pricing.tax)}</span>
              </div>
              <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem' }}>
                <span>Grand Total:</span>
                <span style={{ color: 'var(--primary)' }}>{formatPrice(order.pricing.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .order-info-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderDetails;
