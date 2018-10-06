import {VPaneTocCategoryEntry, VPaneTocCategoryEntryProps} from "./VPaneTocCategoryEntry";
import React from "react";

export interface VPaneTocCategoryProps {
  name: string;
  isActive: boolean;
  entries: ReadonlyArray<VPaneTocCategoryEntryProps>;
}

export const VPaneTocCategory = ({name, isActive, entries}: VPaneTocCategoryProps) => (
  <label className="toc-category">
    <input type="radio" hidden name="toc-category-expanded" checked={isActive}/>
    <div className={`toc-category-name-wrapper ${isActive ? "active" : ""}`}>
      <div className="toc-category-name">{name}</div>
    </div>
    <ul className="toc-category-entries">
      {entries.map(e => <VPaneTocCategoryEntry {...e}/>)}
    </ul>
  </label>
);
