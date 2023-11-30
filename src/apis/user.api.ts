import http from "src/config/http";
import { IPlace } from "src/interfaces";

export interface UpdatePlaceProps {
  id: string;
  data: IPlace;
}

const url = "user";
export const getUserByRoles = async (roles: string): Promise<IPlace[]> => {
  const res = await http.get(`${url}/find/byRole/${roles}`);
  return res.data;
};
