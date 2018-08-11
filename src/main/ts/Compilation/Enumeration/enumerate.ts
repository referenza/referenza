import {jogMap} from "fs-jogger";
import * as Path from "path";

export interface IEnumeratedArticle {
  project: string;
  version: string;
  category: string;
  name: string;
  description: string;
  modified: number;
}

export async function enumerate (dir: string) {
  let map = await jogMap({dir, fields: ["modified"]});

  for (let [components, stats] of map.entries()) {
    // TODO
    let [project, version, category, article, ...other] = components;
    if (other.length) {
      throw new TypeError(`Invalid file ${components.join(Path.sep)}`);
    }
  }
}
