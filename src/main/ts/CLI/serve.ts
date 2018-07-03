import {serve} from "../Server/serve";

export = {
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
  action: (args: any) => {
    serve({
      outputDir: args.output,
      port: args.port,
      prefix: args.prefix,
    });
  },
  help: [
    {
      header: "Options",
    },
  ],
};
