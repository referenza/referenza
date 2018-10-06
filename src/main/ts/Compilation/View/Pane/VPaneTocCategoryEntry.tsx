import React from "react";

export interface VPaneTocCategoryEntryProps {
  URL: string;
  name: string;
  description: string;
  isActive: boolean;
}

export const VPaneTocCategoryEntry = ({URL, name, isActive, description}: VPaneTocCategoryEntryProps) => (
  <li className={`toc-category-entry ${isActive ? "active" : ""}`} title={description}>
    <a href={isActive ? "#" : URL}>{name}</a>
  </li>
);
