import {ThemePackUnitType} from "../../ThemePackUnit";
import {ThemePack} from "../../ThemePack";

export const CommonThemePack: ThemePack = {
  prefix: "common",
  sourceDir: __dirname + "/../../../../../resources/theme/common",
  units: [
    {
      fileName: "app.js",
      type: ThemePackUnitType.SCRIPT,
    },
    {
      fileName: "app.css",
      type: ThemePackUnitType.STYLE,
    },
    {
      fileName: "app.noscript.css",
      type: ThemePackUnitType.NOSCRIPT_STYLE,
    },
  ],
};
