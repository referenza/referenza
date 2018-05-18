"use strict";

const escapeHTML = require("../Utils/escapeHTML");

const HeaderActiveProject = ({name, otherProjects, activeVersion, otherVersions}) => {
  return `
    <div id="header-project">
      <!-- Put before link so that link can be targeted if menu open -->
      <div id="projects" class="header-project-menu-container">
        <div class="header-project-menu-heading">
          <a class="header-project-menu-close-link" href="#">Close</a>
          <div class="header-project-menu-title">Other projects</div>
        </div>
        <ul class="header-project-menu">${
    otherProjects.map(p => `<li class="header-project-menu-entry">
            <a class="header-project-menu-entry-link" href="${ p.url }">${ escapeHTML(p.name) }</a>
          </li>`).join("")
    }</ul>
      </div>
      
      <a id="header-project-link-projects" class="header-project-link" href="#projects">${ escapeHTML(name) }</a>
      
      <div id="versions" class="header-project-menu-container">
        <div class="header-project-menu-heading">
          <a class="header-project-menu-close-link" href="#">Close</a>
          <div class="header-project-menu-title">Other versions</div>
        </div>
        <ul class="header-project-menu">${
    otherVersions.map(v => `<li class="header-project-menu-entry">
            <a class="header-project-menu-entry-link" href="${ v.url }">${ escapeHTML(v.name) }</a>
          </li>`).join("")
    }</ul>
      </div>
      
      <a id="header-project-link-versions" class="header-project-link" href="#versions">${ escapeHTML(activeVersion) }</a>
    </div>
  `;
};

module.exports = HeaderActiveProject;
