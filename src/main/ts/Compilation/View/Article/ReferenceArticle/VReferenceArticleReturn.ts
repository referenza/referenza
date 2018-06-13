import {View} from "../../View";
import {prepareTextOrHTML, TextOrHTML} from "../../../../Util/HTML/HTMLValue";

export interface VReferenceArticleReturnProps {
  value: TextOrHTML;
}

export class VReferenceArticleReturn extends View {
  props: VReferenceArticleReturnProps;

  constructor (props: VReferenceArticleReturnProps) {
    super();
    this.props = props;
  }

  render () {
    let valueHTML = prepareTextOrHTML(this.props.value);

    return `
      <li>${valueHTML}</li>
    `;
  };
}
