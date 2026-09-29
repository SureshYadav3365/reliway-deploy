import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiSettings,
  FiLogOut,
  FiEdit2,
  FiCheck,
  FiPlus,
  FiClock,
  FiArrowRight,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatCurrency';

const MyAccount = () => {
  const { currentUser, isAuthenticated, logout, updateProfile, orders } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'wishlist', 'addresses', 'settings'
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    state: currentUser?.state || '',
    pincode: currentUser?.pincode || '',
  });

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '12px' }}>
          Please Sign In
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          You need to be signed in to view your profile and order history.
        </p>
        <Link to="/login" className="btn btn-primary">
          <span>Go to Sign In</span>
          <FiArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  return (
    <div className="account-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'My Account' }]} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '32px',
          alignItems: 'flex-start',
        }}
        className="account-grid"
      >
        {/* SIDEBAR NAVIGATION */}
        <div className="card" style={{ padding: '24px' }}>
          {/* User Profile Mini Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              paddingBottom: '20px',
              marginBottom: '20px',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                {currentUser.fullName}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {currentUser.phone}
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  backgroundColor: 'var(--primary-light)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  marginTop: '4px',
                  display: 'inline-block',
                }}
              >
                Verified Customer
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'profile', label: 'Profile Information', icon: <FiUser size={18} /> },
              { id: 'orders', label: `My Orders (${orders.length})`, icon: <FiPackage size={18} /> },
              { id: 'wishlist', label: `Wishlist (${wishlistCount})`, icon: <FiHeart size={18} /> },
              { id: 'addresses', label: 'Saved Addresses', icon: <FiMapPin size={18} /> },
              { id: 'settings', label: 'Account Settings', icon: <FiSettings size={18} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'orders') {
                    navigate('/orders');
                  } else if (item.id === 'wishlist') {
                    navigate('/wishlist');
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: activeTab === item.id ? 700 : 500,
                  fontSize: '0.92rem',
                  color: activeTab === item.id ? 'var(--primary)' : 'var(--text-main)',
                  backgroundColor: activeTab === item.id ? 'var(--primary-light)' : 'transparent',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '8px 0' }} />

            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '0.92rem',
                color: 'var(--danger)',
                textAlign: 'left',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--danger-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <FiLogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div>
          {/* TAB: PROFILE INFORMATION */}
          {activeTab === 'profile' && (
            <div className="card" style={{ padding: '32px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '16px',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Profile Information</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    Manage your personal account credentials and contact details.
                  </p>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="btn btn-secondary btn-sm"
                  >
                    <FiEdit2 size={14} />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileSave}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '16px',
                    }}
                  >
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Default Street Address</label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '16px',
                    }}
                  >
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        value={profileForm.state}
                        onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pincode</label>
                      <input
                        type="text"
                        value={profileForm.pincode}
                        onChange={(e) => setProfileForm({ ...profileForm, pincode: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button type="submit" className="btn btn-primary">
                      <FiCheck size={16} />
                      <span>Save Changes</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  <div style={{ backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Full Name</div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '4px' }}>{currentUser.fullName}</div>
                  </div>
                  <div style={{ backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Phone Number</div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '4px' }}>{currentUser.phone}</div>
                  </div>
                  <div style={{ backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Email Address</div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '4px' }}>{currentUser.email || 'Not specified'}</div>
                  </div>
                  <div style={{ backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Primary Address</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '4px' }}>
                      {currentUser.address ? `${currentUser.address}, ${currentUser.city}, ${currentUser.state} ${currentUser.pincode}` : 'No default address specified yet'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="card" style={{ padding: '32px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '16px',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Saved Delivery Addresses</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    Addresses used for fast 1-click checkout.
                  </p>
                </div>
                <button
                  onClick={() => toast.success('Address modal simulated')}
                  className="btn btn-secondary btn-sm"
                >
                  <FiPlus size={14} />
                  <span>Add New Address</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div
                  style={{
                    border: '2px solid var(--primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px',
                    backgroundColor: 'var(--primary-light)',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      backgroundColor: 'var(--primary)',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    Default
                  </span>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px' }}>Home</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {currentUser.fullName}
                    <br />
                    {currentUser.address || '742 Evergreen Terrace, Apt 4B'}
                    <br />
                    {currentUser.city || 'Springfield'}, {currentUser.state || 'Oregon'} {currentUser.pincode || '97477'}
                    <br />
                    Phone: {currentUser.phone}
                  </div>
                </div>

                <div
                  style={{
                    border: '1px dashed var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    minHeight: '160px',
                  }}
                  onClick={() => toast('You can edit your primary address in Profile tab')}
                >
                  <FiPlus size={24} color="var(--primary)" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Add Alternative Address</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Office, family or friend</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="card" style={{ padding: '32px' }}>
              <div
                style={{
                  marginBottom: '24px',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '16px',
                }}
              >
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Account Settings</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Manage notifications and security preferences.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Order Status SMS Updates</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Receive live dispatch & delivery alerts on your phone</div>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                </label>

                <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Promotional Newsletters</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Get notified of seasonal flash drops and secret coupons</div>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                </label>

                <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

                <div style={{ paddingTop: '8px' }}>
                  <button
                    onClick={() => toast.success('Password reset link sent to registered phone number.')}
                    className="btn btn-secondary"
                  >
                    Change Account Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .account-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MyAccount;
