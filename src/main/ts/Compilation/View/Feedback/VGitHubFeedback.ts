import {VFeedback} from "./VFeedback";
import {escapeHTML} from "../../../Util/HTML/escapeHTML";

export interface VGitHubFeedbackProps {
  repoOwner: string;
  repoName: string;
}

export class VGitHubFeedback extends VFeedback {
  props: VGitHubFeedbackProps;

  constructor (props: VGitHubFeedbackProps) {
    super();
    this.props = props;
  }

  render () {
    let repoURLHTML = escapeHTML(`https://github.com/${this.props.repoOwner}/${this.props.repoName}/issues/`);

    return `
      <div id="feedback" class="no-select">
        Please send all feedback to this project's <a href="${repoURLHTML}">GitHub repo</a> as issues.
      </div>
    `;
  }
}
