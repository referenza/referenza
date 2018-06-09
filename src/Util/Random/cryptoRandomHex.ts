import * as crypto from "crypto";

export function cryptoRandomHex(size: number = 8): string {
  return crypto.randomBytes(size).toString("hex");
}
