import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiPackage,
  FiArrowRight,
  FiClock,
  FiCheckCircle,
  FiShoppingBag,
} from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatCurrency';

const MyOrders = () => {
  const { orders } = useAuth();

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-page container" style={{ paddingBottom: '80px' }}>
        <Breadcrumb items={[{ label: 'My Orders' }]} />

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
            <FiPackage size={36} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>
            No Orders Placed Yet
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px', maxWidth: '400px' }}>
            When you purchase items from ShopEase, your orders and live tracking milestones will appear here.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            <span>Explore Products</span>
            <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'badge badge-success';
      case 'Shipped':
      case 'Out for Delivery':
        return 'badge badge-primary';
      case 'Cancelled':
        return 'badge badge-discount';
      default:
        return 'badge badge-warning';
    }
  };

  return (
    <div className="orders-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'My Orders' }]} />

      <div style={{ marginBottom: '28px' }}>
        <h1 className="heading-section">My Orders</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Track past and active purchases, review receipts, and monitor delivery timelines.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orders.map((order) => {
          const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <div key={order.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
              {/* Order Card Header */}
              <div
                style={{
                  padding: '16px 24px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Order Placed
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      {formattedDate}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Order ID
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary)' }}>
                      #{order.id}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Total
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {formatPrice(order.pricing.total)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className={getStatusBadgeClass(order.status)}>
                    {order.status}
                  </span>
                  <Link
                    to={`/orders/${order.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>View Order Details</span>
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Order Items List */}
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: 'var(--radius-sm)',
                            objectFit: 'cover',
                            backgroundColor: 'var(--bg-muted)',
                            border: '1px solid var(--border-color)',
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
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                            Qty: <strong>{item.quantity}</strong> • {formatPrice(item.price)} each
                          </div>
                        </div>
                      </div>

                      <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking Progress Snippet */}
                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    fontSize: '0.85rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                    <FiClock size={15} color="var(--primary)" />
                    <span>Payment: <strong>{order.paymentStatus}</strong> ({order.paymentMethod})</span>
                  </div>

                  <Link
                    to={`/orders/${order.id}`}
                    style={{
                      color: 'var(--primary)',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Track Live Timeline</span>
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
