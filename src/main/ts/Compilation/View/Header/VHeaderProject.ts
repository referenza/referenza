import {View} from "../View";
import {escapeHTML} from "../../../Util/HTML/escapeHTML";
import {VHeaderProjectMenuEntry} from "./VHeaderProjectMenuEntry";

export interface VHeaderProjectProps {
  name: string;
  otherProjects: ReadonlyArray<VHeaderProjectMenuEntry>;
  activeVersion: string;
  otherVersions: ReadonlyArray<VHeaderProjectMenuEntry>;
}

export class VHeaderProject extends View {
  props: VHeaderProjectProps;

  constructor (props: VHeaderProjectProps) {
    super();
    this.props = props;
  }

  render () {
    let otherProjectsHTML = this.props.otherProjects.join("");
    let otherVersionsHTML = this.props.otherVersions.join("");
    let projectNameHTML = escapeHTML(this.props.name);
    let versionNameHTML = escapeHTML(this.props.activeVersion);

    return `
      <div id="header-project">
        <!-- Put before link so that link can be targeted if menu open -->
        <div id="projects" class="header-project-menu-container">
          <div class="header-project-menu-heading">
            <a class="header-project-menu-close-link" href="#">Close</a>
            <div class="header-project-menu-title">Other projects</div>
          </div>
          <ul class="header-project-menu">${otherProjectsHTML}</ul>
        </div>
        
        <a id="header-project-link-projects" class="header-project-link" href="#projects">${projectNameHTML}</a>
        
        <div id="versions" class="header-project-menu-container">
          <div class="header-project-menu-heading">
            <a class="header-project-menu-close-link" href="#">Close</a>
            <div class="header-project-menu-title">Other versions</div>
          </div>
          <ul class="header-project-menu">${otherVersionsHTML}</ul>
        </div>
        
        <a id="header-project-link-versions" class="header-project-link" href="#versions">${versionNameHTML}</a>
      </div>
    `;
  }
}
