import {getExt, withoutExt} from 'extlib/js/fs/name/name';
import {promises as fs} from 'fs';
import {join} from 'path';
import {HTMLRenderer} from 'rmd-html';
import * as rmd from 'rmd-parse';

type ParsedUnitBase = {
  description: string;
  parent?: ParsedDir;
  title: string;
  urlPath: string[];
};

export type ParsedPage = ParsedUnitBase & {
  // Rendered HTML.
  content: string;
  prev?: ParsedPage;
  next?: ParsedPage;
};

export type ParsedDir = ParsedUnitBase & {
  pages: ParsedPage[];
};

export type ParsedUnit = ParsedPage | ParsedDir;

export const isParsedDir = (unit: ParsedUnit): unit is ParsedDir => 'pages' in unit;

const renderMarkdown = async (absPath: string) => {
  const parsed = rmd.parse(absPath, await fs.readFile(absPath, 'utf8'));
  return await new HTMLRenderer().processDocumentAsync(parsed);
};

export const linkPages = (prev: ParsedPage | undefined, dir: ParsedUnit[]): ParsedPage | undefined => {
  for (const unit of dir) {
    if (isParsedDir(unit)) {
      prev = linkPages(prev, unit.pages);
    } else {
      if (prev) {
        prev.next = unit;
      }
      unit.prev = prev;
      prev = unit;
    }
  }
  return prev;
};

export const parseDir = async ({
  absPath,
  parent,
  urlPath,
}: {
  absPath: string;
  parent: ParsedDir | undefined;
  urlPath: string[];
}): Promise<ParsedUnit[]> => {
  // `position` => `title`.
  const units = Array<ParsedUnit>();

  for (const f of await fs.readdir(absPath, {withFileTypes: true})) {
    let rawName: string;
    if (f.isFile() && ['rmd', 'md'].includes(getExt(f.name))) {
      rawName = withoutExt(f.name);
    } else if (f.isDirectory()) {
      rawName = f.name;
    } else {
      continue;
    }

    const matches = /^([0-9]+)\. (.+?)(?: --- (.*))?$/.exec(rawName);
    if (!matches) {
      throw new Error(`File/folder name is invalid: ${absPath}`);
    }
    const [_, rawPos, title, description = ''] = matches;
    const pos = Number.parseInt(rawPos, 10);
    if (!Number.isSafeInteger(pos) || pos < 1 || units[pos] !== undefined || units.some(u => u.title === title)) {
      throw new Error(`File/folder name has invalid/duplicate position or title: ${absPath}`);
    }

    const fUrlPath = urlPath.concat(title);
    const unit: any = {
      description,
      parent,
      title,
      urlPath: fUrlPath,
    };
    if (f.isFile()) {
      unit.content = await renderMarkdown(join(absPath, f.name));
    } else {
      unit.pages = await parseDir({
        absPath: join(absPath, f.name),
        parent: unit,
        urlPath: fUrlPath,
      });
    }
    units[pos] = unit;
  }

  const missingPages = [];
  for (let pageNo = 1; pageNo < units.length; pageNo++) {
    if (units[pageNo] === undefined) {
      missingPages.push(pageNo);
    }
  }
  if (missingPages.length) {
    throw new Error(`Directory ${absPath} has missing pages: ${missingPages.join(', ')}`);
  }

  // Use zero-based indices.
  return units.slice(1);
};
