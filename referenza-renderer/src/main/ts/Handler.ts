import {RawContentFile, RawContentFolder} from "./RawContent";

export interface IHandler<T> {
  loadData (f: RawContentFolder | RawContentFile): Promise<T>;
  render (data: T): Promise<string>;
}
