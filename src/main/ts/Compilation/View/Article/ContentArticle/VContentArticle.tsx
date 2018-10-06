import {VArticleHeader, VArticleHeaderProps} from "../VArticleHeader";
import {VArticleFooter, VArticleFooterProps} from "../VArticleFooter";
import React from "react";

export interface VContentArticleProps {
  // TODO content: TextOrHTML;
  header: VArticleHeaderProps;
  footer: VArticleFooterProps;
  content: string;
}

export const VContentArticle = ({content, header, footer}: VContentArticleProps) => (
  // TODO Use better wrapper tag than div
  <div>
    <VArticleHeader {...header}/>
    <section>${content}</section>
    <VArticleFooter {...footer}/>
  </div>
);
