import CleanCSS from 'clean-css';
import * as crypto from 'crypto';
import {promises as fs} from 'fs';
import mkdirp from 'mkdirp';
import sass from 'node-sass';
import {dirname, join} from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Terser from 'terser';
import {isParsedDir, linkPages, parseDir, ParsedUnit} from './parse';
import {encodedPrefixedPath} from './path';
import {renderPage} from './render';

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

  const root = await parseDir({
    absPath: source,
    parent: undefined,
    urlPath: [],
  });
  linkPages(undefined, root);

  const queue: ParsedUnit[][] = [root];
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
