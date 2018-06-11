export function parseTypedCodeLine(codeText): string {
  // Need to match prefix as ?= is lookahead, not lookbehind
  return codeText.replace(
    /(true|false)/g,
    `<span class="literal">$1</span>`
  ).replace(
    /([| ])((?:[A-Z][a-z0-9_]*)+|function|int|float|number|string|bool|object|array|null|undefined)/g,
    (_, prefix, type) => `${ prefix }<span class="type">${ type }</span>`
  );
}
