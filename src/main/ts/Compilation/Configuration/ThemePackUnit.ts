export enum ThemePackUnitType {
  SCRIPT,
  STYLE,
  NOSCRIPT_STYLE,
}

export interface ThemePackUnit {
  type: ThemePackUnitType;
  fileName: string;
}
