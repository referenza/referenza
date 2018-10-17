import {RawContentFile, RawContentFolder} from "./RawContent";

export abstract class Handler<T> {
  public abstract async loadData (f: RawContentFolder | RawContentFile): Promise<T>;

  public abstract async render (data: T): Promise<string>;
}
