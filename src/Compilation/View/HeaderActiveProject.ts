import {View} from "./View";
import {escapeHTML} from "../../Util/HTML/escapeHTML";

export class HeaderActiveProject extends View {
  name: string;
  otherProjects: ReadonlyArray<{ name: string, url: string }>;
  activeVersion: string;
  otherVersions: ReadonlyArray<{ url: string, name: string }>;

  constructor(name: string, otherProjects: ReadonlyArray<{ name: string; url: string }>, activeVersion: string, otherVersions: ReadonlyArray<{ url: string; name: string }>) {
    super();
    this.name = name;
    this.otherProjects = otherProjects;
    this.activeVersion = activeVersion;
    this.otherVersions = otherVersions;
  }

  render() {
    return `
    <div id="header-project">
      <!-- Put before link so that link can be targeted if menu open -->
      <div id="projects" class="header-project-menu-container">
        <div class="header-project-menu-heading">
          <a class="header-project-menu-close-link" href="#">Close</a>
          <div class="header-project-menu-title">Other projects</div>
        </div>
        <ul class="header-project-menu">${
          this.otherProjects.map(p => `
            <li class="header-project-menu-entry">
              <a class="header-project-menu-entry-link" href="${ p.url }">${ escapeHTML(p.name) }</a>
            </li>
            `).join("")
        }</ul>
      </div>
      
      <a id="header-project-link-projects" class="header-project-link" href="#projects">${ escapeHTML(name) }</a>
      
      <div id="versions" class="header-project-menu-container">
        <div class="header-project-menu-heading">
          <a class="header-project-menu-close-link" href="#">Close</a>
          <div class="header-project-menu-title">Other versions</div>
        </div>
        <ul class="header-project-menu">${
          this.otherVersions.map(v => `
            <li class="header-project-menu-entry">
              <a class="header-project-menu-entry-link" href="${ v.url }">${ escapeHTML(v.name) }</a>
            </li>`
          ).join("")
        }</ul>
      </div>
      
      <a id="header-project-link-versions" class="header-project-link" href="#versions">${ escapeHTML(this.activeVersion) }</a>
    </div>
  `;
  }
}
