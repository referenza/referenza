export interface serveArgs {
    port?: number;
    outputDir: string;
    urlPathPrefix?: string;
}
export declare function serve({ port, outputDir, urlPathPrefix, }: serveArgs): void;
