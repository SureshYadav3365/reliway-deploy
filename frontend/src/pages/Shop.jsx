import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FiFilter,
  FiX,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiRotateCcw,
  FiSliders,
  FiCheck,
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { QuickViewContext } from '../layouts/RootLayout';

const ITEMS_PER_PAGE = 8;

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openQuickView } = useContext(QuickViewContext) || {};

  // URL state sync
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'popular';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState('All'); // 'All', 'under-50', '50-150', '150-300', '300-plus'
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL search query or category changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const search = searchParams.get('search');
    if (search !== null) setSearchQuery(search);
    const sort = searchParams.get('sort');
    if (sort) setSortBy(sort);
  }, [searchParams]);

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const brandsSet = new Set(products.map((p) => p.brand));
    return ['All', ...Array.from(brandsSet).sort()];
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesTags = product.tags && product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesTags) {
          return false;
        }
      }
      // Price range filter
      if (priceRange === 'under-50' && product.price >= 50) return false;
      if (priceRange === '50-150' && (product.price < 50 || product.price > 150)) return false;
      if (priceRange === '150-300' && (product.price < 150 || product.price > 300)) return false;
      if (priceRange === '300-plus' && product.price < 300) return false;

      // Rating filter
      if (minRating > 0 && product.rating < minRating) return false;

      // In stock only filter
      if (inStockOnly && product.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // default: popular (best sellers & reviews count)
      return (b.reviews || 0) - (a.reviews || 0);
    });
  }, [selectedCategory, selectedBrand, searchQuery, priceRange, minRating, inStockOnly, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, searchQuery, priceRange, minRating, inStockOnly, sortBy]);

  // Pagination calculations
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSearchQuery('');
    setPriceRange('All');
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('popular');
    setSearchParams({});
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    if (categoryName === 'All') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('category');
      setSearchParams(newParams);
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), category: categoryName });
    }
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedBrand !== 'All' ||
    searchQuery.trim() !== '' ||
    priceRange !== 'All' ||
    minRating > 0 ||
    inStockOnly;

  return (
    <div className="shop-page container" style={{ paddingBottom: '60px' }}>
      <Breadcrumb items={[{ label: 'Shop All Products' }]} />

      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '28px',
        }}
      >
        <h1 className="heading-section">Shop Collection</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Explore 30+ top-rated items with authentic warranty and express courier delivery.
        </p>
      </div>

      {/* Main Layout: Sidebar Filters + Products Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }} className="shop-layout">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="shop-sidebar card" style={{ padding: '24px', height: 'fit-content' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
              <FiSliders size={18} color="var(--primary)" />
              <span>Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--danger)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 600,
                }}
              >
                <FiRotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Filter */}
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ marginBottom: '8px' }}>
              Search Keywords
            </label>
            <div style={{ position: 'relative' }}>
              <FiSearch
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Product, brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '36px', fontSize: '0.88rem' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8',
                  }}
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ marginBottom: '10px' }}>
              Categories
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => handleCategorySelect('All')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  fontWeight: selectedCategory === 'All' ? 700 : 500,
                  backgroundColor: selectedCategory === 'All' ? 'var(--primary-light)' : 'transparent',
                  color: selectedCategory === 'All' ? 'var(--primary)' : 'var(--text-main)',
                  textAlign: 'left',
                }}
              >
                <span>All Categories</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>({products.length})</span>
              </button>

              {categories.map((cat) => {
                const count = products.filter((p) => p.category.toLowerCase() === cat.slug.toLowerCase()).length;
                const isSelected = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent',
                      color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                      textAlign: 'left',
                    }}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand Filter */}
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ marginBottom: '8px' }}>
              Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="form-select"
              style={{ fontSize: '0.88rem' }}
            >
              {allBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand === 'All' ? 'All Brands' : brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ marginBottom: '10px' }}>
              Price Range
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { id: 'All', label: 'All Prices' },
                { id: 'under-50', label: 'Under $50' },
                { id: '50-150', label: '$50 to $150' },
                { id: '150-300', label: '$150 to $300' },
                { id: '300-plus', label: 'Over $300' },
              ].map((range) => (
                <label
                  key={range.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    color: priceRange === range.id ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: priceRange === range.id ? 600 : 400,
                  }}
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === range.id}
                    onChange={() => setPriceRange(range.id)}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ marginBottom: '10px' }}>
              Customer Rating
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { value: 0, label: 'All Ratings' },
                { value: 4.8, label: '4.8 ★ & above' },
                { value: 4.5, label: '4.5 ★ & above' },
                { value: 4.0, label: '4.0 ★ & above' },
              ].map((item) => (
                <label
                  key={item.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    color: minRating === item.value ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: minRating === item.value ? 600 : 400,
                  }}
                >
                  <input
                    type="radio"
                    name="ratingFilter"
                    checked={minRating === item.value}
                    onChange={() => setMinRating(item.value)}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
              />
              <span>In Stock Items Only</span>
            </label>
          </div>
        </aside>

        {/* PRODUCTS AREA */}
        <div>
          {/* Top Sort & Count Bar */}
          <div
            className="card"
            style={{
              padding: '12px 18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {/* Count */}
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Showing{' '}
              <strong style={{ color: 'var(--text-main)' }}>
                {totalItems === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)}
              </strong>{' '}
              of <strong style={{ color: 'var(--text-main)' }}>{totalItems}</strong> products
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Mobile Filter Toggle Button */}
              <button
                className="mobile-filter-trigger btn btn-secondary btn-sm"
                onClick={() => setMobileFilterOpen(true)}
                style={{ display: 'none' }}
              >
                <FiFilter size={14} />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>

              {/* Sort By Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.86rem',
                    width: 'auto',
                    minWidth: '150px',
                  }}
                >
                  <option value="popular">Popularity</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters Badges */}
          {hasActiveFilters && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Active filters:
              </span>
              {selectedCategory !== 'All' && (
                <span className="badge badge-primary" style={{ padding: '4px 10px', gap: '6px' }}>
                  Category: {selectedCategory}
                  <FiX size={12} style={{ cursor: 'pointer' }} onClick={() => handleCategorySelect('All')} />
                </span>
              )}
              {selectedBrand !== 'All' && (
                <span className="badge badge-primary" style={{ padding: '4px 10px', gap: '6px' }}>
                  Brand: {selectedBrand}
                  <FiX size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedBrand('All')} />
                </span>
              )}
              {searchQuery && (
                <span className="badge badge-primary" style={{ padding: '4px 10px', gap: '6px' }}>
                  "{searchQuery}"
                  <FiX size={12} style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
                </span>
              )}
              {priceRange !== 'All' && (
                <span className="badge badge-primary" style={{ padding: '4px 10px', gap: '6px' }}>
                  Price: {priceRange}
                  <FiX size={12} style={{ cursor: 'pointer' }} onClick={() => setPriceRange('All')} />
                </span>
              )}
              {minRating > 0 && (
                <span className="badge badge-primary" style={{ padding: '4px 10px', gap: '6px' }}>
                  ★ {minRating}+
                  <FiX size={12} style={{ cursor: 'pointer' }} onClick={() => setMinRating(0)} />
                </span>
              )}
              {inStockOnly && (
                <span className="badge badge-primary" style={{ padding: '4px 10px', gap: '6px' }}>
                  In Stock Only
                  <FiX size={12} style={{ cursor: 'pointer' }} onClick={() => setInStockOnly(false)} />
                </span>
              )}
              <button
                onClick={resetAllFilters}
                style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: 600, marginLeft: '6px' }}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid or Empty State */}
          {paginatedProducts.length > 0 ? (
            <div className="grid-3" style={{ marginBottom: '36px' }}>
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={openQuickView}
                />
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div
              className="card"
              style={{
                padding: '60px 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px 0',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-light)',
                  marginBottom: '16px',
                }}
              >
                <FiSearch size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                No Products Found
              </h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.92rem',
                  maxWidth: '420px',
                  marginBottom: '20px',
                }}
              >
                We couldn't find any products matching your active filters or keyword search. Try broadening your criteria.
              </p>
              <button onClick={resetAllFilters} className="btn btn-primary">
                <FiRotateCcw size={16} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '32px',
              }}
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-secondary btn-sm"
                style={{
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                <FiChevronLeft size={16} />
                <span>Previous</span>
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      backgroundColor: isActive ? 'var(--primary)' : '#ffffff',
                      color: isActive ? '#ffffff' : 'var(--text-main)',
                      border: isActive ? 'none' : '1px solid var(--border-color)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-secondary btn-sm"
                style={{
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                }}
              >
                <span>Next</span>
                <FiChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTERS DRAWER */}
      {mobileFilterOpen && (
        <div
          onClick={() => setMobileFilterOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end',
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
              padding: '24px',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
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
                <FiX size={18} />
              </button>
            </div>

            {/* Mobile Categories */}
            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="form-select"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Brand */}
            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="form-select"
              >
                {allBrands.map((b) => (
                  <option key={b} value={b}>
                    {b === 'All' ? 'All Brands' : b}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Price */}
            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="form-select"
              >
                <option value="All">All Prices</option>
                <option value="under-50">Under $50</option>
                <option value="50-150">$50 to $150</option>
                <option value="150-300">$150 to $300</option>
                <option value="300-plus">Over $300</option>
              </select>
            </div>

            {/* Mobile In Stock */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                />
                <span>In Stock Only</span>
              </label>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Apply Filters ({totalItems} results)
              </button>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  Reset All
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS for responsive layout */}
      <style>{`
        @media (max-width: 900px) {
          .shop-layout {
            grid-template-columns: 1fr !important;
          }
          .shop-sidebar {
            display: none !important;
          }
          .mobile-filter-trigger {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Shop;
