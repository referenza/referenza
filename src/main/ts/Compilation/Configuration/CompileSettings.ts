export interface CompileSettings {
  clean?: boolean;

  sourceDir: string;
  intermediateDir?: string;
  outputDir: string;

  statePath: string;

  metadataFileName?: string;

  logo?: string;
  feedbackUrl?: string;

  projectNames: ReadonlyArray<string>;

  urlPathPrefix?: string;
}
