import { ContentDataProps, PlaceImageStockProps } from "src/types";
import { IProvince } from "./province.interface";
import { IRegion } from "./region.interface";
import { ITerritory } from "./territory.interface";

export interface IPlace {
  id: string | number;
  name?: string;
  image?: string;
  contents?: ContentDataProps[];
  image_stock?: PlaceImageStockProps[];
  count_image_stock?: number;
  region?: IRegion;
  territory?: ITerritory;
  province?: IProvince;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}
