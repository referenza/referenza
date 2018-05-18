#!/usr/bin/env node

"use strict";

const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");

const compile = require("./compile");
const serve = require("./serve");

let packageInfo = require(__dirname + "/package.json");

let commands = {
  "compile": require("./cli/compile"),
  "serve": require("./cli/serve"),
};

let commonOptions = [
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
    description: "Print " + packageInfo.version,
  },
];

function cliError (msg) {
  console.error(msg);
  process.exit(1);
}

function handleCommonOptions (parsed_args, help) {
  if (parsed_args.help) {
    console.log(help);

  } else if (parsed_args.version) {
    console.log(packageInfo.version);

  } else {
    return false;
  }

  return true;
}

function generateHelp (options, helpTemplate) {
  return commandLineUsage([
    {
      header: packageInfo.name,
      content: packageInfo.description,
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

Object.keys(commands).forEach(command => {
  let config = commands[command];
  let options = config.options = config.options.concat(commonOptions);
  config.help = generateHelp(options, config.help || []);
});

if (!module.parent) {
  let main_options = [
    {name: "command", defaultOption: true},
  ].concat(commonOptions);

  let main_help = generateHelp(commonOptions, [
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

  let main_parsed_args = commandLineArgs(main_options, {argv: process.argv.slice(2, 3)});

  if (handleCommonOptions(main_parsed_args, main_help)) {
    return;
  }

  let main_command = main_parsed_args.command;

  let handled = Object.keys(commands).some(command => {
    if (main_command == command) {
      let parsed_args = commandLineArgs(commands[command].options, {argv: process.argv.slice(3)});

      if (!handleCommonOptions(parsed_args, commands[command].help)) {
        commands[command].action(parsed_args);
      }

      return true;
    }
  });

  if (!handled) {
    cliError(`Unknown command "${main_command}"`);
  }

} else {
  module.exports = {
    compile,
    serve,
  };
}
