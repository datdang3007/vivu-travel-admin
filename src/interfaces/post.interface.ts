import { ContentDataProps } from "src/types";
import { IUser } from "./auth.interface";

export interface IPost {
  id?: string | number;
  title?: string;
  image?: string;
  status: number;
  censor?: IUser | string;
  contents?: ContentDataProps[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}
