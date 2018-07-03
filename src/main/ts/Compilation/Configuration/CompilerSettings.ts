import {ThemePack} from "./ThemePack";
import {FeedbackSettings} from "./FeedbackSettings";

export interface CompilerSettings {
  clean?: boolean;

  sourceDir: string;
  intermediateDir?: string;
  outputDir: string;

  statePath: string;

  themePacks?: ReadonlyArray<ThemePack>;

  metadataFileName?: string;

  logo?: string;
  feedback?: FeedbackSettings;

  projects: ReadonlyArray<string>;

  prefix?: string;
}
