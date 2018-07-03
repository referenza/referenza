export enum FeedbackType {
  GITHUB,
  FORM,
}

export interface FeedbackSettings {
  type: FeedbackType;
}

export interface GitHubFeedbackSettings extends FeedbackSettings {
  type: FeedbackType.GITHUB;
  repoOwner: string;
  repoName: string;
}

export interface FormFeedbackSettings extends FeedbackSettings {
  type: FeedbackType.FORM;
  endpointURL: string;
}
