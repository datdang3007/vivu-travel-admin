import http from "src/config/http";
import { IProvince } from "src/interfaces/province.interface";

const url = "province";
export const getProvinceList = async (): Promise<IProvince[]> => {
  const res = await http.get(url);
  return res.data;
};
