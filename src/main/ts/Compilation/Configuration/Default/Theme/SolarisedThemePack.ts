import {ThemePackUnitType} from "../../ThemePackUnit";
import {ThemePack} from "../../ThemePack";

export const SolarisedThemePack: ThemePack = {
  prefix: "solarised",
  sourceDir: __dirname + "/../../../../../resources/theme/solarised",
  units: [
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
