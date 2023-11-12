import http from "src/config/http";
import { LOCAL_STORAGE } from "src/constants/local_storage";
import { IPlaceCategory } from "src/interfaces";

const url = "place-category";

export const getPlaceCategoryList = async () => {
  const res = await http.get(url);
  return res.data;
};

export const updatePlaceCategory = async (data: IPlaceCategory[]) => {
  const token = localStorage.getItem(LOCAL_STORAGE.AccessToken);
  if (!token) {
    return null;
  }
  const res = await http.post(
    `${url}/bulkUpdate`,
    {
      data: data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const findPlaceCategory = async (id: string | number) => {
  const res = await http.get(`${url}/findByPlaceID/${id}`);
  return res.data;
};
