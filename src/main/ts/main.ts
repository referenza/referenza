#!/usr/bin/env node

import CompileCommand from "./CLI/CompileCommand";
import ServeCommand from "./CLI/ServeCommand";
import * as sacli from "sacli";

export {compile} from "./Compilation/compile";
export {serve} from "./Server/serve";
export {FeedbackType} from "./Compilation/Configuration/FeedbackSettings";

const PACKAGE = require(__dirname + "/../../../package.json");

if (!module.parent) {
  let cli = sacli.build({
    name: "referenza",
    commands: [
      {
        name: "",
        description: PACKAGE.description,
        action: () => {
          console.error(PACKAGE.name);
          console.error(PACKAGE.description);
          console.error(PACKAGE.version);
          process.exit(1);
        },
        options: [],
      },
      CompileCommand,
      ServeCommand,
    ],
  });

  sacli.parse(process.argv.slice(2), cli);
}
