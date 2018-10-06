import {VHeaderProjectMenuEntry, VHeaderProjectMenuEntryProps} from "./VHeaderProjectMenuEntry";
import React from "react";

export interface VHeaderProjectProps {
  name: string;
  otherProjects: ReadonlyArray<VHeaderProjectMenuEntryProps>;
  activeVersion: string;
  otherVersions: ReadonlyArray<VHeaderProjectMenuEntryProps>;
}

export const VHeaderProject = ({name, otherProjects, activeVersion, otherVersions}: VHeaderProjectProps) => (
  <div id="header-project">
    /* Put before link so that link can be targeted if menu open */
    <div id="projects" className="header-project-menu-container">
      <div className="header-project-menu-heading">
        <a className="header-project-menu-close-link" href="#">Close</a>
        <div className="header-project-menu-title">Other projects</div>
      </div>
      <ul className="header-project-menu">{otherProjects.map(p => <VHeaderProjectMenuEntry {...p}/>)}</ul>
    </div>

    <a id="header-project-link-projects" className="header-project-link" href="#projects">{name}</a>

    <div id="versions" className="header-project-menu-container">
      <div className="header-project-menu-heading">
        <a className="header-project-menu-close-link" href="#">Close</a>
        <div className="header-project-menu-title">Other versions</div>
      </div>
      <ul className="header-project-menu">{otherVersions.map(v => <VHeaderProjectMenuEntry {...v}/>)}</ul>
    </div>

    <a id="header-project-link-versions" className="header-project-link" href="#versions">{activeVersion}</a>
  </div>
);
