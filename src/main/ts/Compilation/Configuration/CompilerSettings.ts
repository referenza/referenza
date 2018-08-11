import {FeedbackSettings} from "./FeedbackSettings";
import {IReferenzaExtension} from "referenza-extension";

export interface CompilerSettings {
  clean?: boolean;

  source: string;
  intermediate?: string;
  output: string;

  state: string;

  extensions?: ReadonlyArray<IReferenzaExtension>;

  logo?: string;
  feedback?: FeedbackSettings;

  prefix?: string;
}
