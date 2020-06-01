import React from 'react';

export enum ArticleNavigatorDirection {
  PREV, NEXT,
}

export const ArticleNavigator = ({
  dir,
  href,
  name,
}: {
  dir: ArticleNavigatorDirection;
  href: string;
  name: string;
}) => (
  <a href={href} title={`${dir == ArticleNavigatorDirection.PREV ? 'Previous' : 'Next'} article`}>
    {dir == ArticleNavigatorDirection.PREV ? '&lt;   ' : ''}
    {name}
    {dir == ArticleNavigatorDirection.NEXT ? '   &gt;' : ''}
  </a>
);
