import * as crypto from "crypto";

export function cryptoRandom01 (): number {
  let bytes = crypto.randomBytes(4);

  let uint32 = new DataView(bytes.buffer).getUint32(0);

  return uint32 / (2 ** 32 - 2);
}
