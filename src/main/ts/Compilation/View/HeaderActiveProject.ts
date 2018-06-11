import {View} from "./View";
import {escapeHTML} from "../../Util/HTML/escapeHTML";
import {HeaderProjectMenuEntry} from "./HeaderProjectMenuEntry";

export class HeaderActiveProject extends View {
  name: string;
  otherProjects: ReadonlyArray<HeaderProjectMenuEntry>;
  activeVersion: string;
  otherVersions: ReadonlyArray<HeaderProjectMenuEntry>;

  constructor (name: string, otherProjects: ReadonlyArray<HeaderProjectMenuEntry>, activeVersion: string, otherVersions: ReadonlyArray<HeaderProjectMenuEntry>) {
    super();
    this.name = name;
    this.otherProjects = otherProjects;
    this.activeVersion = activeVersion;
    this.otherVersions = otherVersions;
  }

  render () {
    return `
    <div id="header-project">
      <!-- Put before link so that link can be targeted if menu open -->
      <div id="projects" class="header-project-menu-container">
        <div class="header-project-menu-heading">
          <a class="header-project-menu-close-link" href="#">Close</a>
          <div class="header-project-menu-title">Other projects</div>
        </div>
        <ul class="header-project-menu">${this.otherProjects.join("")}</ul>
      </div>
      
      <a id="header-project-link-projects" class="header-project-link" href="#projects">${ escapeHTML(this.name) }</a>
      
      <div id="versions" class="header-project-menu-container">
        <div class="header-project-menu-heading">
          <a class="header-project-menu-close-link" href="#">Close</a>
          <div class="header-project-menu-title">Other versions</div>
        </div>
        <ul class="header-project-menu">${this.otherVersions.join("")}</ul>
      </div>
      
      <a id="header-project-link-versions" class="header-project-link" href="#versions">${ escapeHTML(
      this.activeVersion) }</a>
    </div>
  `;
  }
}
