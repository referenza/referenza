import {ThemePackUnit} from "./ThemePackUnit";

export interface ThemePack {
  prefix: string;
  sourceDir: string;
  units: ReadonlyArray<ThemePackUnit>;
}
