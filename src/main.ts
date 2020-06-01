#!/usr/bin/env node

import * as sacli from 'sacli';
import {compile} from './compile';

export {compile} from './compile';

if (!module.parent) {
  sacli.exec(process.argv.slice(2), sacli.build({
    name: 'referenza',
    commands: [
      {
        name: 'compile',
        description: 'Compile Markdown files to generate static HTML documentation.',
        options: [
          {
            alias: 's',
            name: 'source',
            type: String,
            typeLabel: '{underline dir}',
            description: 'Root directory containing the Markdown documentation files.',
          },
          {
            alias: 'o',
            name: 'output',
            type: String,
            typeLabel: '{underline dir}',
            description: 'Where to store all the compiled documentation.',
          },
          {
            alias: 'P',
            name: 'prefix',
            type: String,
            typeLabel: '{underline path}',
            description: '[Default `/`] URL path to prepend to every documentation URL.',
          },
        ],
        action: ({
          source,
          output,
          prefix,
        }: {
          source: string;
          output: string;
          prefix: string;
        }) => compile({
          source,
          output,
          prefix: prefix,
        }),
      },
    ],
  }));
}
