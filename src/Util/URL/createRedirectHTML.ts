import {escapeHTML} from "../HTML/escapeHTML";

export function createRedirectHTML(to): string {
  return `<meta http-equiv="refresh" content="0;url=${escapeHTML(to)}">`;
}
