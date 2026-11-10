import React from 'react';

export default function CategoryItem({ title, iconAsset, onTap }) {
  return (
    <div className="category-circle-item" onClick={onTap}>
      <div className="category-circle-icon">
        <img
          src={iconAsset}
          alt={title}
          onError={(e) => {
            e.target.src = '/assets/icons/studio.png';
          }}
        />
      </div>
      <span className="category-circle-label">{title}</span>
    </div>
  );
}
