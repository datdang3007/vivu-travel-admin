import http from "src/config/http";
import { LOCAL_STORAGE } from "src/constants/local_storage";
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
  const token = localStorage.getItem(LOCAL_STORAGE.AccessToken);
  if (!token) {
    return null;
  }
  const res = await http.post(
    url,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const updatePlace = async ({ id, data }: UpdatePlaceProps) => {
  const token = localStorage.getItem(LOCAL_STORAGE.AccessToken);
  if (!token) {
    return null;
  }
  const res = await http.patch(
    `${url}/${id}`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const findPlaceByID = async (id: string) => {
  const res = await http.get(`${url}/relations/${id}`);
  return res.data;
};

export const deletePlace = async (id: string) => {
  const token = localStorage.getItem(LOCAL_STORAGE.AccessToken);
  if (!token) {
    return null;
  }
  const res = await http.delete(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
