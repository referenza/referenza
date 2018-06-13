import {View} from "../../View";
import {prepareTextOrHTML, TextOrHTML} from "../../../../Util/HTML/HTMLValue";

export interface VReferenceArticleSignatureProps {
  code: TextOrHTML;
}

export class VReferenceArticleSignature extends View {
  props: VReferenceArticleSignatureProps;

  constructor (props: VReferenceArticleSignatureProps) {
    super();
    this.props = props;
  }

  render () {
    let codeHTML = prepareTextOrHTML(this.props.code);

    return `
      <pre class="signature">${codeHTML}</pre>
    `;
  };
}
