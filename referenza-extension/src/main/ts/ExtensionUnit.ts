export enum ReferenzaExtensionUnitType {
  SCRIPT,
  STYLE,
  NOSCRIPT_STYLE,
}

export interface IReferenzaExtensionUnit {
  type: ReferenzaExtensionUnitType;
}

export interface IReferenzaExtensionEmbeddedUnit extends IReferenzaExtensionUnit {
  content: string;
}

export interface IReferenzaExtensionLocalUnit extends IReferenzaExtensionUnit {
  file: string;
}

export interface IReferenzaExtensionRemoteUnit extends IReferenzaExtensionUnit {
  URL: string;
}

export type ReferenzaExtensionUnit = IReferenzaExtensionEmbeddedUnit | IReferenzaExtensionLocalUnit | IReferenzaExtensionRemoteUnit;
