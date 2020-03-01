import * as fs from "fs-extra";

const PATH = Symbol("path");

export class RawContentFile {
  private readonly [PATH]: string;
  private readonly modified: number;

  constructor (path: string, modified: number) {
    this[PATH] = path;
    this.modified = modified;
  }

  text (encoding: string = "utf8"): Promise<string> {
    return fs.readFile(this[PATH], encoding);
  }

  binary (): Promise<Buffer> {
    return fs.readFile(this[PATH]);
  }

  stream (options?: {
    flags?: string;
    encoding?: string;
    mode?: number;
    autoClose?: boolean;
    start?: number;
    end?: number;
    highWaterMark?: number;
  }): fs.ReadStream {
    return fs.createReadStream(this[PATH], options);
  }
}

export type RawContentFolder = {
  [file: string]: RawContentFolder | RawContentFile;
}
