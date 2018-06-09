import {lstatSync} from "fs";

export function isDirectory(path?: string): boolean {
  return typeof path == "string" && lstatSync(path).isDirectory();
}
