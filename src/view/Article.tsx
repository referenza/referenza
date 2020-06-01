import React from 'react';

export const Article = ({
  Content,
  Footer,
  Header,
  scriptUrl,
  styleUrl,
  Toc,
}: {
  Content: JSX.Element;
  Footer: JSX.Element;
  Header: JSX.Element;
  scriptUrl: string;
  styleUrl: string;
  Toc: JSX.Element;
}) => (
  <div className="Referenza">
    {Toc}
    <article className="ArticleContent">
      {Header}
      {Content}
      {Footer}
    </article>
    <link rel="stylesheet" href={styleUrl}/>
    <script defer src={scriptUrl}/>
  </div>
);
