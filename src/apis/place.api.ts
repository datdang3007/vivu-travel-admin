import http from "src/config/http";
import { IPlace } from "src/interfaces";

export interface UpdatePlaceProps {
  id: string;
  data: IPlace;
}

const url = "place";
export const getPlaceList = async (): Promise<IPlace[]> => {
  const res = await http.get(url);
  return res.data;
};

export const createPlace = async (data: IPlace) => {
  const res = await http.post(url, { ...data });
  return res.data;
};

export const updatePlace = async ({ id, data }: UpdatePlaceProps) => {
  const res = await http.patch(`${url}/${id}`, { ...data });
  return res.data;
};

export const findPlaceByID = async (id: string) => {
  const res = await http.get(`${url}/${id}`);
  return res.data;
};

export const deletePlace = async (id: string) => {
  const res = await http.delete(`${url}/${id}`);
  return res;
};
