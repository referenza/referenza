import {cls} from 'extlib/js/dom/classname';
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
  <a
    className={cls('Entry', isActive && 'EntryActive')}
    title={description}
    href={isActive ? '#' : url}
  >{name}</a>
);

export const TocCategory = ({
  Entries,
  name,
}: {
  Entries: JSX.Element[];
  name: string;
}) => (
  <label className="Category">
    <div className="CategoryName">{name}</div>
    <div className="CategoryEntries">{Entries}</div>
  </label>
);

export const Toc = ({
  Entries,
}: {
  Entries: JSX.Element[];
}) => (
  <div className={cls('Toc', 'NoSelect')}>
    <input className="Search" placeholder="Search for an article" title="Search for an article"/>
    <div className="Entries">
      {Entries}
    </div>
  </div>
);
