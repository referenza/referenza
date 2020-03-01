import {IReferenzaExtension, ReferenzaExtensionUnitType} from "referenza-extension";

export const ReferenzaBaseTheme: IReferenzaExtension = {
  prefix: "referenza-theme-base",
  source: __dirname + "/../resources/theme/",
  units: [
    {
      file: "app.js",
      type: ReferenzaExtensionUnitType.SCRIPT,
    },
    {
      file: "app.css",
      type: ReferenzaExtensionUnitType.STYLE,
    },
    {
      file: "app.noscript.css",
      type: ReferenzaExtensionUnitType.NOSCRIPT_STYLE,
    }
  ],
};
