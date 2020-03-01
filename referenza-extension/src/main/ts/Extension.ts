import { ReferenzaExtensionUnit } from "./ExtensionUnit";

export interface IReferenzaExtension {
  prefix: string;
  source: string;
  units: ReferenzaExtensionUnit[];
}

export function isValidPrefix(prefix: string): boolean {
  // There is no specific reason for this specific set of characters to be allowed
  return /^(?:\/[a-zA-Z0-9-_$%.,() ]*)+$/.test(prefix);
}
