import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: '14px 0',
        marginBottom: '20px',
        fontSize: '0.85rem',
      }}
    >
      <ol style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.2s',
            }}
          >
            <FiHome size={14} />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: isLast ? 'var(--text-main)' : 'var(--text-muted)',
                fontWeight: isLast ? 600 : 400,
              }}
            >
              <FiChevronRight size={13} color="#94a3b8" />
              {item.link && !isLast ? (
                <Link
                  to={item.link}
                  style={{
                    color: 'var(--text-muted)',
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: isLast ? 'var(--text-main)' : 'var(--text-muted)' }}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
