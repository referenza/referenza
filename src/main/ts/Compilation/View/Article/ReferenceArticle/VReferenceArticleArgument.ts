import {escapeHTML} from "../../../../Util/HTML/escapeHTML";
import {View} from "../../View";
import {prepareTextOrHTML, TextOrHTML} from "../../../../Util/HTML/HTMLValue";

export interface VReferenceArticleArgumentProps {
  name: string;
  description: TextOrHTML;
}

export class VReferenceArticleArgument extends View {
  props: VReferenceArticleArgumentProps;

  constructor (props: VReferenceArticleArgumentProps) {
    super();
    this.props = props;
  }

  render () {
    let nameHTML = escapeHTML(this.props.name);
    let descriptionHTML = prepareTextOrHTML(this.props.description);

    // Use div instead of p as p doesn't support some types of children elements
    // Don't wrap in div because it's no longer necessary and Firefox doesn't support it
    return `
      <dt class="argument-name">${nameHTML}</dt>
      <dd>
          <div class="argument-description">${descriptionHTML}</div>
      </dd>
    `;
  };
}
