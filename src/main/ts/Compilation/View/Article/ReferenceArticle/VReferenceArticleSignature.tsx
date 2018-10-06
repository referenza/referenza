import * as React from "react";

export interface VReferenceArticleSignatureProps {
  // TODO code: TextOrHTML;
  code: string;
}

export const VReferenceArticleSignature = ({code}: VReferenceArticleSignatureProps) => (
  <pre className="signature">{code}</pre>
);
