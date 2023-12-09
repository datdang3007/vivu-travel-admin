import http from "src/config/http";
import { LOCAL_STORAGE } from "src/constants/local_storage";
import { IAuth, IAuthUser } from "src/interfaces";

export interface UpdatePlaceProps {
  id: string;
  data: IAuth;
}

export interface UpdateUserRoleProps {
  user_email: string;
  role_id: number;
}

export const authLogin = async (data: IAuth) => {
  const res = await http.post(`auth/login`, data);
  return res.data;
};

export const checkExistEmail = async (email: string) => {
  const res = await http.get(`user/checkExistEmail/${email}`);
  return res.data;
};

export const updateRole = async ({
  user_email,
  role_id,
}: UpdateUserRoleProps): Promise<IAuthUser | null> => {
  const token = localStorage.getItem(LOCAL_STORAGE.AccessToken);
  if (!token) {
    return null;
  }
  const res = await http.patch(
    `auth/update/role`,
    { user_email, role_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getUserProfile = async (): Promise<IAuthUser | null> => {
  const token = localStorage.getItem(LOCAL_STORAGE.AccessToken);
  if (!token) {
    return null;
  }
  const res = await http.get(`auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
