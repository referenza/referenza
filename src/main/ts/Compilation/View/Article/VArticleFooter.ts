import {View} from "../View";
import {VArticleNavigator} from "./VArticleNavigator";

export interface VArticleFooterProps {
  navPrev: VArticleNavigator | null;
  navNext: VArticleNavigator | null;
}

export class VArticleFooter extends View {
  props: VArticleFooterProps;

  constructor (props: VArticleFooterProps) {
    super();
    this.props = props;
  }

  render () {
    let navPrevHTML = `${this.props.navPrev || ""}`;
    let navNextHTML = `${this.props.navNext || ""}`;

    return `
      <footer>
        <div class="article-nav">
          <div class="article-nav-left">${navPrevHTML}</div>
          <div class="article-nav-right">${navNextHTML}</div>
        </div>
      </footer>
    `;
  }
}
