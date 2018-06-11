export abstract class View extends Object {
  abstract render (): string;


  toString (): string {
    return this.render();
  }
}
