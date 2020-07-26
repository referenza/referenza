import {assertExists, exists, mapDefined} from 'extlib/js/optional/optional';
import React from 'react';
import {isParsedDir, ParsedPage} from './parse';
import {encodedPrefixedPath} from './path';
import {Article} from './view/Article';
import {Footer} from './view/Footer';
import {Header} from './view/Header';
import {Toc, TocCategory, TocEntry} from './view/Toc';

export const renderPage = ({
  page,
  prefix,
  scriptUrl,
  styleUrl,
}: {
  page: ParsedPage;
  prefix: string;
  scriptUrl: string;
  styleUrl: string;
}) => {
  // For the table of contents, we preferably want to generate two ancestor levels.
  // We should at the very least be able to get the parent as a file must always be inside a directory.
  const TocEntries = assertExists([page.parent?.parent, page.parent].find(exists)).pages.map(gp => isParsedDir(gp) ? (
    <TocCategory
      Entries={gp.pages.map(p => (
        <TocEntry description={p.description} isActive={p === page} name={p.title} url={encodedPrefixedPath(prefix, ...p.urlPath)}/>
      ))}
      name={gp.title}
    />
  ) : (
    <TocEntry description={gp.description} isActive={gp === page} name={gp.title} url={encodedPrefixedPath(prefix, ...gp.urlPath)}/>
  ));

  return (
    <Article
      Content={(
        <div dangerouslySetInnerHTML={{__html: page.content}}/>
      )}
      Footer={(
        <Footer
          prev={mapDefined(page.prev, p => ({
            href: encodedPrefixedPath(prefix, ...p.urlPath),
            name: p.title,
          }))}
          next={mapDefined(page.next, p => ({
            href: encodedPrefixedPath(prefix, ...p.urlPath),
            name: p.title,
          }))}
        />
      )}
      Header={(
        <Header category={assertExists(page.parent).title} name={page.title}/>
      )}
      scriptUrl={scriptUrl}
      styleUrl={styleUrl}
      Toc={(
        <Toc Entries={TocEntries}/>
      )}
    />
  );
};
