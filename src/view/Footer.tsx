import React from 'react';

export const Footer = ({
  next,
  prev,
}: {
  next?: {
    href: string;
    name: string;
  };
  prev?: {
    href: string;
    name: string;
  };
}) => (
  <footer>
    {prev && (
      <a href={prev.href} title="Previous article">{prev.name}   &gt;</a>
    )}
    {next && (
      <a href={next.href} title="Next article">&lt;   {next.name}</a>
    )}
  </footer>
);
