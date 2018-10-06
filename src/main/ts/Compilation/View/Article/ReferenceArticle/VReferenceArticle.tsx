import {VReferenceArticleSignature, VReferenceArticleSignatureProps} from "./VReferenceArticleSignature";
import {VReferenceArticleArgument, VReferenceArticleArgumentProps} from "./VReferenceArticleArgument";
import {VReferenceArticleReturn, VReferenceArticleReturnProps} from "./VReferenceArticleReturn";
import {VArticleHeader, VArticleHeaderProps} from "../VArticleHeader";
import {VArticleFooter, VArticleFooterProps} from "../VArticleFooter";
import React from "react";

export interface VReferenceArticleProps {
  header: VArticleHeaderProps;
  footer: VArticleFooterProps;
  description: string;
  signatures: ReadonlyArray<VReferenceArticleSignatureProps>;
  parameters: ReadonlyArray<VReferenceArticleArgumentProps>;
  returns: ReadonlyArray<VReferenceArticleReturnProps>;
}

export const VReferenceArticle = ({header, description, signatures, parameters, returns, footer}: VReferenceArticleProps) => (
  // TODO Use better wrapper tag than div
  <div>
    <VArticleHeader {...header}/>

    <section className="section-synopsis">
      <h2>Synopsis</h2>
      <p className="description">{description}</p>
      {signatures.map(s => <VReferenceArticleSignature {...s}/>)}
    </section>

    {parameters.length && <section>
      <h2>Arguments</h2>
      <dl className="arguments-list">
        {parameters.map(p => <VReferenceArticleArgument{...p}/>)}
      </dl>
    </section>}

    {returns.length && <section>
      <h2>Returns</h2>
      <ul className="returns-list">
        {returns.map(r => <VReferenceArticleReturn {...r}/>)}
      </ul>
    </section>}

    <VArticleFooter {...footer}/>
  </div>
);
