import React from 'react';

export const Header = ({
  category,
  name,
}: {
  category: string;
  name: string;
}) => (
  <header className="Header">
    <button className="OpenToc"><span className="Category">In category: </span>{category}</button>
    <h1 className="Title">${name}</h1>
  </header>
);
