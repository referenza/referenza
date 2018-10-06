import {VContentArticle, VContentArticleProps} from "./ContentArticle/VContentArticle";
import {VReferenceArticle, VReferenceArticleProps} from "./ReferenceArticle/VReferenceArticle";
import React from "react";

export type VArticleProps = VContentArticleProps | VReferenceArticleProps;

export const VArticle = (props: VArticleProps) => {
  if ("content" in props) {
    return <VContentArticle {...props}/>;
  } else {
    return <VReferenceArticle {...props}/>;
  }
};
