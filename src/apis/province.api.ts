import http from "src/config/http";
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
  const res = await http.post(url, { ...data });
  return res.data;
};

export const updateProvince = async ({ id, data }: UpdateProvinceProps) => {
  const res = await http.patch(`${url}/${id}`, { ...data });
  return res.data;
};

export const findProvinceByID = async (id: string) => {
  const res = await http.get(`${url}/${id}`);
  return res.data;
};

export const deleteProvince = async (id: string) => {
  const res = await http.delete(`${url}/${id}`);
  return res;
};
