#!/usr/bin/env node
import { compile } from "./Compilation/compile";
import { serve } from "./Server/serve";
declare const _default: {
    compile: typeof compile;
    serve: typeof serve;
};
export = _default;
