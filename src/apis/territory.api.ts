import http from "src/config/http";
import { ITerritory } from "src/interfaces";

const url = "territory";
export const getTerritoryList = async (): Promise<ITerritory[]> => {
  const res = await http.get(url);
  return res.data;
};
