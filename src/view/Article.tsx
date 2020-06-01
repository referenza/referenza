import React from 'react';

export const Article = ({
  Content,
  scriptUrl,
  styleUrl,
  Toc,
}: {
  Content: JSX.Element;
  scriptUrl: string;
  styleUrl: string;
  Toc: JSX.Element;
}) => (
  <div className='Referenza'>
    {Toc}
    <article className='ArticleContent'>
      {Content}
    </article>
    <link rel="stylesheet" href={styleUrl}/>
    <script defer src={scriptUrl}/>
  </div>
);
