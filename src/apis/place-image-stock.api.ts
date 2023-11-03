import http from "src/config/http";
import { IPlaceImageStock } from "src/interfaces";

const url = "place-image";

export const createPlaceImage = async (data: IPlaceImageStock[]) => {
  const res = await http.post(`${url}/createList`, { data: data });
  return res.data;
};

export const findPlaceImageByPlaceID = async (id: string | number) => {
  const res = await http.get(`${url}/findByPlaceID/${id}`);
  return res.data;
};

export const deletePlaceImage = async (list: number[]) => {
  const res = await http.delete(`${url}/delete/list`, { data: list });
  return res;
};
