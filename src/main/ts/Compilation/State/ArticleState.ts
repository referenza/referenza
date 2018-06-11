import {StateObjectType} from "./StateObjectType";

export abstract class ArticleState {
  objtype: StateObjectType;

  toJSON (): object {
    return Object.assign(...Object.keys(this).map(k => ({[k]: this[k]})));
  }

  abstract isDiffTo(other: ArticleState);
}
