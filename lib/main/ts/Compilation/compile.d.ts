import { CompilerSettings } from "./Configuration/CompilerSettings";
export declare function compile({ clean, sourceDir, intermediateDir, outputDir, statePath, metadataFileName, logo, feedbackUrl, projectNames, urlPathPrefix, }: CompilerSettings): Promise<void>;
