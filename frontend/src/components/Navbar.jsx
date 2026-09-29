import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiPackage,
  FiLogOut,
  FiGrid,
  FiTag,
  FiInfo,
  FiPhone,
  FiArrowRight,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const accountMenuRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setAccountDropdownOpen(false);
  }, [location.pathname]);

  // Scroll detection for enhanced sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Categories', path: '/categories' },
    { label: 'Offers', path: '/offers' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 500,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.94)' : '#ffffff',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.06)' : 'none',
          transition: 'all 0.25s ease',
        }}
      >
        {/* Top Announcement Bar */}
        <div
          style={{
            backgroundColor: '#0f172a',
            color: '#e2e8f0',
            fontSize: '0.78rem',
            padding: '6px 16px',
            textAlign: 'center',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          <span>🔥 Spring Festival Sale: Get up to 40% OFF with code <strong>EASE40</strong> | Free Express Delivery on $50+</span>
        </div>

        {/* Main Navbar Bar */}
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 'var(--navbar-height)',
              gap: '20px',
            }}
          >
            {/* Left: Mobile Menu Button & Brand Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                className="mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                style={{
                  display: 'none',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-main)',
                  backgroundColor: 'var(--bg-muted)',
                }}
              >
                {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>

              <Link
                to="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
                  }}
                >
                  <FiShoppingBag size={20} />
                </div>
                <span
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-main)',
                  }}
                >
                  Shop<span style={{ color: 'var(--primary)' }}>Ease</span>
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  style={({ isActive }) => ({
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--primary)' : 'var(--text-main)',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'color 0.2s',
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '2px',
                            backgroundColor: 'var(--primary)',
                            borderRadius: '2px',
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right: Actions (Search, Wishlist, Cart, Account) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Desktop Expandable Search Form */}
              <form
                onSubmit={handleSearchSubmit}
                className="desktop-search-form"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-muted)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 14px',
                  width: '230px',
                  transition: 'width 0.25s ease, background-color 0.2s',
                  border: '1px solid transparent',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.width = '280px';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.backgroundColor = '#fff';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.width = '230px';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
                }}
              >
                <FiSearch size={16} color="#64748b" style={{ marginRight: '8px', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '0.88rem',
                    width: '100%',
                    color: 'var(--text-main)',
                  }}
                />
              </form>

              {/* Mobile Search Toggle Icon */}
              <button
                className="mobile-search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                style={{
                  display: 'none',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  color: 'var(--text-main)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FiSearch size={20} />
              </button>

              {/* Wishlist Link with Badge */}
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                style={{
                  position: 'relative',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <FiHeart size={20} />
                {wishlistCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(239, 68, 68, 0.4)',
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Link with Badge */}
              <Link
                to="/cart"
                aria-label="Shopping Cart"
                style={{
                  position: 'relative',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <FiShoppingBag size={20} />
                {totalCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(37, 99, 235, 0.4)',
                    }}
                  >
                    {totalCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div ref={accountMenuRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-subtle)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                >
                  {isAuthenticated && currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.fullName}
                      style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FiUser size={14} />
                    </div>
                  )}
                  <span
                    className="account-label"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      maxWidth: '90px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isAuthenticated ? currentUser?.fullName.split(' ')[0] : 'Account'}
                  </span>
                  <FiChevronDown size={14} color="#64748b" />
                </button>

                {/* Dropdown Menu */}
                {accountDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      width: '220px',
                      backgroundColor: '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-xl)',
                      border: '1px solid var(--border-color)',
                      padding: '8px 0',
                      zIndex: 600,
                      animation: 'fadeIn 0.2s ease-out',
                    }}
                  >
                    {isAuthenticated ? (
                      <>
                        <div
                          style={{
                            padding: '10px 16px',
                            borderBottom: '1px solid var(--border-subtle)',
                            marginBottom: '4px',
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                            {currentUser?.fullName}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {currentUser?.phone}
                          </div>
                        </div>

                        <Link
                          to="/account"
                          onClick={() => setAccountDropdownOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '9px 16px',
                            fontSize: '0.88rem',
                            color: 'var(--text-main)',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-muted)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <FiUser size={16} color="var(--primary)" />
                          <span>My Profile</span>
                        </Link>

                        <Link
                          to="/orders"
                          onClick={() => setAccountDropdownOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '9px 16px',
                            fontSize: '0.88rem',
                            color: 'var(--text-main)',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-muted)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <FiPackage size={16} color="var(--primary)" />
                          <span>My Orders</span>
                        </Link>

                        <Link
                          to="/wishlist"
                          onClick={() => setAccountDropdownOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '9px 16px',
                            fontSize: '0.88rem',
                            color: 'var(--text-main)',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-muted)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <FiHeart size={16} color="#ef4444" />
                          <span>Wishlist ({wishlistCount})</span>
                        </Link>

                        <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '6px 0' }} />

                        <button
                          onClick={() => {
                            logout();
                            setAccountDropdownOpen(false);
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '9px 16px',
                            fontSize: '0.88rem',
                            color: 'var(--danger)',
                            transition: 'background-color 0.15s',
                            textAlign: 'left',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--danger-light)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <FiLogOut size={16} />
                          <span>Log Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div style={{ padding: '8px 16px', marginBottom: '4px' }}>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                            Welcome to ShopEase!
                          </p>
                        </div>
                        <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <Link
                            to="/login"
                            className="btn btn-primary btn-sm"
                            onClick={() => setAccountDropdownOpen(false)}
                            style={{ width: '100%' }}
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/register"
                            className="btn btn-secondary btn-sm"
                            onClick={() => setAccountDropdownOpen(false)}
                            style={{ width: '100%' }}
                          >
                            Create Account
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Input Drawer (Visible when searchOpen is true on mobile) */}
          {searchOpen && (
            <div
              style={{
                padding: '10px 0 16px 0',
                borderTop: '1px solid var(--border-color)',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                  autoFocus
                  style={{ flex: 1, padding: '9px 14px' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '9px 16px' }}>
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer Navigation (Backdrop + Slide-in Sidebar) */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            display: 'flex',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '85%',
              maxWidth: '340px',
              backgroundColor: '#ffffff',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)',
              animation: 'fadeIn 0.25s ease-out',
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 20px',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <FiShoppingBag size={18} />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>
                  Shop<span style={{ color: 'var(--primary)' }}>Ease</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--bg-muted)',
                }}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* User Greeting Box */}
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: 'var(--bg-subtle)',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              {isAuthenticated ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.fullName}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{currentUser?.fullName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentUser?.phone}</div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link
                    to="/login"
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Nav Links */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    color: 'var(--text-light)',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    marginBottom: '6px',
                  }}
                >
                  Menu
                </span>

                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--primary)' : 'var(--text-main)',
                      backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                    })}
                  >
                    <span>{link.label}</span>
                    <FiArrowRight size={14} color="#94a3b8" />
                  </NavLink>
                ))}
              </div>

              {/* Extra Account shortcuts if authenticated */}
              {isAuthenticated && (
                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      color: 'var(--text-light)',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      marginBottom: '6px',
                    }}
                  >
                    My Account
                  </span>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <FiUser size={16} color="var(--primary)" />
                    <span>Profile Details</span>
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <FiPackage size={16} color="var(--primary)" />
                    <span>Order History</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <FiHeart size={16} color="#ef4444" />
                    <span>My Wishlist ({wishlistCount})</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      color: 'var(--danger)',
                      fontSize: '0.92rem',
                      textAlign: 'left',
                      marginTop: '6px',
                    }}
                  >
                    <FiLogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Contact Quick Info */}
            <div
              style={{
                padding: '14px 20px',
                borderTop: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
              }}
            >
              <div>Need help? <strong>+1 (800) 456-7890</strong></div>
              <div>support@shopease.com</div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS for responsive navbar classes */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-search-form {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .mobile-search-btn {
            display: flex !important;
          }
          .account-label {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
