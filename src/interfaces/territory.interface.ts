import { IRegion } from "./region.interface";

export interface ITerritory {
  id: number;
  name: string;
  slogan: string;
  image: string;
  overview: string;
  region: IRegion;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
