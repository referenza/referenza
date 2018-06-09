import * as os from "os";
import * as fs from "fs";
import * as Path from "path";

export function createTempDir(prefix: string): string {
  return fs.mkdtempSync(Path.join(os.tmpdir(), prefix));
}
