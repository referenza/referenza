import {View} from "../View";
import {escapeHTML} from "../../../Util/HTML/escapeHTML";

export interface VPaneTocCategoryEntryProps {
  URL: string;
  name: string;
  description: string;
  isActive: boolean;
}

export class VPaneTocCategoryEntry extends View {
  props: VPaneTocCategoryEntryProps;

  constructor (props: VPaneTocCategoryEntryProps) {
    super();
    this.props = props;
  }

  render () {
    let isActive = this.props.isActive;

    let itemActiveClass = isActive ? "active" : "";
    let descriptionHTML = escapeHTML(this.props.description);
    let linkHrefAttr = `href="${isActive ? "#" : escapeHTML(this.props.URL)}"`;
    let nameHTML = escapeHTML(this.props.name);

    return `
      <li class="toc-category-entry ${itemActiveClass}" title="${descriptionHTML}">
        <a ${linkHrefAttr}>${nameHTML}</a>
      </li>
    `;
  };
}
