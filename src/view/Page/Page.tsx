import React from 'react';

export const Page = ({
  Article,
  TocEntries,
}: {
  Article: JSX.Element;
  TocEntries: JSX.Element[];
}) => (
  <div id="main">
    <nav id="pane" className="no-select">
      <label id="toc-search-wrapper">
        <input id="toc-search" placeholder="Search for an article" title="Search for an article"/>
      </label>
      <div id="toc-categories">
        {TocEntries}
      </div>
    </nav>

    <div id="article-container">
      <article id="article">
        {Article}
      </article>
    </div>
  </div>
);
