import {escapeHTML} from "../../../../Util/HTML/escapeHTML";
import {VReferenceArticleSignature} from "./VReferenceArticleSignature";
import {VReferenceArticleArgument} from "./VReferenceArticleArgument";
import {VReferenceArticleReturn} from "./VReferenceArticleReturn";
import {VArticle, VArticleProps} from "../VArticle";

export interface VReferenceArticleProps extends VArticleProps {
  description: string;
  signatures: ReadonlyArray<VReferenceArticleSignature>;
  parameters: ReadonlyArray<VReferenceArticleArgument>;
  returns: ReadonlyArray<VReferenceArticleReturn>;
}

export class VReferenceArticle extends VArticle {
  props: VReferenceArticleProps;

  constructor (props: VReferenceArticleProps) {
    super();
    this.props = props;
  }

  render () {
    let headerHTML = this.props.header.render();
    let descriptionHTML = escapeHTML(this.props.description);
    let signaturesHTML = this.props.signatures.join("");
    let parametersHTML = this.props.parameters.join("");
    let returnsHTML = this.props.returns.join("");
    let footerHTML = this.props.footer.render();

    return `
      ${headerHTML}
  
      <section class="section-synopsis">
          <h2>Synopsis</h2>
          <p class="description">${descriptionHTML}</p>
          ${signaturesHTML}
      </section>
  
      ${ parametersHTML && `<section>
          <h2>Arguments</h2>
          <dl class="arguments-list">
              ${parametersHTML}
          </dl>
      </section>` }
  
      ${ returnsHTML && `<section>
          <h2>Returns</h2>
          <ul class="returns-list">
              ${returnsHTML}
          </ul>
      </section>` }
      
      ${footerHTML}
    `;
  };
}
