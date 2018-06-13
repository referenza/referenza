export abstract class View extends Object {
  abstract render (): string;

  protected constructor() {
    super();
  }

  toString (): string {
    return this.render();
  }
}
