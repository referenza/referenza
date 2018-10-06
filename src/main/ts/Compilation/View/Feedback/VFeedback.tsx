import {VGitHubFeedback, VGitHubFeedbackProps} from "./VGitHubFeedback";
import {VFormFeedback, VFormFeedbackProps} from "./VFormFeedback";
import * as React from "react";

export type VFeedbackProps = VGitHubFeedbackProps | VFormFeedbackProps;

export const VFeedback = (props: VFeedbackProps) => {
  if ("repoOwner" in props) {
    return <VGitHubFeedback {...props}/>;
  } else {
    return <VFormFeedback {...props}/>;
  }
};
