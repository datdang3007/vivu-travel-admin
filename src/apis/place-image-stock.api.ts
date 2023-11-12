import http from "src/config/http";
import { LOCAL_STORAGE } from "src/constants/local_storage";
import { IPlaceImageStock } from "src/interfaces";

const url = "place-image";

export const createPlaceImage = async (data: IPlaceImageStock[]) => {
  const token = localStorage.getItem(LOCAL_STORAGE.AccessToken);
  if (!token) {
    return null;
  }
  const res = await http.post(
    `${url}/createList`,
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

export const findPlaceImageByPlaceID = async (id: string | number) => {
  const res = await http.get(`${url}/findByPlaceID/${id}`);
  return res.data;
};

export const deletePlaceImage = async (list: number[]) => {
  const token = localStorage.getItem(LOCAL_STORAGE.AccessToken);
  if (!token) {
    return null;
  }
  const res = await http.delete(`${url}/delete/list`, {
    data: list,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
