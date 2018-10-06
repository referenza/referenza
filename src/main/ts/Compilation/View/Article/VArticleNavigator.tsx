import React from "react";

export enum VArticleNavigatorDirection {
  PREV, NEXT,
}

export interface VArticleNavigatorProps {
  dir: VArticleNavigatorDirection;
  href: string;
  name: string;
}

export const VArticleNavigator = ({href, dir, name}: VArticleNavigatorProps) => (
  <a href={href} title={`${dir == VArticleNavigatorDirection.PREV ? "Previous" : "Next"} article`}>{
    dir == VArticleNavigatorDirection.PREV ? "&lt;   " : ""}{
    name}{
    dir == VArticleNavigatorDirection.NEXT ? "   &gt;" : ""
  }</a>
);
