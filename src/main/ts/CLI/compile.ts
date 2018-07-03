import {compile} from "../Compilation/compile";
import {
  FeedbackType,
  FormFeedbackSettings,
  GitHubFeedbackSettings
} from "../Compilation/Configuration/FeedbackSettings";

export = {
  options: [
    {
      alias: "s",
      name: "source",
      type: String,
      typeLabel: "{underline dir}",
      description: "Root directory containing the Markdown documentation files."
    },
    {
      alias: "i",
      name: "intermediate",
      type: String,
      typeLabel: "{underline dir}",
      description: "[Defaults to a generated OS temporary directory] Temporary directory that will be used during compilation."
    },
    {
      alias: "o",
      name: "output",
      type: String,
      typeLabel: "{underline dir}",
      description: "Where to store all the compiled documentation."
    },
    {
      alias: "S",
      name: "state",
      type: String,
      typeLabel: "{underline file}",
      description: "Location of the state file that will be read and written to.\nA lock file will be created in the same directory."
    },
    {
      alias: "c",
      name: "clean",
      type: Boolean,
      description: "Erase and ignore any existing state and compile everything from sources.",
    },
    {
      alias: "m",
      name: "metadata",
      type: String,
      typeLabel: "{underline filename}",
      description: "[Default `__metadata__.js`] File name of metadata files."
    },
    {
      alias: "l",
      name: "logo",
      type: String,
      typeLabel: "{underline name}",
      description: "What to show at the top of every page."
    },
    {
      alias: "f",
      name: "feedback",
      type: String,
      typeLabel: "{underline url}",
      description: "[Optional] URL to send feedback to as an HTTP POST request."
    },
    {
      alias: "g",
      name: "GitHub",
      type: String,
      typeLabel: "{underline owner/name}",
      description: "[Optional] The owner and name of a repo to direct feedback to, joined with a slash (e.g. `facebook/react`)."
    },
    {
      alias: "P",
      name: "prefix",
      type: String,
      typeLabel: "{underline path}",
      description: "[Default `/`] URL path to prepend to every documentation URL."
    },
    {
      alias: "p",
      name: "projects",
      type: String,
      multiple: true,
      defaultOption: true,
      typeLabel: "{underline name} ...",
      description: "Names of the projects to compile.\nThis can be provided directly at the end without `-p/--projects`."
    },
  ],
  action: (args: any) => {
    return compile({
      clean: args.clean,
      sourceDir: args.source,
      intermediateDir: args.intermediate,
      outputDir: args.output,
      statePath: args.state,
      metadataFileName: args.metadata,
      logo: args.logo,
      feedback: args.feedback ? {
        type: FeedbackType.FORM,
        endpointURL: args.feedback,
      } as FormFeedbackSettings : args.GitHub ? {
        type: FeedbackType.GITHUB,
        repoOwner: args.GitHub.split("/")[0],
        repoName: args.GitHub.split("/")[1],
      } as GitHubFeedbackSettings : undefined,
      projects: args.projects,
      prefix: args.prefix,
    });
  },
  help: [
    {
      header: "Options",
    },
  ],
};
