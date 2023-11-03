import { IRegion } from "./region.interface";
import { ITerritory } from "./territory.interface";

export interface IProvince {
  id: number;
  name: string;
  image: string;
  overview: string;
  region: IRegion;
  territory: ITerritory;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
