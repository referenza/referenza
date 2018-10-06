import * as React from "react";

export interface VReferenceArticleReturnProps {
  // TODO value: TextOrHTML;
  value: string;
}

export const VReferenceArticleReturn = ({value}: VReferenceArticleReturnProps) => (
  <li>{value}</li>
);
