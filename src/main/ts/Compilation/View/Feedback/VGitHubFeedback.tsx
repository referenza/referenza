import React from "react";

export interface VGitHubFeedbackProps {
  repoOwner: string;
  repoName: string;
}

export const VGitHubFeedback = ({repoOwner, repoName}: VGitHubFeedbackProps) => (
  <div id="feedback" className="no-select">
    Please send all feedback to this project's <a href={`https://github.com/${repoOwner}/${repoName}/issues/`}>GitHub
    repo</a> as issues.
  </div>
);
