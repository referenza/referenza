import React from "react";

export interface VFormFeedbackProps {
  endpointURL: string;
  pageID: string;
}

export const VFormFeedback = ({endpointURL, pageID}: VFormFeedbackProps) => (
  <div id="feedback" className="no-select">
    <form id="feedback-form" method="post" action={endpointURL}>
      <input type="hidden" name="page" value={pageID}/>

      <div>
        <a href="#" id="feedback-close">Close</a>
        <h2>Help improve this page</h2>
      </div>

      <label>
        <span className="feedback-form-section-heading">Title</span>
        <input className="feedback-form-text-input" name="title" maxLength={200} placeholder="Optional"/>
      </label>

      <label>
        <span className="feedback-form-section-heading">Message</span>
        <textarea className="feedback-form-text-input" name="message" rows={8} maxLength={1000}
                  placeholder="Optional"/>
      </label>

      <div>
        <span className="feedback-form-section-heading">Rating</span>
        <input name="rating" type="range" min="1" max="5" step="0.01"/>
      </div>

      <div id="feedback-form-keywords">
        <span className="feedback-form-section-heading">Keywords</span>
        <label>
          <input type="checkbox" name="keywords" value="Incomplete"/>
          <span>Incomplete</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Lacklustre"/>
          <span>Lacklustre</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Verbose"/>
          <span>Verbose</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Unclear"/>
          <span>Unclear</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Confusing"/>
          <span>Confusing</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Digressive"/>
          <span>Digressive</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Misleading"/>
          <span>Misleading</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Misplaced"/>
          <span>Misplaced</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Disorganised"/>
          <span>Disorganised</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Erroneous"/>
          <span>Erroneous</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Substandard"/>
          <span>Substandard</span>
        </label>
        <label>
          <input type="checkbox" name="keywords" value="Stale"/>
          <span>Stale</span>
        </label>
      </div>

      <button type="submit">Send feedback</button>
    </form>
  </div>
);
