import React from 'react';

export const TocEntry = ({
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

export const TocCategory = ({
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

export const Toc = ({
  Entries,
}: {
  Entries: JSX.Element[];
}) => (
  <div className="referenza-toc-container">
    <label id="toc-search-wrapper">
      <input id="toc-search" placeholder="Search for an article" title="Search for an article"/>
    </label>
    <div id="toc-categories">
      {Entries}
    </div>
  </div>
);
