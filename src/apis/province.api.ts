import http from "src/config/http";
import { LOCAL_STORAGE } from "src/constants/local_storage";
import { IProvince } from "src/interfaces";

export interface UpdateProvinceProps {
  id: string;
  data: IProvince;
}

const url = "province";
export const getProvinceList = async (): Promise<IProvince[]> => {
  const res = await http.get(url);
  return res.data;
};

export const createProvince = async (data: IProvince) => {
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

export const updateProvince = async ({ id, data }: UpdateProvinceProps) => {
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

export const findProvinceByID = async (id: string) => {
  const res = await http.get(`${url}/${id}`);
  return res.data;
};

export const deleteProvince = async (id: string) => {
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
