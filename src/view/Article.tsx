import React from 'react';

export const Article = ({
  Content,
  Toc,
}: {
  Content: JSX.Element;
  Toc: JSX.Element;
}) => (
  <div id="article">
    {Toc}
    <article id="contents">
      {Content}
    </article>
  </div>
);
