export interface CompilerSettings {
  clean?: boolean;

  sourceDir: string;
  intermediateDir?: string;
  outputDir: string;

  statePath: string;

  metadataFileName?: string;

  logo?: string;
  feedbackEndpoint?: string;

  projects: ReadonlyArray<string>;

  prefix?: string;
}
