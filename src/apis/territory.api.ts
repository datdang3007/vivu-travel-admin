import http from "src/config/http";
import { LOCAL_STORAGE } from "src/constants/local_storage";
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

export const updateTerritory = async ({ id, data }: UpdateTerritoryProps) => {
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

export const findTerritoryByID = async (id: string) => {
  const res = await http.get(`${url}/relations/${id}`);
  return res.data;
};

export const deleteTerritory = async (id: string) => {
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
