import { IPlace } from "./place.interface";

export interface IPlaceImageStock {
  id?: number;
  link?: string;
  place?: IPlace;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}
