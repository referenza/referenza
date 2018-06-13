# referenza
Create static HTML project documentation using Markdown

## Usage

### Installation

Using npm:

```bash
npm i referenza
```

To use on the command line, it's best to install globally:

```bash
npm i -g referenza
```

Any local installation of referenza can also be used on the command line using `npx`:

```bash
npx referenza <command> [command options...]
```

### Modes

referenza has two modes:

- **compile**: Compile Markdown sources to HTML documentation files.
- **serve**: Start a HTTP server to serve compiled HTML documentation.

### CLI

#### `compile`

Common usage:

```bash
referenza compile -s "$(realpath src)" -o "$(realpath dist)" -S "$(realpath state.json)" -p ProjectA ProjectB ProjectC
```

For the full usage guide, use the help option:

```bash
referenza compile -h
```

#### `serve`

Common usage:

```bash
referenza serve -o "$(realpath dist)" -p 3072
```

For the full usage guide, use the help option:

```bash
referenza serve -h
```

### API

referenza exposes two functions provided via an object as its export, `compile` and `serve`.

TypeScript type declarations are bundled with the module.

#### `referenza.compile`

```javascript
const referenza = require("referenza");

referenza.compile({
  clean: false,

  sourceDir,
  intermediateDir,
  outputDir,

  statePath,

  metadataFileName: "__metadata__.js",

  logo: "",
  feedbackUrl,

  projectNames,

  urlPathPrefix: "/",
})
  .catch(err => {
    throw err;
  });
```

#### `referenza.serve`

```javascript
const referenza = require("referenza");

referenza.compile({
  port: 3072,
  outputDir,
  urlPathPrefix: "/",
});
```
