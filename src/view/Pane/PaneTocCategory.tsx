import React from 'react';

export const PaneTocCategory = ({
  isActive,
  Entries,
  name,
}: {
  isActive: boolean;
  Entries: JSX.Element[];
  name: string;
}) => (
  <label className="toc-category">
    <input type="radio" hidden name="toc-category-expanded" checked={isActive}/>
    <div className={`toc-category-name-wrapper ${isActive ? 'active' : ''}`}>
      <div className="toc-category-name">{name}</div>
    </div>
    <ul className="toc-category-entries">{Entries}</ul>
  </label>
);
