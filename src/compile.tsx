import CleanCSS from 'clean-css';
import * as crypto from 'crypto';
import {promises as fs} from 'fs';
import mkdirp from 'mkdirp';
import sass from 'node-sass';
import {dirname, join} from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Terser from 'terser';
import {isParsedDir, parseDir, ParsedPage, ParsedUnit} from './parse';
import {Article} from './view/Article';
import {Toc, TocCategory, TocEntry} from './view/Toc';

const STATIC = join(__dirname, 'static');

export const enum Theme {
  SOLARISED,
}

const getThemePath = (theme: Theme | string): string => {
  if (typeof theme == 'string') {
    return theme;
  }
  switch (theme) {
  case Theme.SOLARISED:
    return join(STATIC, 'solarised.css');
  }
};

const compileSass = (file: string): Promise<string> =>
  new Promise((resolve, reject) =>
    sass.render({file}, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.css.toString());
    }));

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
  scriptUrl,
  styleUrl,
}: {
  page: ParsedPage;
  prefix: string;
  scriptUrl: string;
  styleUrl: string;
}) => {
  const TocEntries = page.parent!.parent!.pages.map(gp => isParsedDir(gp) ? (
    <TocCategory
      name={gp.title}
      Entries={gp.pages.map(p => (
        <TocEntry description={p.description} isActive={p === page} name={p.title} url={encodedPrefixedPath(prefix, ...p.urlPath)}/>
      ))}
    />
  ) : (
    <TocEntry description={gp.description} isActive={false} name={gp.title} url={encodedPrefixedPath(prefix, ...gp.urlPath)}/>
  ));

  return (
    <Article
      Content={(
        <div dangerouslySetInnerHTML={{__html: page.content}}/>
      )}
      scriptUrl={scriptUrl}
      styleUrl={styleUrl}
      Toc={(
        <Toc Entries={TocEntries}/>
      )}
    />
  );
};

export const compile = async ({
  source,
  output,
  prefix = '',
  staticDir = '___static',
  theme = Theme.SOLARISED,
}: {
  source: string;
  output: string;
  prefix?: string;
  staticDir?: string;
  theme?: Theme | string;
}) => {
  if (prefix && (!prefix.startsWith('/') || prefix.endsWith('/'))) {
    throw new TypeError('URL path prefix must start with forward slash but not end with one');
  }

  const script = Terser.minify(
    await fs.readFile(join(STATIC, 'script.js'), 'utf8'),
  ).code!;
  const style = new CleanCSS().minify((await Promise.all([
    await fs.readFile(getThemePath(theme)),
    await compileSass(join(STATIC, 'style.scss')),
  ])).join('\n')).styles;

  const scriptHash = crypto.createHash('sha1').update(script).digest().toString('hex');
  const styleHash = crypto.createHash('sha1').update(style).digest().toString('hex');

  await mkdirp(join(output, staticDir));
  await Promise.all([
    fs.writeFile(join(output, staticDir, `${scriptHash}.js`), script),
    fs.writeFile(join(output, staticDir, `${styleHash}.css`), style),
  ]);

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
        // TODO Minify HTML.
        await fs.writeFile(
          outPath,
          ReactDOMServer.renderToStaticMarkup(renderPage({
            page,
            prefix,
            scriptUrl: [prefix, staticDir, `${scriptHash}.js`].join('/'),
            styleUrl: [prefix, staticDir, `${styleHash}.css`].join('/'),
          })),
        );
      }
    }
  }
};
