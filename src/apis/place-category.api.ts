import http from "src/config/http";
import { IPlaceCategory } from "src/interfaces";

const url = "place-category";

export const getPlaceCategoryList = async () => {
  const res = await http.get(url);
  return res.data;
};

export const updatePlaceCategory = async (data: IPlaceCategory[]) => {
  const res = await http.post(`${url}/bulkUpdate`, { data: data });
  return res.data;
};

export const findPlaceCategory = async (id: string | number) => {
  const res = await http.get(`${url}/findByPlaceID/${id}`);
  return res.data;
};
