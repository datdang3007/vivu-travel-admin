import http from "src/config/http";
import { ITerritory } from "src/interfaces";

export interface UpdateTerritoryProps {
  id: string;
  data: ITerritory[];
}

const url = "territory";
export const getTerritoryList = async (): Promise<ITerritory[]> => {
  const res = await http.get(url);
  return res.data;
};

export const createTerritory = async (data: ITerritory) => {
  const res = await http.post(url, { ...data });
  return res.data;
};

export const updateTerritory = async ({ id, data }: UpdateTerritoryProps) => {
  const res = await http.patch(`${url}/${id}`, { ...data });
  return res.data;
};

export const findTerritoryByID = async (id: string) => {
  const res = await http.get(`${url}/${id}`);
  return res.data;
};

export const deleteTerritory = async (id: string) => {
  const res = await http.delete(`${url}/${id}`);
  return res;
};
