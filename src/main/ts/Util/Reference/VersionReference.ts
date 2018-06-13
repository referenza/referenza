import {ProjectReference} from "./ProjectReference";

export interface VersionReference extends ProjectReference {
  version: string;
}
