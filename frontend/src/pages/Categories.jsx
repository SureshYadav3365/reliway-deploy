import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiGrid } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import { categories } from '../data/categories';
import { products } from '../data/products';

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categorySlug) => {
    navigate(`/shop?category=${encodeURIComponent(categorySlug)}`);
  };

  return (
    <div className="categories-page container" style={{ paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Categories' }]} />

      <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 48px' }}>
        <span className="section-tag" style={{ margin: '0 auto 12px' }}>
          <FiGrid size={14} />
          <span>Curated Departments</span>
        </span>
        <h1 className="heading-section" style={{ marginBottom: '12px' }}>
          Explore By Category
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Browse our comprehensive selection of top-tier electronics, fashion, lifestyle, and home gear curated for premium quality.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
        }}
      >
        {categories.map((cat) => {
          const productCount = products.filter(
            (p) => p.category.toLowerCase() === cat.slug.toLowerCase()
          ).length;

          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="card"
              style={{
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                const img = e.currentTarget.querySelector('.cat-card-img');
                if (img) img.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                const img = e.currentTarget.querySelector('.cat-card-img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Category Image Cover */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="cat-card-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                  }}
                >
                  {productCount || cat.itemCount} Items
                </div>
              </div>

              {/* Category Info */}
              <div style={{ padding: '22px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {cat.name}
                  </h2>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FiArrowRight size={16} />
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {cat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
