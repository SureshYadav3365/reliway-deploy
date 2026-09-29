import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating = 0, reviewsCount = null, size = 14, showText = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4 && rating % 1 <= 0.8;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
      <div style={{ display: 'inline-flex', color: '#f59e0b', fontSize: `${size}px` }}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt key="half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
      {showText && (
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
          {Number(rating).toFixed(1)}
        </span>
      )}
      {reviewsCount !== null && (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
