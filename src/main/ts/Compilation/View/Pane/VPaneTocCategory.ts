import {escapeHTML} from "../../../Util/HTML/escapeHTML";
import {View} from "../View";
import {VPaneTocCategoryEntry} from "./VPaneTocCategoryEntry";

export interface VPaneTocCategoryProps {
  name: string;
  isActive: boolean;
  entries: ReadonlyArray<VPaneTocCategoryEntry>;
}

export class VPaneTocCategory extends View {
  props: VPaneTocCategoryProps;

  constructor (props: VPaneTocCategoryProps) {
    super();
    this.props = props;
  }

  render () {
    let isActive = this.props.isActive;

    let radioCheckedAttr = isActive ? "checked" : "";
    let wrapperActiveClass = isActive ? "active" : "";
    let nameHTML = escapeHTML(this.props.name);
    let entriesHTML = this.props.entries.join("");

    return `
      <label class="toc-category">
        <input type="radio" hidden name="toc-category-expanded" ${radioCheckedAttr}>
        <div class="toc-category-name-wrapper ${wrapperActiveClass}">
          <div class="toc-category-name">${nameHTML}</div>
        </div>
        <ul class="toc-category-entries">
          ${entriesHTML}
        </ul>
      </label>
    `;
  };
}
