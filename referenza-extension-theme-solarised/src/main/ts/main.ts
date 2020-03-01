import {IReferenzaExtension, ReferenzaExtensionUnitType} from "referenza-extension";

export const ReferenzaSolarisedTheme: IReferenzaExtension = {
  prefix: "referenza-theme-solarised",
  source: __dirname + "/../resources/theme/",
  units: [
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
