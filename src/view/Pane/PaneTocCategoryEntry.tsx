import React from 'react';

export const PaneTocCategoryEntry = ({
  description,
  isActive,
  name,
  url,
}: {
  description: string;
  isActive: boolean;
  name: string;
  url: string;
}) => (
  <li className={`toc-category-entry ${isActive ? 'active' : ''}`} title={description}>
    <a href={isActive ? '#' : url}>{name}</a>
  </li>
);
