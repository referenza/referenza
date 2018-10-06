import React from "react";

export interface VHeaderProjectMenuEntryProps {
  URL: string;
  name: string;
}

export const VHeaderProjectMenuEntry = ({URL, name}: VHeaderProjectMenuEntryProps) => (
  <li className="header-project-menu-entry">
    <a className="header-project-menu-entry-link" href={URL}>{name}</a>
  </li>
);
