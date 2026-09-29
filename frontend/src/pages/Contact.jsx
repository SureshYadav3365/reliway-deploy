import React, { useState } from 'react';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiMessageSquare,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) {
      err.name = 'Please enter your name.';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      err.phone = 'Please enter your phone number.';
    } else if (cleanPhone.length < 10) {
      err.phone = 'Please provide a valid 10-digit phone number.';
    }
    if (!formData.message.trim()) {
      err.message = 'Please type your message or query.';
    } else if (formData.message.trim().length < 10) {
      err.message = 'Message must be at least 10 characters.';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Thank you! Your message has been transmitted to our support team.');
      setFormData({ name: '', phone: '', message: '' });
    }, 600);
  };

  return (
    <div className="contact-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
        <span className="section-tag" style={{ margin: '0 auto 12px' }}>
          <FiMessageSquare size={13} />
          <span>Support Desk</span>
        </span>
        <h1 className="heading-section" style={{ marginBottom: '12px' }}>
          We'd Love to Hear From You
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Have a question about a product, delivery timeline, or an existing order? Our dedicated support team is here to help.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
        }}
      >
        {/* Contact Information & Channels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
              Direct Support Channels
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FiPhone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Toll-Free Phone
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                    +1 (800) 456-7890
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '2px' }}>
                    Available Mon–Sat: 8 AM – 8 PM EST
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#ecfdf5',
                    color: 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FiMail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Email Assistance
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                    support@shopease.com
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '2px' }}>
                    Average response time under 2 hours
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#fff7ed',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FiMapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Headquarters
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                    100 Marketplace Blvd, Suite 400
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    San Francisco, CA 94105, United States
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card"
            style={{
              padding: '24px',
              backgroundColor: 'var(--bg-muted)',
              border: '1px solid var(--border-color)',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>
              Quick FAQ Notice
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              For quick status checks regarding package delivery, you can also view real-time updates directly on your <a href="/orders" style={{ color: 'var(--primary)', fontWeight: 600 }}>My Orders</a> tracking timeline.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card" style={{ padding: '36px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>
            Send Us a Message
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Fill out the details below and an associate will get back to you promptly.
          </p>

          {isSubmitted ? (
            <div
              style={{
                backgroundColor: 'var(--success-light)',
                border: '1px solid #a7f3d0',
                borderRadius: 'var(--radius-md)',
                padding: '28px',
                textAlign: 'center',
              }}
            >
              <FiCheckCircle size={40} color="var(--success)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#065f46', marginBottom: '6px' }}>
                Message Dispatched!
              </h3>
              <p style={{ color: '#047857', fontSize: '0.92rem', marginBottom: '20px' }}>
                Thank you for reaching out. We have logged your query and will contact you via phone or email within 2 business hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn btn-primary btn-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rachel Adams"
                  className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                />
                {errors.phone && <div className="form-error">{errors.phone}</div>}
              </div>

              {/* Message */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Message *</label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can our support specialists assist you today?"
                  className={`form-textarea ${errors.message ? 'is-invalid' : ''}`}
                />
                {errors.message && <div className="form-error">{errors.message}</div>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <FiSend size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
