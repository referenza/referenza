import {promises as fs} from 'fs';
import mkdirp from 'mkdirp';
import {dirname, join} from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {isParsedDir, parseDir, ParsedPage, ParsedUnit} from './parse';
import {Page} from './view/Page/Page';
import {PaneTocCategory} from './view/Pane/PaneTocCategory';
import {PaneTocCategoryEntry} from './view/Pane/PaneTocCategoryEntry';

const encodePathComponent = (component: string): string => {
  // Allowed: $ .
  component = component.replace(/[`~!@#%^&*()+={}\[\]|\\:;'"<>?,\/]/g, '');
  component = component.replace(/\s/gu, '-');
  // Replace contiguous hyphens with single one
  component = component.replace(/-+/g, '-');
  // Removing starting or trailing hyphens
  component = component.replace(/^-+|-+$/g, '');
  // Replace %24 with non-encoded
  component = encodeURIComponent(component).replace(/%24/g, '$');
  return component;
};

const encodedPrefixedPath = (prefix: string, ...components: string[]): string => [prefix, ...components.map(encodePathComponent)].join('/');

const renderPage = ({
  page,
  prefix,
}: {
  page: ParsedPage;
  prefix: string;
}) => {
  const TocEntries = page.parent!.parent!.pages.map(gp => isParsedDir(gp) ? (
    <PaneTocCategory
      name={gp.title}
      Entries={gp.pages.map(p => (
        <PaneTocCategoryEntry description={p.description} isActive={p === page} name={p.title} url={encodedPrefixedPath(prefix, ...p.urlPath)}/>
      ))}
      isActive={false}
    />
  ) : (
    <PaneTocCategoryEntry description={gp.description} isActive={false} name={gp.title} url={encodedPrefixedPath(prefix, ...gp.urlPath)}/>
  ));

  return (
    <Page
      Article={(
        <div dangerouslySetInnerHTML={{__html: page.content}}/>
      )}
      TocEntries={TocEntries}
    />
  );
};

export const compile = async ({
  source,
  output,
  prefix = '',
}: {
  source: string;
  output: string;
  prefix?: string;
}) => {
  if (prefix && (!prefix.startsWith('/') || prefix.endsWith('/'))) {
    throw new TypeError('URL path prefix must start with forward slash but not end with one');
  }

  const queue: ParsedUnit[][] = [await parseDir({
    absPath: source,
    parent: undefined,
    urlPath: [],
  })];
  while (queue.length) {
    const dir = queue.shift()!;
    for (const page of dir) {
      if (isParsedDir(page)) {
        queue.push(page.pages);
      } else {
        const outPath = join(encodedPrefixedPath(output, ...page.urlPath), 'index.html');
        await mkdirp(dirname(outPath));
        await fs.writeFile(
          outPath,
          ReactDOMServer.renderToStaticMarkup(renderPage({page, prefix})),
        );
      }
    }
  }
};
