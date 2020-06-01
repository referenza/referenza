import React from 'react';

export const ArticleHeader = ({
  category,
  name,
}: {
  category: string;
  name: string;
}) => (
  <header>
    <a href="#pane" className="category"><span className="category-label">In category: </span>{category}</a>
    <h1>${name}</h1>
  </header>
);
