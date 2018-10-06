import {VArticleNavigator, VArticleNavigatorProps} from "./VArticleNavigator";
import React from "react";

export interface VArticleFooterProps {
  navPrev: VArticleNavigatorProps | null;
  navNext: VArticleNavigatorProps | null;
}

export const VArticleFooter = ({navPrev, navNext}: VArticleFooterProps) => (
  <footer>
    <div className="article-nav">
      <div className="article-nav-left">{navPrev && <VArticleNavigator {...navPrev}/>}</div>
      <div className="article-nav-right">{navNext && <VArticleNavigator {...navNext}/>}</div>
    </div>
  </footer>
);
