import {FeedbackSettings} from "../Configuration/FeedbackSettings";
import {IReferenzaExtension} from "referenza-extension/dist/Extension";
import {MProject} from "./MProject";

export interface MCompilationUnit {
  extensions: IReferenzaExtension[];

  logo: string;
  feedback: FeedbackSettings;

  prefix: string;

  projects: { [projectName: string]: MProject; };
}
