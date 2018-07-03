#!/usr/bin/env node

import cliCompile from "./CLI/compile";
import cliServe from "./CLI/serve";
import {compile} from "./Compilation/compile";
import {serve} from "./Server/serve";
import {CommonThemePack} from "./Compilation/Configuration/Default/Theme/CommonThemePack";
import {SolarisedThemePack} from "./Compilation/Configuration/Default/Theme/SolarisedThemePack";
import {ThemePackUnitType} from "./Compilation/Configuration/ThemePackUnit";
import {FeedbackType} from "./Compilation/Configuration/FeedbackSettings";
import commandLineUsage = require("command-line-usage");
import commandLineArgs = require("command-line-args");

export = {
  compile: compile,
  serve: serve,
  resources: {
    feedback: {
      type: FeedbackType,
    },
    theme: {
      default: {
        common: CommonThemePack,
        solarised: SolarisedThemePack,
      },
      unitType: ThemePackUnitType,
    },
  },
};

if (!module.parent) {
  const COMMANDS: any = {
    compile: cliCompile,
    serve: cliServe,
  };

  const PACKAGE = require(__dirname + "/../../../package.json");

  const COMMON_OPTS = [
    {
      alias: "h",
      name: "help",
      type: Boolean,
      description: "Print this usage guide"
    },
    {
      alias: "v",
      name: "version",
      type: Boolean,
      description: "Print " + PACKAGE.version,
    },
  ];

  function cliError (msg: string): void {
    console.error(msg);
    process.exit(1);
  }

  function handleCommonOptions (parsed_args: { help?: boolean, version?: boolean }, help: string): boolean {
    if (parsed_args.help) {
      console.log(help);

    } else if (parsed_args.version) {
      console.log(PACKAGE.version);

    } else {
      return false;
    }

    return true;
  }

  function generateHelp (options: any, helpTemplate: any) {
    return commandLineUsage([
      {
        header: PACKAGE.name,
        content: PACKAGE.description,
      },
    ].concat(helpTemplate).map(section => {
      if (!/options$/i.test(section.header)) {
        return section;
      }
      return {
        header: section.header,
        optionList: options,
      };
    }));
  }

  Object.keys(COMMANDS).forEach(command => {
    let config = COMMANDS[command];
    let options = config.options = config.options.concat(COMMON_OPTS);
    config.help = generateHelp(options, config.help || []);
  });

  if (!module.parent) {
    let main_options = [
      {name: "command", defaultOption: true},
    ].concat(COMMON_OPTS as any);

    let main_help = generateHelp(COMMON_OPTS, [
      {
        header: "Usage",
        content: [
          "{bold referenza <command> [command options...]}",
          "{bold referenza [global option]}",
        ],
      },
      {
        header: "Commands",
        content: [
          {command: "{bold compile}", description: "Compile Markdown files to generate static HTML documentation."},
          {command: "{bold serve}", description: "Run an HTTP server locally that will serve generated documentation."},
        ],
      },
      {
        content: "For help using a specific command, use {bold referenza <command> --help}",
      },
      {
        header: "Global options",
      },
    ]);

    let main_parsed_args: any = commandLineArgs(main_options, {argv: process.argv.slice(2, 3)});

    if (handleCommonOptions(main_parsed_args, main_help)) {
      process.exit(0);
    }

    let main_command = main_parsed_args.command;

    let handled = Object.keys(COMMANDS).some(command => {
      if (main_command == command) {
        let parsed_args: any = commandLineArgs(COMMANDS[command].options, {argv: process.argv.slice(3)});

        if (!handleCommonOptions(parsed_args, COMMANDS[command].help)) {
          COMMANDS[command].action(parsed_args);
        }

        return true;
      }

      return false;
    });

    if (!handled) {
      cliError(`Unknown command "${main_command}"`);
    }
  }
}
