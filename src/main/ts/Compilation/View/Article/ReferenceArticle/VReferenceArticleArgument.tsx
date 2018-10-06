import * as React from "react";

export interface VReferenceArticleArgumentProps {
  name: string;
  // description: TextOrHTML;
  // TODO
  description: string;
}

export const VReferenceArticleArgument = ({name, description}: VReferenceArticleArgumentProps) => (
  // Use div instead of p as p doesn't support some types of children elements
  // TODO Don't wrap in div because it's no longer necessary and Firefox doesn't support it
  <div>
    <dt className="argument-name">{name}</dt>
    <dd>
      <div className="argument-description">{description}</div>
    </dd>
  </div>
);
