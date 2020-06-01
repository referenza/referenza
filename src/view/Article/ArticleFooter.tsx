import React from 'react';

export const ArticleFooter = ({
  NavNext,
  NavPrev,
}: {
  NavNext?: JSX.Element;
  NavPrev?: JSX.Element;
}) => (
  <footer>
    <div className="article-nav">
      <div className="article-nav-left">{NavPrev}</div>
      <div className="article-nav-right">{NavNext}</div>
    </div>
  </footer>
);
