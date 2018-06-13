import {View} from "../View";
import {escapeHTML} from "../../../Util/HTML/escapeHTML";

export interface VHeaderProjectMenuEntryProps {
  URL: string;
  name: string;
}

export class VHeaderProjectMenuEntry extends View {
  props: VHeaderProjectMenuEntryProps;

  constructor (props: VHeaderProjectMenuEntryProps) {
    super();
    this.props = props;
  }

  render () {
    let urlHTML = escapeHTML(this.props.URL);
    let nameHTML = escapeHTML(this.props.name);

    return `
      <li class="header-project-menu-entry">
        <a class="header-project-menu-entry-link" href="${urlHTML}">${nameHTML}</a>
      </li>
    `;
  }
}
