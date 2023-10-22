import http from "src/config/http";
import { IRegion } from "src/interfaces";

const url = "region";
export const getRegionList = async (): Promise<IRegion[]> => {
  const res = await http.get(url);
  return res.data;
};
