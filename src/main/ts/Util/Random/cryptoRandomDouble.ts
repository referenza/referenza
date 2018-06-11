import * as crypto from "crypto";

export function cryptoRandomDouble (): number {
  let bytes = crypto.randomBytes(8);

  return new DataView(bytes.buffer).getFloat64(0);
}
