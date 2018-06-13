import {View} from "../View";
import {escapeHTML} from "../../../Util/HTML/escapeHTML";

export interface VArticleHeaderProps {
  category: string;
  name: string;
}

export class VArticleHeader extends View {
  props: VArticleHeaderProps;

  constructor (props: VArticleHeaderProps) {
    super();
    this.props = props;
  }

  render () {
    let categoryHTML = escapeHTML(this.props.category);
    let nameHTML = escapeHTML(this.props.name);

    // category-label is for reader view in browsers
    return `
      <header>
        <a href="#pane" class="category"><span class="category-label">In category:<zc-space /></span>${categoryHTML}</a>
        <h1>${nameHTML}</h1>
      </header>
    `;
  }
}
