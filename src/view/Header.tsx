import React from 'react';

export const Header = ({
  category,
  name,
}: {
  category: string;
  name: string;
}) => (
  <header>
    <a href="#referenza-toc" className="category"><span className="category-label">In category: </span>{category}</a>
    <h1>${name}</h1>
  </header>
);
