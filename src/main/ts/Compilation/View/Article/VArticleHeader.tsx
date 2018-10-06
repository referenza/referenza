import React from "react";

export interface VArticleHeaderProps {
  category: string;
  name: string;
}

export const VArticleHeader = ({category, name}: VArticleHeaderProps) => (
  <header>
    <a href="#pane" className="category"><span className="category-label">In category: </span>{category}</a>
    <h1>${name}</h1>
  </header>
);
