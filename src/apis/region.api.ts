import http from "src/config/http";
import { IRegion } from "src/interfaces";

export interface UpdateRegionProps {
  id: string;
  data: IRegion[];
}

const url = "region";
export const getRegionList = async (): Promise<IRegion[]> => {
  const res = await http.get(url);
  return res.data;
};

export const createRegion = async (data: IRegion) => {
  const res = await http.post(url, { ...data });
  return res.data;
};

export const updateRegion = async ({ id, data }: UpdateRegionProps) => {
  const res = await http.patch(`${url}/${id}`, { ...data });
  return res.data;
};

export const findRegionByID = async (id: string) => {
  const res = await http.get(`${url}/${id}`);
  return res.data;
};

export const deleteRegion = async (id: string) => {
  const res = await http.delete(`${url}/${id}`);
  return res;
};
