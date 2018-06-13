import {VFeedback} from "./VFeedback";
import {escapeHTML} from "../../../Util/HTML/escapeHTML";

export interface VFormFeedbackProps {
  endpointURL: string;
  pageID: string;
}

export class VFormFeedback extends VFeedback {
  props: VFormFeedbackProps;

  constructor (props: VFormFeedbackProps) {
    super();
    this.props = props;
  }

  render () {
    let endpointUrlHTML = escapeHTML(this.props.endpointURL);
    let pageIdHTML = escapeHTML(this.props.pageID);

    return `
      <div id="feedback" class="no-select">
        <form id="feedback-form" method="post" action="${endpointUrlHTML}">
          <input type="hidden" name="page" value="${pageIdHTML}">

          <div>
            <a href="#" id="feedback-close">Close</a>
            <h2>Help improve this page</h2>
          </div>

          <label>
            <span class="feedback-form-section-heading">Title</span>
            <input class="feedback-form-text-input" name="title" maxlength="200" placeholder="Optional">
          </label>

          <label>
            <span class="feedback-form-section-heading">Message</span>
            <textarea class="feedback-form-text-input" name="message" rows="8" maxlength="1000" placeholder="Optional"></textarea>
          </label>

          <div>
            <span class="feedback-form-section-heading">Rating</span>
            <input name="rating" type="range" min="1" max="5" step="0.01">
          </div>

          <div id="feedback-form-keywords">
            <span class="feedback-form-section-heading">Keywords</span>
            <label>
              <input type="checkbox" name="keywords" value="Incomplete">
              <span>Incomplete</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Lacklustre">
              <span>Lacklustre</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Verbose">
              <span>Verbose</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Unclear">
              <span>Unclear</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Confusing">
              <span>Confusing</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Digressive">
              <span>Digressive</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Misleading">
              <span>Misleading</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Misplaced">
              <span>Misplaced</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Disorganised">
              <span>Disorganised</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Erroneous">
              <span>Erroneous</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Substandard">
              <span>Substandard</span>
            </label>
            <label>
              <input type="checkbox" name="keywords" value="Stale">
              <span>Stale</span>
            </label>
          </div>

          <button type="submit">Send feedback</button>
        </form>
      </div>
    `;
  }
}
