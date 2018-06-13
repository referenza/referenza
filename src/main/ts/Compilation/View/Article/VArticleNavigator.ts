import {View} from "../View";
import {escapeHTML} from "../../../Util/HTML/escapeHTML";

export enum VArticleNavigatorDirection {
  PREV, NEXT,
}

export interface VArticleNavigatorProps {
  dir: VArticleNavigatorDirection;
  href: string;
  name: string;
}

export class VArticleNavigator extends View {
  props: VArticleNavigatorProps;

  constructor (props: VArticleNavigatorProps) {
    super();
    this.props = props;
  }

  render () {
    let hrefAttr = `href="${escapeHTML(this.props.href)}"`;
    let titleAttr = `title="${this.props.dir == VArticleNavigatorDirection.PREV ? "Previous" : "Next"} article"`;
    let prepend = this.props.dir == VArticleNavigatorDirection.PREV ? "&lt;   " : "";
    let innerHTML = escapeHTML(this.props.name);
    let append = this.props.dir == VArticleNavigatorDirection.NEXT ? "   &gt;" : "";

    return `<a ${hrefAttr} ${titleAttr}>${prepend}${innerHTML}${append}</a>`;
  }
}
