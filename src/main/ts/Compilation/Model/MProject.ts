import {MVersion} from "./MVersion";

export interface MProject {
  versions: { [versionName: string]: MVersion; };
}
