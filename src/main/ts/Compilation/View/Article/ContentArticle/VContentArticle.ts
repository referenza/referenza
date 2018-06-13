import {prepareTextOrHTML, TextOrHTML} from "../../../../Util/HTML/HTMLValue";
import {VArticle, VArticleProps} from "../VArticle";

export interface VContentArticleProps extends VArticleProps {
  content: TextOrHTML;
}

export class VContentArticle extends VArticle {
  props: VContentArticleProps;

  constructor (props: VContentArticleProps) {
    super();
    this.props = props;
  }

  render () {
    let headerHTML = this.props.header.render();
    let sectionInnerHTML = prepareTextOrHTML(this.props.content);
    let footerHTML = this.props.footer.render();

    return `${headerHTML}<section>${sectionInnerHTML}</section>${footerHTML}`;
  }
}
