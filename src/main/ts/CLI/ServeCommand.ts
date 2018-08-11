import {serve} from "../Server/serve";
import {Command} from "sacli";

interface ServeCommand {
  output: string;
  port: number;
  prefix: string;
}

export default {
  name: "serve",
  description: "Run an HTTP server locally that will serve generated documentation.",
  options: [
    {
      alias: "o",
      name: "output",
      type: String,
      typeLabel: "{underline dir}",
      description: "Where the compiled documentation is located."
    },
    {
      alias: "p",
      name: "port",
      type: Number,
      typeLabel: "{underline port}",
      description: "[Default 3072] Port to listen on."
    },
    {
      alias: "P",
      name: "prefix",
      type: String,
      typeLabel: "{underline path}",
      description: "[Default `/`] URL path prefix used when compiling."
    },
  ],
  action: (args: ServeCommand) => {
    serve({
      outputDir: args.output,
      port: args.port,
      prefix: args.prefix,
    });
  },
} as Command;
